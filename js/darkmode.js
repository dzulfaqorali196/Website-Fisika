// Membuat dan menambahkan toggle switch
function createDarkModeToggle() {
    const toggleWrapper = document.createElement('div');
    toggleWrapper.className = 'theme-switch-wrapper';
    
    toggleWrapper.innerHTML = `
      <label class="theme-switch" for="checkbox">
        <input type="checkbox" id="checkbox" />
        <div class="slider"></div>
      </label>
    `;
    
    // Sisipkan toggle ke dalam nav
    const nav = document.querySelector('nav');
    if (nav) {
      nav.appendChild(toggleWrapper);
    }
  }
  
  // Fungsi untuk menerapkan dark mode
  function applyDarkMode(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      
      // Jika di halaman quiz, jaga modal tetap light
      const modal = document.querySelector('.lesson-modal-content');
      if (modal) {
        modal.style.backgroundColor = 'var(--white)';
        modal.style.color = 'var(--text-color)';
      }
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }
  
  // Inisialisasi dark mode
  function initDarkMode() {
    createDarkModeToggle();
    
    const toggleSwitch = document.querySelector('#checkbox');
    if (!toggleSwitch) return;
  
    // Periksa status dark mode dari session storage
    const isDarkMode = sessionStorage.getItem('darkMode') === 'true';
    
    // Terapkan tema sesuai session storage
    toggleSwitch.checked = isDarkMode;
    applyDarkMode(isDarkMode);
  
    // Event listener untuk toggle switch
    toggleSwitch.addEventListener('change', (e) => {
      const isDark = e.target.checked;
      applyDarkMode(isDark);
      // Simpan preferensi ke session storage
      sessionStorage.setItem('darkMode', isDark);
    });
  }
  
  // Jalankan saat DOM sudah siap
  document.addEventListener('DOMContentLoaded', initDarkMode);

    // Add scroll behavior for mobile toggle visibility
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 768) {
        const currentScroll = window.pageYOffset;
        const toggleWrapper = document.querySelector('.theme-switch-wrapper');
        
        if (currentScroll > lastScrollTop) {
          // Scrolling down
          toggleWrapper.style.transform = 'translateY(100px)';
        } else {
          // Scrolling up
          toggleWrapper.style.transform = 'translateY(0)';
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      }
    }, false);
  ;