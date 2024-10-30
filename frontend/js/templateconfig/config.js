const CONFIG = {
    WEB3FORMS_KEY: '89994006-c1ab-43d2-9ac3-4e0f9f5ddf6e'
};
window.CONFIG = CONFIG;

document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    const contactForm = document.getElementById('contactform')
    const accessKeyInput = newsletterForm.querySelector('input[name="access_key"]');
    
    // Fungsi untuk mengatur access key pada form
    function setAccessKey(form) {
        if (!form) return;
        const accessKeyInput = form.querySelector('input[name="access_key"]');
        if (accessKeyInput && CONFIG && CONFIG.WEB3FORMS_KEY) {
            accessKeyInput.value = CONFIG.WEB3FORMS_KEY;
        }
    }

    // Set access key untuk kedua form
    setAccessKey(newsletterForm);
    setAccessKey(contactForm);
});
