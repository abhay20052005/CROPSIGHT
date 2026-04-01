const express = require('express');
const router = express.Router();

// Mock Management data
const managementData = {
    overview: {
        totalPlanted: '1.2M Hectares',
        growthRate: '+4.2% YoY',
        activeMarkets: 140
    },
    advisory: {
        heading: 'Late Spring Harvesting Alert',
        message: 'Dry March weather is ideal for Wheat harvest. Fast-track threshing to avoid shriveling if heat exceeds 34°C.'
    }
};

// Route: Get Management Metrics
router.get('/management', (req, res) => {
    res.json(managementData);
});

// Route: Weather Analysis
router.get('/weather', (req, res) => {
    res.json({
        best: 'Wheat',
        worst: 'Leafy Vegetables',
        reason: 'Current low humidity minimizes fungal risk but causes wilting in leafy crops.'
    });
});

module.exports = router;
