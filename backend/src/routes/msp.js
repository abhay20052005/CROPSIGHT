const express = require('express');
const router = express.Router();

// Mock MSP list (Will be fetched from government feeds later)
const mspList = [
  { crop: 'Paddy (Common)', price: 2300, category: 'Kharif', increase: '₹432' },
  { crop: 'Wheat', price: 2425, category: 'Rabi', increase: '₹450' },
  { crop: 'Tur (Arhar)', price: 7550, category: 'Kharif', increase: '₹1550' },
  { crop: 'Moong', price: 8682, category: 'Kharif', increase: '₹1486' },
  { crop: 'Groundnut', price: 6783, category: 'Kharif', increase: '₹1508' },
  { crop: 'Gram', price: 5650, category: 'Rabi', increase: '₹550' },
  { crop: 'Copra (Milling)', price: 11582, category: 'Other', increase: '₹1247' },
  { crop: 'Jute', price: 5650, category: 'Other', increase: '₹1150' },
];

// Route: Get All MSPs
router.get('/list', (req, res) => {
    res.json({
        season: '2025-2026',
        data: mspList
    });
});

// Route: Search MSP
router.get('/search', (req, res) => {
    const query = req.query.q?.toLowerCase() || '';
    const results = mspList.filter(m => m.crop.toLowerCase().includes(query));
    res.json(results);
});

module.exports = router;
