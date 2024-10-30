# LabDz Virtual Lab: Platform Pembelajaran Interaktif Pengukuran dan Satuan

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📖 Deskripsi
LabDz Virtual Lab adalah platform pembelajaran interaktif yang dirancang untuk membantu pemahaman konsep pengukuran dan satuan dalam fisika. Platform ini menyediakan simulasi virtual, materi pembelajaran interaktif, dan sistem evaluasi yang komprehensif.

🌐 **Website**: [labdz.site](https://labdz.site)

## ✨ Fitur Utama

### 🎯 Simulasi Interaktif
- **Simulasi Penggaris Virtual**
  - Canvas interaktif untuk pengukuran
  - Drag and drop objek
  - Pembacaan skala otomatis
  - Multi-unit measurement

- **Konverter Satuan Universal**
  - Konversi satuan panjang
  - Konversi satuan massa
  - Konversi satuan volume
  - Konversi satuan suhu
  - Fitur swap unit

- **Kalkulator Error Pengukuran**
  - Perhitungan error absolut
  - Perhitungan error relatif
  - Perhitungan error persentase
  - Penjelasan hasil perhitungan

### 📚 Sistem Pembelajaran
- **Materi Terstruktur**
  - 3 modul utama pembelajaran
  - Format slide interaktif
  - Navigasi materi yang intuitif
  - Progress tracking

- **Sistem Kuis**
  - Multiple choice questions
  - Feedback langsung
  - Progress tracking
  - Skor minimal kelulusan 70%
  - Rekomendasi pembelajaran

### 🎨 UI/UX Features
- **Dark Mode**
  - Toggle switch tema
  - Transisi smooth
  - Persistent preference
  - Optimized color scheme

- **FAQ System**
  - Pencarian dengan pattern matching
  - Filtering berdasarkan kategori
  - Highlight hasil pencarian
  - Expand/collapse animation

- **Forms**
  - Contact form
  - Newsletter subscription
  - Error handling
  - Form validation
  - Success feedback

### 📱 Responsive Design
- Desktop optimization
- Tablet-friendly layout
- Mobile-first approach
- Touch-friendly interface

### 🔐 Fitur Autentikasi (New!)
- **Sistem Autentikasi Aman**
  - HTTP-Only cookie session ✅
  - Firebase Authentication integration ✅
  - Secure session management ✅
  - Protected routes & endpoints ✅

- **User Profile System**
  - Basic profile management ✅
  - Session-based authentication ✅
  - User state management ✅
  - Profile dropdown UI ✅

### 🗄️ Backend Features (New!)
- **Firebase Integration**
  - Firebase Admin SDK ✅
  - Firestore database ✅
  - Secure token validation ✅
  - Session cookie management ✅


## 🛠️ Teknologi

### Frontend
- HTML5
- CSS3 (Pure CSS, No Framework)
- Vanilla JavaScript

### Backend (New!)
- Node.js
- Express.js
- Firebase Admin SDK
- Firebase Authentication
- Firestore

### Libraries
- Font Awesome (Icons)
- Web3Forms (Form Handling)

### Hosting
- Niagahoster
- SSL/HTTPS enabled

## 🚀 Fitur Performa
- Optimized animations
- Smooth transitions
- Efficient event handling
- Cross-browser compatibility

## 📁 Struktur File (Updated)
```
WEBSITE-FISIKA/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── firebase-admin.js
│   │   ├── controllers/
│   │   │   └── server-auth.controller.js
│   │   ├── middleware/
│   │   │   └── server-auth.middleware.js
│   │   ├── routes/
│   │   │   └── server-auth.routes.js
│   │   └── utils/
│   │       └── db-utils.js
│   └── server.js
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── img/
│   │   ├── hero-page/
│   │   │   ├── foreground.png
│   │   │   ├── hills.png
│   │   │   ├── rocks1.png
│   │   │   └── rocks2.png
│   │   ├── icon/
│   │   │   └── profile-icon.png
│   │   ├── logo/
│   │   │   ├── logo.gif
│   │   │   ├── favicon-16x16.png
│   │   │   ├── favicon-32x32.png
│   │   │   └── social-preview.png
│   │   └── weblogo/
│   ├── js/
│   │   ├── client-auth/
│   │   │   ├── client-auth.js
│   │   │   └── firebase-config.js
│   │   ├── templateconfig/
│   │   │   ├── config.example.js
│   │   │   └── config.js
│   │   ├── darkmode.js
│   │   ├── faq.js
│   │   ├── quiz.js
│   │   └── script.js
│   ├── pages/
│   │   ├── contact.html
│   │   ├── faq.html
│   │   ├── login.html
│   │   ├── pengantar_quiz.html
│   │   ├── quiz.html
│   │   └── register.html
│   ├── index.html
│   └── .gitignore
└── README.md
```

### 📂 Deskripsi Struktur File

#### Backend
- `src/config/` - Konfigurasi Firebase Admin dan database
- `src/controllers/` - Logic untuk autentikasi dan manajemen user
- `src/middleware/` - Middleware untuk validasi session dan keamanan
- `src/routes/` - Definisi endpoint API
- `src/utils/` - Utilitas untuk interaksi dengan database

#### Frontend
- `css/` - Stylesheet utama aplikasi
- `img/` 
  - `hero-page/` - Asset untuk halaman utama
  - `icon/` - Icon-icon UI
  - `logo/` - Logo dan favicon
- `js/`
  - `client-auth/` - Implementasi autentikasi client-side
  - `templateconfig/` - Konfigurasi template dan environment
  - File JavaScript untuk fitur spesifik (darkmode, FAQ, quiz)
- `pages/` - Halaman-halaman HTML aplikasi

**Note**: File yang ditandai dalam `.gitignore` tidak disertakan dalam version control untuk keamanan (seperti `config.js` yang berisi kunci API).

## 🚧 On Progress Features
1. **Schema Database Firestore**
   - Courses Progress System 🔄
   - Achievement System 🔄
   - Learning Statistics 🔄
   - Daily Streaks Tracking 🔄

2. **User Profile Page**
   - Profile Header & Stats 🔄
   - Learning Progress Display 🔄
   - Achievement Showcase 🔄
   - Streak Calendar 🔄

3. **Learning Management**
   - XP & Leveling System 🔄
   - Progress Tracking 🔄
   - Course Completion Stats 🔄
   - Achievement Management 🔄

4. **API Endpoints Development**
   - Learning Progress Tracking 🔄
   - Streak Updates 🔄
   - Achievement Management 🔄
   - User Stats 🔄

5. **Security Enhancements**
   - CSRF Protection 🔄
   - Rate Limiting 🔄
   - Additional Security Headers 🔄
   - Enhanced Cookie Security 🔄

## 🔧 Setup & Installation
1. Clone repository
2. Tidak memerlukan instalasi dependencies
3. Buka `index.html` di browser
4. Atau deploy ke web server

## Setup Web3Forms
1. Buat folder `templateconfig` di dalam folder `js` jika belum ada
2. Copy `js/templateconfig/config.example.js` ke `js/templateconfig/config.js`
3. Daftar di [Web3Forms](https://web3forms.com/) untuk mendapatkan access key
4. Ganti `YOUR_ACCESS_KEY_HERE` di `config.js` dengan access key Anda
5. File `js/templateconfig/config.js` sudah ditambahkan ke .gitignore untuk keamanan

### Integrasi Web3Forms
1. Pastikan sudah membuat `config.js` dari template `config.example.js`
2. Tambahkan file config.js sebelum script.js di HTML:
```html
<script src="/js/templateconfig/config.js"></script>
<script src="/js/script.js"></script>
```
## 💡 Penggunaan

### Simulasi
1. Buka bagian Simulasi
2. Pilih jenis simulasi (Penggaris/Konverter/Kalkulator Error)
3. Ikuti instruksi pada masing-masing simulasi

### Pembelajaran
1. Akses menu Kuis & Materi
2. Pilih modul pembelajaran
3. Ikuti materi secara berurutan
4. Selesaikan kuis di setiap modul

### FAQ & Bantuan
1. Akses halaman FAQ
2. Gunakan fitur pencarian
3. Filter berdasarkan kategori
4. Hubungi tim support melalui contact form jika diperlukan

## 🔐 Security (Updated)
- HTTP-Only Session Cookies ✅
- Secure Token Management ✅
- Protected API Endpoints ✅
- Firebase Security Rules ✅
- Input Sanitization ✅
- XSS Prevention ✅
- SSL Encryption ✅

## 🌐 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 👥 Kontribusi
Project ini masih dalam pengembangan. Beberapa fitur yang akan datang:
- Sistem manajemen progress
- Achievement system
- Riwayat pembelajaran
- Dashboard user

## 📝 Lisensi
© 2024 LabDz Virtual Lab. All rights reserved.

## 👨‍💻 Developer
Dikembangkan oleh Dzulfaqor Ali Dipangegara
- NIM: 18222017
- Program: Sarjana Sistem Teknologi dan Informasi
- Institut: Institut Teknologi Bandung

## 📞 Kontak
Untuk pertanyaan dan dukungan, silakan hubungi melalui:
- Form kontak di website
- FAQ section
- Newsletter subscription
- Instagram: [@dzzulfaqorr](https://instagram.com/dzzulfaqorr)

## 🔄 Status Pengembangan
[![Development Status](https://img.shields.io/badge/status-active-success.svg)]()
- **Completed**: Basic Authentication, Session Management, User Profiles
- **In Progress**: Learning Management System, Achievement System
- **Planned**: Enhanced Security Features, Advanced Analytics

## 🔍 Status
[![Website Status](https://img.shields.io/website-up-down-green-red/http/monip.org.svg)](https://your-website-url.com)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://semver.org)

---
Developed with 💻 by [Dzulfaqor Ali Dipangegara](https://github.com/dzulfaqorali196)