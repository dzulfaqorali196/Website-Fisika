import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from './firebase-config.js';

class AuthService {
    constructor() {
        this.initAuthStateListener();
        this.initializeEventListeners();
    }

    initAuthStateListener() {
        onAuthStateChanged(auth, (user) => {
            this.updateUIState(user);
            this.updateMobileMenuUI(user);
        });
    }

    // Fungsi untuk menukar token dengan session
    async exchangeTokenForSession(token) {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                credentials: 'include', // Penting untuk mengirim/menerima cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token })
            });

            if (!response.ok) {
                throw new Error('Failed to exchange token for session');
            }

            return response.json();
        } catch (error) {
            console.error('Session exchange error:', error);
            throw error;
        }
    }

    async register(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await this.handleSuccessfulAuth(userCredential);
            return userCredential;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await this.handleSuccessfulAuth(userCredential);
            return userCredential;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async handleSuccessfulAuth(userCredential) {
        try {
            const token = await userCredential.user.getIdToken();
            // Tukar token dengan session cookie
            await this.exchangeTokenForSession(token);
            
            // Update UI tanpa menyimpan di localStorage
            this.updateUIState(userCredential.user);
            this.updateMobileMenuUI(userCredential.user);
        } catch (error) {
            console.error('Auth handling failed:', error);
            throw error;
        }
    }

    guestLogin() {
        this.updateUIState(null);
        this.updateMobileMenuUI(null);
        console.log('Guest login successful');
    }

    async logout() {
        try {
            // Logout dari Firebase
            await signOut(auth);
            
            // Hapus session di server
            await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
    
            // Clear browser storage
            localStorage.clear();
            sessionStorage.clear();
            
            // Update UI states
            this.updateUIState(null);
            this.updateMobileMenuUI(null);
    
            // Redirect dengan delay kecil untuk memastikan UI terupdate
            setTimeout(() => {
                window.location.href = '/frontend/index.html';
            }, 100);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    }

    // Update fungsi updateUIState
    updateUIState(user) {
        // Ambil semua elemen yang diperlukan
        const guestMenu = document.getElementById('guestMenu');
        const loggedInMenu = document.getElementById('loggedInMenu');
        const userNameElement = document.getElementById('userName');
        const userProfileLink = document.querySelector('.user-info small');
        const profileDropdown = document.querySelector('.profile-dropdown');

        if (!guestMenu || !loggedInMenu) return;

        // Reset dropdown state
        if (profileDropdown) {
            profileDropdown.classList.remove('active');
        }

        if (user) {
            // State user terautentikasi
            guestMenu.style.display = 'none';
            loggedInMenu.style.display = 'block';
            
            if (userNameElement) {
                userNameElement.textContent = user.email.split('@')[0];
            }
            if (userProfileLink) {
                userProfileLink.textContent = 'Go to profile';
            }
        } else {
            // State guest/non-autentikasi
            guestMenu.style.display = 'block';
            loggedInMenu.style.display = 'none';
            
            if (userNameElement) {
                userNameElement.textContent = 'User';
            }
            if (userProfileLink) {
                userProfileLink.textContent = 'Guest';
            }
        }
    }

    // Update fungsi updateMobileMenuUI
    updateMobileMenuUI(user) {
        const loggedInProfile = document.getElementById('loggedInProfile');
        const guestProfile = document.getElementById('guestProfile');
        const mobileUserName = document.getElementById('mobileUserName');
        const profileSubmenu = document.getElementById('profileSubmenu');

        if (!loggedInProfile || !guestProfile) return;

        if (user) {
            // Mobile: State user terautentikasi
            loggedInProfile.style.display = 'flex';
            guestProfile.style.display = 'none';
            if (mobileUserName) {
                mobileUserName.textContent = user.email.split('@')[0];
            }
        } else {
            // Mobile: State guest/non-autentikasi
            loggedInProfile.style.display = 'none';
            guestProfile.style.display = 'flex';
            if (profileSubmenu) {
                profileSubmenu.classList.remove('active');
            }
        }
    }

    initializeEventListeners() {
        // Form Handlers
        const loginForm = document.getElementById('loginFormElement');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                try {
                    await this.login(email, password);
                    window.location.href = '/frontend/index.html';
                } catch (error) {
                    document.getElementById('loginErrorMessage').textContent = 
                        'Login failed. Please check your credentials.';
                }
            });
        }

        const registerForm = document.getElementById('registerFormElement');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                
                try {
                    await this.register(email, password);
                    window.location.href = '/frontend/index.html';
                } catch (error) {
                    document.getElementById('registerErrorMessage').textContent = 
                        'Registration failed. Please try again.';
                }
            });
        }

        // Button Handlers
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    await this.logout();
                } catch (error) {
                    console.error('Logout error:', error);
                }
            });
        }

        const guestLoginBtn = document.getElementById('guestLoginBtn');
        if (guestLoginBtn) {
            guestLoginBtn.addEventListener('click', () => {
                this.guestLogin();
                window.location.href = '/frontend/index.html';
            });
        }

        // Profile Dropdown Handlers
        const profileIcon = document.getElementById('profileIcon');
        const profileDropdown = document.querySelector('.profile-dropdown');

        if (profileIcon && profileDropdown) {
            profileIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!profileDropdown.contains(e.target) && !profileIcon.contains(e.target)) {
                    profileDropdown.classList.remove('active');
                }
            });
        }

        // Mobile Menu Handlers
        const menuTrigger = document.querySelector('.menu-trigger');
        const menuContainer = document.querySelector('.menu-container');
        const loggedInProfile = document.getElementById('loggedInProfile');
        const profileSubmenu = document.getElementById('profileSubmenu');
        const backButton = document.querySelector('.back-button');
        const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

        if (menuTrigger && menuContainer) {
            menuTrigger.addEventListener('click', function() {
                if (menuContainer.classList.contains('active')) {
                    menuContainer.classList.remove('active');
                    this.classList.remove('active');
                    if (profileSubmenu) {
                        profileSubmenu.classList.remove('active');
                    }
                } else {
                    menuContainer.classList.add('active');
                    this.classList.add('active');
                }
            });
        }

        if (loggedInProfile && profileSubmenu) {
            loggedInProfile.addEventListener('click', () => {
                profileSubmenu.classList.add('active');
            });
        }

        if (backButton && profileSubmenu) {
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                profileSubmenu.classList.remove('active');
            });
        }

        if (mobileLogoutBtn) {
            mobileLogoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    await this.logout();
                    menuContainer.classList.remove('active');
                    if (profileSubmenu) {
                        profileSubmenu.classList.remove('active');
                    }
                } catch (error) {
                    console.error('Logout error:', error);
                }
            });
        }
    }
}

const authService = new AuthService();
export default authService;
window.authService = authService;