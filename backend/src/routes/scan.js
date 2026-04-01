const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Scan = require('../models/Scan');
const cloudinary = require('cloudinary').v2;

// --- CLOUDINARY CONFIGURATION ---
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Temporary Local Storage before Cloudinary Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads/';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8001';

/**
 * Perform AI Disease Inference via FastAPI
 */
const getPrediction = async (imagePath) => {
    try {
        // Use standard Node 24+ fetch and FormData
        const fileContent = fs.readFileSync(imagePath);
        const blob = new Blob([fileContent], { type: 'image/jpeg' });
        
        const formData = new FormData();
        formData.append('file', blob, path.basename(imagePath));

        console.log(`📡 Pinging AI at ${ML_SERVICE_URL}/predict...`);
        const response = await fetch(`${ML_SERVICE_URL}/predict`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errBody = await response.text();
            throw new Error(`AI model rejected request: ${errBody}`);
        }
        
        return await response.json();
    } catch (err) {
        // Log the SPECIFIC error for the user to troubleshoot
        console.error('❌ AI Link Error:', err.message);
        fs.appendFileSync('ai_link_errors.log', `${new Date().toISOString()} - ${err.message}\n`);
        
        return {
            disease: 'Diagnostic Hub Unavailable',
            confidence: 0,
            treatment: `Connection Issue: ${err.message}. Ensure port 8001 is active.`,
            crop_type: 'Unknown',
            is_healthy: false
        };
    }
};

/**
 * MAIN UPLOAD: Temp Store -> AI Scan -> Cloudinary Host -> DB Save -> Cleanup Local
 */
router.post('/upload', upload.single('image'), async (req, res) => {
    let localImagePath = null;
    try {
        if (!req.file) return res.status(400).json({ message: 'No image provided.' });
        localImagePath = req.file.path;

        // 1. Get AI analysis while the file is still local
        const prediction = await getPrediction(localImagePath);

        // 2. Upload to Cloudinary for permanent storage
        const cloudResponse = await cloudinary.uploader.upload(localImagePath, {
            folder: 'cropsight_scans',
            resource_type: 'auto'
        });

        // 3. Save to MongoDB with CLOUDINARY URL
        const newScan = new Scan({
            user: req.body.userId === 'anonymous' ? null : req.body.userId,
            imageUrl: cloudResponse.secure_url, // Permanent Cloud Link
            cropType: prediction.crop_type || req.body.cropType || 'Field Crop',
            disease: prediction.disease,
            confidence: prediction.confidence,
            treatment: prediction.treatment,
            isHealthy: prediction.is_healthy,
        });

        await newScan.save();

        // 4. Cleanup Local Temp File
        if (fs.existsSync(localImagePath)) {
            fs.unlinkSync(localImagePath);
        }

        res.json(newScan);
    } catch (err) {
        // Cleanup on failure
        if (localImagePath && fs.existsSync(localImagePath)) {
            fs.unlinkSync(localImagePath);
        }
        res.status(500).json({ message: err.message });
    }
});

router.get('/history/:userId', async (req, res) => {
    try {
        const history = await Scan.find({ user: req.params.userId }).sort({ diagnosisDate: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
