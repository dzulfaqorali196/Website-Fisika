const { admin } = require('../config/firebase-admin');
const dbUtils = require('../utils/db-utils');

const authController = {
    /**
     * Register user baru
     */
    register: async (req, res) => {
        try {
            const { email, password, displayName } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Email and password are required'
                });
            }

            // Buat user di firebase auth
            const userRecord = await admin.auth().createUser({
                email,
                password,
                displayName: displayName || email.split('@')[0],
                emailVerified: false
            });

            // Buat profile user di Firestore
            const userProfile = await dbUtils.createUserProfile(userRecord);

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    uid: userRecord.uid,
                    email: userRecord.email,
                    displayName: userRecord.displayName
                }
            });
        } catch (error) {
            console.error('Register Error:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    },

    /**
     * Login dan set HTTP-Only session cookie
     */
    login: async (req, res) => {
        try {
            const { token } = req.body;

            if (!token) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Token is required'
                });
            }

            // Verifikasi ID token terlebih dahulu
            const decodedToken = await admin.auth().verifyIdToken(token);
            
            // Buat session cookie
            const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 hari
            const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn });

            // Opsi cookie yang aman
            const cookieOptions = {
                maxAge: expiresIn,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax', // Gunakan 'strict' di production
                path: '/',
                domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'localhost'
            };

            // Set cookie
            res.cookie('session', sessionCookie, cookieOptions);

            // Kirim response
            res.status(200).json({
                status: 'success',
                message: 'Successfully logged in'
            });

        } catch (error) {
            console.error('Login Error:', error);
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid token provided'
            });
        }
    },

    /**
     * Logout dan hapus session cookie
     */
    logout: async (req, res) => {
        try {
            const sessionCookie = req.cookies.session;

            if (sessionCookie) {
                // Revoke semua refresh token user
                const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie);
                await admin.auth().revokeRefreshTokens(decodedClaims.sub);
            }

            // Hapus cookie
            res.clearCookie('session', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'localhost'
            });

            res.status(200).json({
                status: 'success',
                message: 'Successfully logged out'
            });
        } catch (error) {
            console.error('Logout Error:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Failed to logout properly'
            });
        }
    },

    /**
     * Get user profile dengan data dari Firestore
     */
    getProfile: async (req, res) => {
        try {
            const { uid } = req.user;
            
            // Ambil data dari Firestore
            const userProfile = await dbUtils.getUserProfile(uid);
            
            res.status(200).json({
                user: userProfile
            });
        } catch (error) {
            console.error('Get Profile Error:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    },

    /**
     * Update user profile
     */
    updateProfile: async (req, res) => {
        try {
            const { uid } = req.user;
            const { displayName, photoURL } = req.body;

            const userRecord = await admin.auth().updateUser(uid, {
                displayName,
                photoURL
            });

            res.status(200).json({
                message: 'Profile updated successfully',
                user: {
                    uid: userRecord.uid,
                    email: userRecord.email,
                    displayName: userRecord.displayName,
                    photoURL: userRecord.photoURL
                }
            });
        } catch (error) {
            console.error('Update Profile Error:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }
};

module.exports = authController;