const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const scanRoutes = require('./routes/scan');
const mspRoutes = require('./routes/msp');
const cropRoutes = require('./routes/crop');

const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Security & Utility Middleware
app.use(helmet({
    crossOriginResourcePolicy: false, // For serving local images
}));
app.use(cors());
app.use(morgan('dev')); // Request logging
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/msp', mspRoutes);
app.use('/api/crop', cropRoutes);

// Static Uploads Serving
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Error Handler Middleware (Should be last)
app.use(errorHandler);

module.exports = app;
