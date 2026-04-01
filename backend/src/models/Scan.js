const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    imageUrl: {
        type: String,
        required: true
    },
    cropType: {
        type: String,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    confidence: {
        type: Number,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    isHealthy: {
        type: Boolean,
        default: false
    },
    diagnosisDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Scan', scanSchema);
