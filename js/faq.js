document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.getElementById('faqSearch');
    const categoryBtns = document.querySelectorAll('.category-btn');

    // Debounce function for search
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Enhanced search with highlighting
    const handleSearch = debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
        
        if (!searchTerm) {
            // Reset display when search is empty
            faqItems.forEach(item => {
                item.style.display = activeCategory === 'all' || item.dataset.category === activeCategory ? 'block' : 'none';
                removeHighlights(item);
            });
            return;
        }

        faqItems.forEach(item => {
            const question = item.querySelector('h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer span').textContent.toLowerCase();
            const matchesCategory = activeCategory === 'all' || item.dataset.category === activeCategory;
            const matchesSearch = question.includes(searchTerm) || answer.includes(searchTerm);

            if (matchesSearch && matchesCategory) {
                item.style.display = 'block';
                highlightText(item, searchTerm);
            } else {
                item.style.display = 'none';
                removeHighlights(item);
            }
        });
    }, 300);

    function highlightText(item, searchTerm) {
        const question = item.querySelector('h3');
        const answer = item.querySelector('.faq-answer span');

        [question, answer].forEach(element => {
            const text = element.textContent;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            element.innerHTML = text.replace(regex, '<mark>$1</mark>');
        });
    }

    function removeHighlights(item) {
        const elements = item.querySelectorAll('h3, .faq-answer span');
        elements.forEach(element => {
            element.innerHTML = element.textContent;
        });
    }

    // Event Listeners
    searchInput.addEventListener('input', handleSearch);

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            faqItems.forEach(item => {
                const matchesCategory = category === 'all' || item.dataset.category === category;
                const matchesSearch = !searchTerm || 
                    item.querySelector('h3').textContent.toLowerCase().includes(searchTerm) ||
                    item.querySelector('.faq-answer span').textContent.toLowerCase().includes(searchTerm);
                
                item.style.display = matchesCategory && matchesSearch ? 'block' : 'none';
            });
        });
    });

    // Toggle FAQ items
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle clicked item
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
});

/* WhatsApp Functionality - Direct to App */
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsappButton');
    const phoneNumber = '62895340620005'; // Nomor tanpa awalan 0, dengan kode negara
    const message = encodeURIComponent('halo ganteng, izin tanya');

    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Gunakan URL scheme untuk langsung membuka aplikasi WhatsApp
        const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
        
        try {
            // Coba buka WhatsApp
            window.location.href = whatsappUrl;
            
            // Set timeout untuk cek apakah WhatsApp terbuka
            setTimeout(() => {
                // Jika masih di halaman yang sama, mungkin WhatsApp tidak terinstall
                if (document.hasFocus()) {
                    alert('Sepertinya WhatsApp tidak terinstall. Silakan install WhatsApp terlebih dahulu.');
                }
            }, 500);
        } catch(e) {
            alert('Terjadi kesalahan saat membuka WhatsApp. Pastikan WhatsApp terinstall di device Anda.');
        }
    });
});