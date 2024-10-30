document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[action="https://api.web3forms.com/submit"]');
    
    // Pastikan CONFIG tersedia
    if (typeof CONFIG === 'undefined') {
        console.error('CONFIG tidak ditemukan. Pastikan config.js dimuat sebelum script.js');
        return;
    }

    forms.forEach(form => {
        // Set access key
        const accessKeyInput = form.querySelector('input[name="access_key"]');
        if (accessKeyInput && CONFIG.WEB3FORMS_KEY) {
            accessKeyInput.value = CONFIG.WEB3FORMS_KEY;
        }

        // Handle form submission
        form.addEventListener('submit', function(e) {
            // Form handling logic tetap sama
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Modified smooth scroll function
    function smoothScroll(e) {
        const targetId = this.getAttribute('href');
        
        // Cek apakah link mengarah ke halaman yang berbeda
        if (targetId.includes('.html') || targetId.startsWith('/')) {
            // Ini adalah link ke halaman lain, biarkan perilaku default
            return;
        }
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        // Cek apakah elemen target ada di halaman ini
        if (!targetElement) {
            // Jika tidak ada, arahkan ke halaman index.html dengan anchor
            window.location.href = '/index.html' + targetId;
            return;
        }
        
        // Lanjutkan dengan smooth scroll jika elemen ada di halaman ini
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        window.requestAnimationFrame(step);

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if (progress < duration) window.requestAnimationFrame(step);
        }

        
        // Close menu after clicking a link (for mobile)
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    }

        // Easing function
        function easeInOutCubic(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        }

        // Event listeners
        menuTrigger.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const isClickInside = menuContainer.contains(e.target) || menuTrigger.contains(e.target);
            if (!isClickInside && menuContainer.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close menu on scroll (optional)
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                closeMenu();
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);

        // Highlight active menu item (optional)
        function highlightActiveMenuItem() {
            const sections = document.querySelectorAll('section');
            const navItems = document.querySelectorAll('nav ul li a');

            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1) === current) {
                    item.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightActiveMenuItem);
});

// Header Sticky Functionality
document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('header');
    var scrollThreshold = 50; // Jumlah pixel scroll sebelum efek diterapkan
  
    window.addEventListener('scroll', function() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
});



// Function Simulasi Lengkap
// Menunggu DOM selesai dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {
    initRulerSimulation();
    initUnitConverter();
    initErrorCalculator();
    initCaliperSimulation();
    initMicrometerSimulation();
    initOhausBalanceSimulation();
});

// Fungsi untuk menginisialisasi simulasi penggaris
function initRulerSimulation() {
    const rulerCanvas = document.getElementById('rulerCanvas');
    const ctx = rulerCanvas.getContext('2d');
    const measurementResult = document.getElementById('measurementResult');
    const unitSelect = document.getElementById('unitSelect');
    const newObjectBtn = document.getElementById('newMeasurement');
    
    let objectWidth = 100; // Lebar awal objek dalam milimeter
    let objectPosition = 50; // Posisi awal objek
    let isDragging = false;
    let touchStartX;

    // Definisi satuan dan faktor konversi (relatif terhadap milimeter)
    const units = {
        'mm': { name: 'Milimeter', factor: 1 },
        'cm': { name: 'Centimeter', factor: 0.1 },
        'm': { name: 'Meter', factor: 0.001 },
        'in': { name: 'Inci', factor: 0.0393701 },
        'ft': { name: 'Kaki', factor: 0.00328084 },
        'yd': { name: 'Yard', factor: 0.00109361 }
    };

    // Populate unit select dropdown
    for (let unit in units) {
        let option = document.createElement('option');
        option.value = unit;
        option.textContent = units[unit].name;
        unitSelect.appendChild(option);
    }

    // Fungsi untuk menggambar penggaris dan objek
    function drawRuler() {
        ctx.clearRect(0, 0, rulerCanvas.width, rulerCanvas.height);
        
        // Gambar penggaris
        ctx.beginPath();
        ctx.moveTo(0, 150);
        ctx.lineTo(400, 150);
        ctx.stroke();
        
        // Gambar tanda ukuran
        const currentUnit = unitSelect.value;
        const unitFactor = units[currentUnit].factor;
        const majorTickInterval = currentUnit === 'mm' ? 50 : 100;
        for (let i = 0; i <= 400; i += 10) {
            ctx.beginPath();
            ctx.moveTo(i, 150);
            ctx.lineTo(i, i % majorTickInterval === 0 ? 130 : 140);
            ctx.stroke();
            
            if (i % majorTickInterval === 0) {
                const measurement = (i * unitFactor).toFixed(currentUnit === 'mm' ? 0 : 2);
                ctx.fillText(measurement, i - 15, 120);
            }
        }
        
        // Gambar objek yang diukur
        ctx.fillStyle = 'red';
        ctx.fillRect(objectPosition, 50, objectWidth, 80);
        
        // Tampilkan hasil pengukuran
        updateMeasurementResult();
    }
    
    // Fungsi untuk memperbarui hasil pengukuran
    function updateMeasurementResult() {
        const currentUnit = unitSelect.value;
        const unitFactor = units[currentUnit].factor;
        const measurement = (objectWidth * unitFactor).toFixed(currentUnit === 'mm' ? 0 : 2);
        measurementResult.textContent = `Panjang objek: ${measurement} ${currentUnit}`;
    }
    
    // Fungsi untuk membuat objek baru
    function createNewObject() {
        objectWidth = Math.floor(Math.random() * 200) + 50; // Lebar acak antara 50 dan 250 mm
        objectPosition = Math.floor(Math.random() * (400 - objectWidth)); // Posisi acak
        drawRuler();
    }
    
    // Event listener untuk perubahan satuan
    unitSelect.addEventListener('change', drawRuler);
    
    // Event listener untuk tombol objek baru
    newObjectBtn.addEventListener('click', createNewObject);
    
    // Event listener untuk mouse down pada canvas
    rulerCanvas.addEventListener('mousedown', function(e) {
        const rect = rulerCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        // Cek apakah klik pada objek
        if (x >= objectPosition && x <= objectPosition + objectWidth) {
            isDragging = true;
        }
    });
    
    // Event listener untuk mouse move pada canvas
    rulerCanvas.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const rect = rulerCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            
            // Batasi pergerakan objek dalam canvas
            objectPosition = Math.max(0, Math.min(x, 400 - objectWidth));
            
            drawRuler();
        }
    });
    
    // Event listener untuk mouse up pada dokumen
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // Event listener untuk mengubah lebar objek dengan mouse wheel
    rulerCanvas.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        // Ubah lebar objek berdasarkan scroll
        objectWidth += e.deltaY > 0 ? -5 : 5;
        objectWidth = Math.max(10, Math.min(objectWidth, 400 - objectPosition));
        
        drawRuler();
    });
    
    // Touch event listeners for mobile devices
    rulerCanvas.addEventListener('touchstart', function(e) {
        const rect = rulerCanvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        
        if (x >= objectPosition && x <= objectPosition + objectWidth) {
            isDragging = true;
            touchStartX = x - objectPosition;
        }
    });

    rulerCanvas.addEventListener('touchmove', function(e) {
        if (isDragging) {
            e.preventDefault();
            const rect = rulerCanvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            
            objectPosition = Math.max(0, Math.min(x - touchStartX, 400 - objectWidth));
            
            drawRuler();
        }
    });

    rulerCanvas.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // Gambar penggaris awal
    drawRuler();
}

// Fungsi untuk menginisialisasi konverter satuan
function initUnitConverter() {
    const fromValue = document.getElementById('fromValue');
    const fromUnit = document.getElementById('fromUnit');
    const toValue = document.getElementById('toValue');
    const toUnit = document.getElementById('toUnit');
    const swapUnitsBtn = document.getElementById('swapUnits');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // Definisi unit untuk setiap kategori
    const units = {
        length: ['mm', 'cm', 'm', 'km', 'inch', 'foot', 'yard', 'mile'],
        mass: ['mg', 'g', 'kg', 'ton', 'ounce', 'pound'],
        volume: ['ml', 'l', 'cc', 'm3', 'gallon', 'quart', 'pint', 'cup'],
        temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
    };
    
    // Faktor konversi untuk setiap unit (relatif terhadap satuan dasar)
    const conversionFactors = {
        // Panjang (satuan dasar: meter)
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344,
        // Massa (satuan dasar: kilogram)
        mg: 0.000001,
        g: 0.001,
        kg: 1,
        ton: 1000,
        ounce: 0.0283495,
        pound: 0.453592,
        // Volume (satuan dasar: liter)
        ml: 0.001,
        l: 1,
        cc: 0.001,
        m3: 1000,
        gallon: 3.78541,
        quart: 0.946353,
        pint: 0.473176,
        cup: 0.236588
    };
    
    // Fungsi untuk mengisi opsi unit
    function populateUnitOptions(category) {
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        units[category].forEach(unit => {
            fromUnit.add(new Option(unit, unit));
            toUnit.add(new Option(unit, unit));
        });
    }
    
    // Inisialisasi dengan kategori panjang
    populateUnitOptions('length');
    
    // Event listener untuk tombol kategori
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            populateUnitOptions(this.dataset.category);
            convert();
        });
    });
    
    function initSwapButton() {
        const swapButton = document.getElementById('swapUnits');
        const icon = swapButton.querySelector('i');
        
        swapButton.addEventListener('click', function() {
            // Animasi rotasi
            icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
            
            // Tukar nilai unit
            const fromUnit = document.getElementById('fromUnit');
            const toUnit = document.getElementById('toUnit');
            const tempUnit = fromUnit.value;
            fromUnit.value = toUnit.value;
            toUnit.value = tempUnit;
            
            // Lakukan konversi ulang
            convert();
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        initSwapButton();
    });

    // Fungsi untuk menukar unit
    swapUnitsBtn.addEventListener('click', function() {
        const tempUnit = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = tempUnit;
        convert();
    });
    
    // Fungsi untuk melakukan konversi
    function convert() {
        const from = fromUnit.value;
        const to = toUnit.value;
        const value = parseFloat(fromValue.value);
        
        if (isNaN(value)) {
            toValue.value = '';
            return;
        }
        
        let result;
        if (from === to) {
            result = value;
        } else if (units.temperature.includes(from) && units.temperature.includes(to)) {
            result = convertTemperature(value, from, to);
        } else {
            const baseValue = value * conversionFactors[from];
            result = baseValue / conversionFactors[to];
        }
        
        toValue.value = result.toFixed(4);
    }
    
    // Fungsi khusus untuk konversi suhu
    function convertTemperature(value, from, to) {
        let celsius;
        
        // Konversi ke Celsius
        if (from === 'Celsius') {
            celsius = value;
        } else if (from === 'Fahrenheit') {
            celsius = (value - 32) * 5/9;
        } else if (from === 'Kelvin') {
            celsius = value - 273.15;
        }
        
        // Konversi dari Celsius ke unit tujuan
        if (to === 'Celsius') {
            return celsius;
        } else if (to === 'Fahrenheit') {
            return (celsius * 9/5) + 32;
        } else if (to === 'Kelvin') {
            return celsius + 273.15;
        }
    }
    
    // Event listener untuk input dan perubahan unit
    fromValue.addEventListener('input', convert);
    fromUnit.addEventListener('change', convert);
    toUnit.addEventListener('change', convert);
}

// Fungsi untuk menginisialisasi kalkulator error
function initErrorCalculator() {
    const measuredValue = document.getElementById('measuredValue');
    const actualValue = document.getElementById('actualValue');
    const errorResult = document.getElementById('errorResult');
    const errorExplanation = document.getElementById('errorExplanation');
    const calculateErrorBtn = document.getElementById('calculateError');
    
    calculateErrorBtn.addEventListener('click', function() {
        const measured = parseFloat(measuredValue.value);
        const actual = parseFloat(actualValue.value);
        
        if (isNaN(measured) || isNaN(actual)) {
            errorResult.textContent = 'Masukkan nilai yang valid';
            errorExplanation.textContent = '';
            return;
        }
        
        const absoluteError = Math.abs(measured - actual);
        const relativeError = absoluteError / Math.abs(actual);
        const percentageError = relativeError * 100;
        
        errorResult.innerHTML = `
            <p><strong>Error Absolut:</strong> ${absoluteError.toFixed(4)}</p>
            <p><strong>Error Relatif:</strong> ${relativeError.toFixed(4)}</p>
            <p><strong>Error Persentase:</strong> ${percentageError.toFixed(2)}%</p>
        `;
        
        errorExplanation.innerHTML = `
            <p><strong>Error Absolut:</strong> Perbedaan antara nilai terukur dan nilai sebenarnya.</p>
            <p><strong>Error Relatif:</strong> Rasio error absolut terhadap nilai sebenarnya (tanpa satuan).</p>
            <p><strong>Error Persentase:</strong> Error relatif yang dinyatakan dalam persentase.</p>
        `;
    });
}

        // Fungsi utama untuk menginisialisasi simulasi jangka sorong
 // Konstanta dan variabel global
const VERNIER_PRECISION = 0.05;
let isDragging = false;
let startX, startLeft;
let isZoomed = false;
let isLocked = false;
let currentObject = null;

// Fungsi yang dijalankan saat DOM telah dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi elemen-elemen DOM
    const svg = document.getElementById('caliper');
    const movablePart = document.getElementById('movable-part');
    const measurement = document.getElementById('measurement');
    const zoomIcon = document.getElementById('zoom-icon');
    const zoomView = document.getElementById('zoom-view');
    const movingArrow = document.getElementById('moving-arrow');
    const lockButton = document.getElementById('lock-button');
    const addObjectButton = document.getElementById('add-object');
    const removeObjectButton = document.getElementById('remove-object');
    const caliperContainer = document.getElementById('caliper-container');
    const mainScale = document.getElementById('main-scale');
    const vernierScale = document.getElementById('vernier-scale');

    // Atur style untuk div measurement
    measurement.style.position = 'absolute';
    measurement.style.bottom = '10px';
    measurement.style.left = '50%';
    measurement.style.transform = 'translateX(-50%)';
    measurement.style.fontSize = '18px';
    measurement.style.fontWeight = 'bold';
    measurement.style.backgroundColor = 'white';
    measurement.style.padding = '5px 10px';
    measurement.style.border = '1px solid black';
    measurement.style.zIndex = '1000';

    // Fungsi untuk membuat skala utama
    function createMainScale() {
        for (let i = 0; i <= 100; i++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', 100 + i * 6);
            line.setAttribute('y1', i % 10 === 0 ? 45 : (i % 5 === 0 ? 50 : 55));
            line.setAttribute('x2', 100 + i * 6);
            line.setAttribute('y2', 65);
            line.setAttribute('stroke', 'black');
            line.setAttribute('class', 'zoom-line');
            mainScale.appendChild(line);

            if (i % 10 === 0) {
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', 100 + i * 6);
                text.setAttribute('y', 40);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('font-size', '10');
                text.textContent = i / 10;
                mainScale.appendChild(text);
            }
        }
    }

    // Fungsi untuk membuat skala nonius (vernier)
    function createVernierScale() {
        for (let i = 0; i <= 10; i++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', i * 5.4);
            line.setAttribute('y1', 0);
            line.setAttribute('x2', i * 5.4);
            line.setAttribute('y2', 20);
            line.setAttribute('stroke', 'black');
            line.setAttribute('class', 'zoom-line');
            vernierScale.appendChild(line);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', i * 5.4);
            text.setAttribute('y', 35);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '8');
            text.textContent = i;
            vernierScale.appendChild(text);
        }
    }

    // Fungsi untuk memperbarui hasil pengukuran
    function updateMeasurement(position) {
        const mainScaleReading = Math.floor(position / 10) * 1;
        const vernierPosition = (position / 10) % 1;
        const vernierReading = Math.round(vernierPosition / VERNIER_PRECISION) * VERNIER_PRECISION;
        const totalMeasurement = mainScaleReading + vernierReading;
        measurement.textContent = `${totalMeasurement.toFixed(2)} mm`;
    }

    // Fungsi untuk memulai drag
    function startDrag(event) {
        if (isLocked) return;
        event.preventDefault();
        isDragging = true;
        startX = event.clientX;
        const transform = movablePart.getAttribute('transform');
        startLeft = transform ? parseFloat(transform.split('(')[1]) : 0;
    }

    // Fungsi untuk melakukan drag
    function drag(event) {
        if (!isDragging) return;
        const dx = event.clientX - startX;
        let newLeft = startLeft + dx;

        let leftBoundary = 0;
        if (currentObject && parseFloat(currentObject.style.left) <= 100) {
            leftBoundary = currentObject.offsetWidth;
        }

        newLeft = Math.max(leftBoundary, Math.min(newLeft, 500));

        movablePart.setAttribute('transform', `translate(${newLeft}, 0)`);
        vernierScale.setAttribute('transform', `translate(${100 + newLeft}, 90)`);
        movingArrow.setAttribute('transform', `translate(${newLeft}, 0)`);
        updateMeasurement(newLeft);
    }

    // Fungsi untuk mengakhiri drag
    function endDrag() {
        isDragging = false;
    }

    // Fungsi untuk toggle zoom
    function toggleZoom() {
        isZoomed = !isZoomed;
        if (isZoomed) {
            zoomView.style.display = 'block';
            zoomView.innerHTML = svg.outerHTML;
            const zoomedSvg = zoomView.querySelector('svg');
            zoomedSvg.setAttribute('viewBox', '80 20 200 100');
            zoomedSvg.style.width = '100%';
            zoomedSvg.style.height = '100%';
            
            zoomedSvg.querySelectorAll('.zoom-line').forEach(el => {
                const y1 = parseFloat(el.getAttribute('y1'));
                const y2 = parseFloat(el.getAttribute('y2'));
                el.setAttribute('y1', y1 - 10);
                el.setAttribute('y2', y2 + 10);
            });

            const zoomOutIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            zoomOutIcon.setAttribute('viewBox', '0 0 24 24');
            zoomOutIcon.setAttribute('width', '30');
            zoomOutIcon.setAttribute('height', '30');
            zoomOutIcon.style.position = 'absolute';
            zoomOutIcon.style.bottom = '10px';
            zoomOutIcon.style.right = '10px';
            zoomOutIcon.style.cursor = 'pointer';
            zoomOutIcon.innerHTML = '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"/>';
            zoomOutIcon.addEventListener('click', toggleZoom);
            zoomView.appendChild(zoomOutIcon);
        } else {
            zoomView.style.display = 'none';
        }
    }

    // Fungsi untuk toggle lock
    function toggleLock() {
        isLocked = !isLocked;
        lockButton.setAttribute('fill', isLocked ? '#ff0000' : '#999');
    }

    // Fungsi untuk menambah objek
    function addObject() {
        if (currentObject) removeObject();
        const width = Math.floor(Math.random() * 91) + 10;
        currentObject = document.createElement('div');
        currentObject.className = 'measurable-object';
        currentObject.style.width = `${width}px`;
        currentObject.style.left = '400px';
        currentObject.style.top = '200px';
        currentObject.addEventListener('mousedown', startObjectDrag);
        caliperContainer.appendChild(currentObject);
    }

    // Fungsi untuk menghapus objek
    function removeObject() {
        if (currentObject) {
            caliperContainer.removeChild(currentObject);
            currentObject = null;
        }
    }

    // Fungsi untuk memulai drag objek
    function startObjectDrag(event) {
        event.preventDefault();
        const startX = event.clientX - currentObject.offsetLeft;
        const startY = event.clientY - currentObject.offsetTop;

        function dragObject(event) {
            let left = event.clientX - startX;
            let top = event.clientY - startY;
            const caliperRect = svg.getBoundingClientRect();
            const objectRect = currentObject.getBoundingClientRect();

            if (Math.abs(left - 100) < 20) {
                left = 100;
            }

            left = Math.max(100, Math.min(left, caliperRect.width - objectRect.width));
            top = Math.max(0, Math.min(top, caliperRect.height - objectRect.height));

            currentObject.style.left = `${left}px`;
            currentObject.style.top = `${top}px`;
        }

        function stopDragObject() {
            document.removeEventListener('mousemove', dragObject);
            document.removeEventListener('mouseup', stopDragObject);
        }

        document.addEventListener('mousemove', dragObject);
        document.addEventListener('mouseup', stopDragObject);
    }

    // Event listeners
    movablePart.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mouseleave', endDrag);
    zoomIcon.addEventListener('click', toggleZoom);
    lockButton.addEventListener('click', toggleLock);
    addObjectButton.addEventListener('click', addObject);
    removeObjectButton.addEventListener('click', removeObject);

    // Inisialisasi
    createMainScale();
    createVernierScale();
    updateMeasurement(0);
});    

// Mendapatkan elemen-elemen DOM
const thimble = document.getElementById('thimble');
const spindle = document.getElementById('spindle');
const pengukuran = document.getElementById('pengukuran');
const aturUlangBtn = document.getElementById('atur-ulang');
const objekBaruBtn = document.getElementById('objek-baru');

// Variabel untuk melacak posisi dan pengukuran
let posisiAwal = 0;
let posisiSaatIni = 0;
let nilaiPengukuran = 0;
let objekUkur = null;

// Fungsi untuk menggambar skala pada sleeve dan thimble
function gambarSkala() {
    const mainScale = document.getElementById('main-scale');
    const thimbleScale = document.getElementById('thimble-scale');
    
    // Gambar skala utama
    for (let i = 0; i <= 25; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 40 + i * 10);
        line.setAttribute("y1", 45);
        line.setAttribute("x2", 40 + i * 10);
        line.setAttribute("y2", i % 5 === 0 ? 35 : 40);
        line.setAttribute("stroke", "#000");
        line.setAttribute("stroke-width", "1");
        mainScale.appendChild(line);
        
        if (i % 5 === 0) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", 40 + i * 10);
            text.setAttribute("y", 30);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "8");
            text.textContent = i;
            mainScale.appendChild(text);
        }
    }
    
    // Gambar skala thimble
    for (let i = 0; i < 50; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const angle = i * 7.2 - 90;
        const r1 = 34;
        const r2 = i % 5 === 0 ? 30 : 32;
        line.setAttribute("x1", r1 * Math.cos(angle * Math.PI / 180));
        line.setAttribute("y1", r1 * Math.sin(angle * Math.PI / 180));
        line.setAttribute("x2", r2 * Math.cos(angle * Math.PI / 180));
        line.setAttribute("y2", r2 * Math.sin(angle * Math.PI / 180));
        line.setAttribute("stroke", "#000");
        line.setAttribute("stroke-width", "1");
        thimbleScale.appendChild(line);
        
        if (i % 5 === 0) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            const textR = 26;
            text.setAttribute("x", textR * Math.cos(angle * Math.PI / 180));
            text.setAttribute("y", textR * Math.sin(angle * Math.PI / 180));
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "8");
            text.setAttribute("transform", `rotate(${angle + 90})`);
            text.textContent = i;
            thimbleScale.appendChild(text);
        }
    }
}

// Fungsi untuk mengubah pengukuran berdasarkan rotasi bidal
function updatePengukuran(rotasi) {
    nilaiPengukuran = (rotasi / 360) * 0.5;
    nilaiPengukuran = Math.min(Math.max(nilaiPengukuran, 0), 25);
    pengukuran.textContent = nilaiPengukuran.toFixed(3);
    
    // Update posisi spindle
    const spindleTranslasi = (nilaiPengukuran / 25) * 250;
    spindle.setAttribute('x', 40 + spindleTranslasi);
    
    // Update posisi thimble
    thimble.setAttribute('transform', `translate(${290 + spindleTranslasi}, 75) rotate(${rotasi})`);
}

// Event listener untuk drag thimble
thimble.addEventListener('mousedown', mulaiDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', selesaiDrag);
thimble.addEventListener('touchstart', mulaiDragTouch);
document.addEventListener('touchmove', dragTouch);
document.addEventListener('touchend', selesaiDragTouch);

function mulaiDrag(e) {
    e.preventDefault();
    posisiAwal = e.clientX;
}

function drag(e) {
    if (posisiAwal !== null) {
        const perbedaan = e.clientX - posisiAwal;
        posisiSaatIni += perbedaan;
        const rotasi = (posisiSaatIni / 2) % 360;
        updatePengukuran(rotasi);
        posisiAwal = e.clientX;
    }
}

function selesaiDrag() {
    posisiAwal = null;
}

// Touch events untuk perangkat mobile
function mulaiDragTouch(e) {
    e.preventDefault();
    posisiAwal = e.touches[0].clientX;
}

function dragTouch(e) {
    if (posisiAwal !== null) {
        const perbedaan = e.touches[0].clientX - posisiAwal;
        posisiSaatIni += perbedaan;
        const rotasi = (posisiSaatIni / 2) % 360;
        updatePengukuran(rotasi);
        posisiAwal = e.touches[0].clientX;
    }
}

function selesaiDragTouch() {
    posisiAwal = null;
}

// Fungsi untuk membuat objek baru yang akan diukur
function buatObjekBaru() {
    if (objekUkur) {
        objekUkur.remove();
    }
    const ukuranObjek = Math.random() * 25;
    objekUkur = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    objekUkur.setAttribute("x", "10");
    objekUkur.setAttribute("y", "100");
    objekUkur.setAttribute("width", ukuranObjek * 10);
    objekUkur.setAttribute("height", "10");
    objekUkur.setAttribute("fill", "blue");
    document.getElementById('micrometer').appendChild(objekUkur);
}

// Event listener untuk tombol atur ulang
aturUlangBtn.addEventListener('click', () => {
    posisiSaatIni = 0;
    nilaiPengukuran = 0;
    updatePengukuran(0);
    if (objekUkur) {
        objekUkur.remove();
        objekUkur = null;
    }
});

// Event listener untuk tombol objek baru
objekBaruBtn.addEventListener('click', buatObjekBaru);

// Inisialisasi
gambarSkala();
updatePengukuran(0);

/* Subscription Error Handling */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email-input');
    const formMessage = document.getElementById('form-message');
  
    form.addEventListener('submit', function(e) {
      // Clear previous messages
      formMessage.textContent = '';
      formMessage.className = 'form-message';
  
      // Validate email
      if (!validateEmail(emailInput.value)) {
        e.preventDefault(); // Prevent form submission only if email is invalid
        showMessage('Please enter a valid email address.', 'error');
      }
    });
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    function showMessage(message, type) {
      formMessage.textContent = message;
      formMessage.className = `form-message ${type}`;
    }
  });
