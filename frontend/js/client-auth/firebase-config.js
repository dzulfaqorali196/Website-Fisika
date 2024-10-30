// Import fungsi yang diperlukan dari SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Konfigurasi Firebase
const firebaseConfig = {
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth dengan persistence setting
const auth = getAuth(app);

// Set persistence ke session (akan hilang ketika browser ditutup)
setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log('Firebase Auth persistence set to session');
    })
    .catch((error) => {
        console.error('Error setting persistence:', error);
    });

// Initialize DB
const db = getFirestore(app);

// Export auth instance
export { auth, db };