// src/config/firebase-admin.js

const admin = require('firebase-admin');

/**
 * Inisialisasi Firebase Admin SDK
 * @returns {Object} Instance admin yang sudah diinisialisasi
 */
const initializeFirebaseAdmin = () => {
  try {
    // Mengambil service account key
    const serviceAccount = require('./serviceAccountKey.json');

    // Cek apakah Firebase Admin sudah diinisialisasi
    if (!admin.apps.length) {
      // Inisialisasi Firebase Admin jika belum ada
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      
      console.log('Firebase Admin SDK berhasil diinisialisasi');
    }

    // Return instance admin yang sudah diinisialisasi
    return admin;

  } catch (error) {
    console.error('Error inisialisasi Firebase Admin:', error);
    throw error;
  }
};

// Export fungsi inisialisasi dan instance admin
module.exports = {
  initializeFirebaseAdmin,
  admin,
  // Export Firestore instance
  db: () => admin.firestore() // Gunakan sebagai fungsi untuk memastikan admin sudah diinisialisasi
};