const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Import Firebase Admin initialization
const { initializeFirebaseAdmin } = require('./src/config/firebase-admin.js');
const admin = initializeFirebaseAdmin();

// Import routes
const authRoutes = require('./src/routes/server-auth.routes');

// Initialize Express app
const app = express();

// Setup CORS dengan opsi yang lebih spesifik
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['set-cookie'],
    preflightContinue: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser()); // Tambahkan middleware cookie-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Firebase Admin sebelum routes
try {
    initializeFirebaseAdmin();
    console.log('Firebase Admin berhasil diinisialisasi');
} catch (error) {
    console.error('Error inisialisasi Firebase Admin:', error);
    process.exit(1);
}

// Routes
app.use('/api/auth', authRoutes);

// Basic route untuk testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to LabDz Virtual Lab API' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
    console.log(`CORS enabled untuk origin: ${corsOptions.origin}`);
});