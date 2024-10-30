const { admin } = require('../config/firebase-admin');

/**
 * Middleware untuk verifikasi session cookie
 * Digunakan untuk protected routes
 */
const verifySessionCookie = async (req, res, next) => {
    try {
        console.log("Cookies yang diterima:", req.cookies); // Debug log

        const sessionCookie = req.cookies.session;

        if (!sessionCookie) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'No session cookie provided'
            });
        }

        try {
            // Verifikasi session cookie dengan checkRevoked=true
            const decodedToken = await admin.auth().verifySessionCookie(
                sessionCookie,
                true // Check if token has been revoked
            );

            // Tambahkan data user ke request
            req.user = {
                uid: decodedToken.uid,
                email: decodedToken.email,
                emailVerified: decodedToken.email_verified,
            };

            next();
        } catch (error) {
            // Handle specific verification errors
            if (error.code === 'auth/session-cookie-revoked') {
                res.clearCookie('session');
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Session has been revoked'
                });
            }
            
            if (error.code === 'auth/session-cookie-expired') {
                res.clearCookie('session');
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Session has expired'
                });
            }

            throw error;
        }

    } catch (error) {
        console.error('Auth Middleware Error:', error);
        
        // Clear invalid cookie
        res.clearCookie('session', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'localhost'
        });

        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or expired session cookie'
        });
    }
};

module.exports = {
    verifySessionCookie
};