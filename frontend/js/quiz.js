// =========== UTILITY FUNCTIONS ===========

/**
 * Toggle section collapsible untuk menampilkan/menyembunyikan konten
 * @param {Event} event - Event dari click handler
 */
function toggleSection(event) {
    const sectionHeader = event.currentTarget;
    const sectionContent = sectionHeader.nextElementSibling;
    const icon = sectionHeader.querySelector('i');

    if (sectionContent.style.maxHeight) {
        sectionContent.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    } else {
        sectionContent.style.maxHeight = sectionContent.scrollHeight + "px";
        icon.style.transform = 'rotate(180deg)';
    }
}

// =========== COURSE CONTENT ===========
// Definisi konten pembelajaran dalam struktur modular
const courseContent = {
    // =========== PENGUKURAN DASAR ===========
    "pengantar-pengukuran": {
        title: "Pengantar Pengukuran",
        lessons: [
            {
                title: "Konsep Dasar Pengukuran",
                content: `
                    <div class="lesson-content">
                        <h3>Memahami Dasar Pengukuran</h3>
                        <p>Pengukuran adalah proses membandingkan suatu besaran dengan besaran standar yang telah ditetapkan sebelumnya. Dalam sains, pengukuran merupakan hal fundamental yang memungkinkan kita untuk:</p>
                        <ul>
                            <li>Mendapatkan data kuantitatif yang akurat</li>
                            <li>Melakukan eksperimen yang dapat diulang</li>
                            <li>Memverifikasi teori ilmiah</li>
                        </ul>

                        <div class="concept-explanation">
                            <h4>Besaran dan Satuan</h4>
                            <p>Dalam pengukuran, kita mengenal dua komponen penting:</p>
                            <ul>
                                <li><strong>Besaran</strong>: Sesuatu yang dapat diukur dan dinyatakan dengan angka</li>
                                <li><strong>Satuan</strong>: Pembanding dalam suatu pengukuran</li>
                            </ul>
                        </div>

                        <div class="measurement-principles">
                            <h4>Prinsip-Prinsip Pengukuran</h4>
                            <ol>
                                <li>Menggunakan alat ukur yang sesuai</li>
                                <li>Mengkalibrasi alat ukur sebelum digunakan</li>
                                <li>Memperhatikan posisi pengukuran yang tepat</li>
                                <li>Melakukan pengukuran berulang</li>
                                <li>Mencatat hasil dengan ketidakpastian</li>
                            </ol>
                        </div>

                        <div class="key-points">
                            <h4>Poin-Poin Penting:</h4>
                            <ul>
                                <li>Setiap pengukuran harus memiliki satuan</li>
                                <li>Pengukuran selalu memiliki ketidakpastian</li>
                                <li>Pemilihan alat ukur mempengaruhi ketelitian</li>
                                <li>Pengukuran yang baik bersifat dapat diulang</li>
                            </ul>
                        </div>
                    </div>
                `,
                type: "content"
            },
            {
                title: "Latihan Pengantar Pengukuran",
                type: "quiz",
                questions: [
                    {
                        question: "Apa tujuan utama dari pengukuran?",
                        options: [
                            "Membandingkan suatu besaran dengan standar",
                            "Menghitung jumlah benda",
                            "Menentukan warna benda"
                        ],
                        correct: 0,
                        explanation: "Pengukuran bertujuan untuk membandingkan suatu besaran dengan besaran standar yang telah ditetapkan."
                    }
                ]
            }
        ]
    },

    // =========== ALAT UKUR PANJANG ===========
    "alat-ukur-panjang": {
        title: "Alat Ukur Panjang",
        lessons: [
            {
                title: "Pengenalan Alat Ukur Panjang",
                content: `
                    <div class="lesson-content">
                        <h3>Alat Ukur Panjang</h3>
                        <p>Alat ukur panjang adalah instrumen yang digunakan untuk mengukur dimensi suatu benda, seperti panjang, lebar, tinggi, diameter, dan kedalaman.</p>

                        <div class="measurement-tool">
                            <h4>1. Penggaris/Mistar</h4>
                            <div class="tool-specs">
                                <ul>
                                    <li>Ketelitian: 1 mm atau 0,1 cm</li>
                                    <li>Rentang ukur: umumnya 30 cm atau 100 cm</li>
                                    <li>Penggunaan: mengukur panjang benda-benda berukuran sedang</li>
                                </ul>
                                <div class="tool-tips">
                                    <p><strong>Cara Penggunaan:</strong></p>
                                    <ul>
                                        <li>Posisikan angka nol pada ujung benda</li>
                                        <li>Baca skala pada ujung lain benda</li>
                                        <li>Pastikan pembacaan tegak lurus dengan skala</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="measurement-tool">
                            <h4>2. Jangka Sorong</h4>
                            <div class="tool-specs">
                                <ul>
                                    <li>Ketelitian: 0,1 mm atau 0,01 cm</li>
                                    <li>Bagian utama: rahang tetap dan rahang geser</li>
                                    <li>Fungsi tambahan: mengukur kedalaman dan diameter dalam</li>
                                </ul>
                                <div class="tool-tips">
                                    <p><strong>Cara Pembacaan:</strong></p>
                                    <ul>
                                        <li>Baca skala utama (cm/mm)</li>
                                        <li>Baca skala nonius yang segaris dengan skala utama</li>
                                        <li>Hasil = Skala Utama + (Skala Nonius × 0,1 mm)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="measurement-tool">
                            <h4>3. Mikrometer</h4>
                            <div class="tool-specs">
                                <ul>
                                    <li>Ketelitian: 0,01 mm atau 0,001 cm</li>
                                    <li>Bagian utama: poros tetap dan poros ulir</li>
                                    <li>Penggunaan: mengukur benda dengan tingkat ketelitian tinggi</li>
                                </ul>
                                <div class="tool-tips">
                                    <p><strong>Langkah Pengukuran:</strong></p>
                                    <ul>
                                        <li>Buka rahang secukupnya</li>
                                        <li>Tempatkan benda di antara landasan</li>
                                        <li>Putar ratchet hingga terdengar bunyi 'klik'</li>
                                        <li>Hasil = (Skala Utama + Skala Thimble) × 0,01 mm</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="key-points">
                        <h4>Poin-poin Penting:</h4>
                        <ul>
                            <li>Pilih alat ukur sesuai dengan tingkat ketelitian yang dibutuhkan</li>
                            <li>Penggaris memiliki ketelitian 1 mm untuk pengukuran dasar</li>
                            <li>Jangka sorong cocok untuk pengukuran diameter dan kedalaman</li>
                            <li>Mikrometer memberikan ketelitian tertinggi untuk benda tipis</li>
                            <li>Selalu kalibrasi alat sebelum melakukan pengukuran</li>
                            <li>Pastikan posisi pembacaan tegak lurus untuk menghindari paralaks</li>
                        </ul>
                    </div>
                </div>

                `,
                type: "content"
            },
            {
                title: "Latihan Alat Ukur",
                type: "quiz",
                questions: [
                    {
                        question: "Alat ukur manakah yang memiliki ketelitian tertinggi?",
                        options: [
                            "Penggaris",
                            "Jangka Sorong",
                            "Mikrometer"
                        ],
                        correct: 2,
                        explanation: "Mikrometer memiliki ketelitian hingga 0,01 mm, lebih teliti dibanding jangka sorong (0,1 mm) dan penggaris (1 mm)."
                    }
                ]
            }
        ]
    },

    // =========== PENGUKURAN MASSA ===========
    "pengukuran-massa": {
        title: "Pengukuran Massa",
        lessons: [
            {
                title: "Konsep Pengukuran Massa",
                content: `
                    <div class="lesson-content">
                        <h3>Pengukuran Massa</h3>
                        <p>Pengukuran massa adalah proses menentukan jumlah materi dalam suatu benda. Berbeda dengan berat yang dipengaruhi gravitasi, massa bersifat tetap di manapun benda berada.</p>

                        <div class="measurement-tool">
                            <h4>1. Neraca Ohaus</h4>
                            <div class="tool-specs">
                                <ul>
                                    <li>Ketelitian: 0,01 gram</li>
                                    <li>Kapasitas: hingga 311 gram</li>
                                    <li>Penggunaan: laboratorium dan pendidikan</li>
                                </ul>
                                <div class="tool-tips">
                                    <p><strong>Cara Penggunaan:</strong></p>
                                    <ul>
                                        <li>Seimbangkan neraca pada posisi nol</li>
                                        <li>Letakkan benda pada piringan</li>
                                        <li>Geser anak timbangan hingga seimbang</li>
                                        <li>Jumlahkan nilai pada ketiga lengan</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="measurement-tool">
                            <h4>2. Neraca Digital</h4>
                            <div class="tool-specs">
                                <ul>
                                    <li>Ketelitian: hingga 0,001 gram</li>
                                    <li>Kapasitas: bervariasi (1-12000 gram)</li>
                                    <li>Kelebihan: pembacaan langsung dan akurat</li>
                                </ul>
                                <div class="tool-tips">
                                    <p><strong>Prosedur Penggunaan:</strong></p>
                                    <ul>
                                        <li>Pastikan neraca dalam kondisi datar</li>
                                        <li>Lakukan kalibrasi/zero</li>
                                        <li>Letakkan benda di tengah platform</li>
                                        <li>Baca hasil digital yang ditampilkan</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="key-points">
                            <h4>Poin-poin Penting:</h4>
                            <ul>
                                <li>Pilih alat ukur sesuai dengan tingkat ketelitian yang dibutuhkan</li>
                                <li>Penggaris memiliki ketelitian 1 mm untuk pengukuran dasar</li>
                                <li>Jangka sorong cocok untuk pengukuran diameter dan kedalaman</li>
                                <li>Mikrometer memberikan ketelitian tertinggi untuk benda tipis</li>
                                <li>Selalu kalibrasi alat sebelum melakukan pengukuran</li>
                                <li>Pastikan posisi pembacaan tegak lurus untuk menghindari paralaks</li>
                            </ul>
                        </div>
                    </div>
                `,
                type: "content"
            },
            {
                title: "Latihan Pengukuran Massa",
                type: "quiz",
                questions: [
                    {
                        question: "Manakah yang bukan merupakan karakteristik massa?",
                        options: [
                            "Tetap di manapun benda berada",
                            "Berubah sesuai gravitasi",
                            "Menunjukkan jumlah materi"
                        ],
                        correct: 1,
                        explanation: "Massa bersifat tetap dan tidak berubah oleh gravitasi. Yang berubah karena gravitasi adalah berat benda."
                    }
                ]
            }
        ]
    },
        // =========== KONVERSI SATUAN ===========
        "dasar-konversi-satuan": {
            title: "Dasar Konversi Satuan",
            lessons: [
                {
                    title: "Konsep Dasar Konversi Satuan",
                    content: `
                        <div class="lesson-content">
                            <h3>Memahami Konversi Satuan</h3>
                            <p>Konversi satuan adalah proses mengubah suatu satuan ke satuan lain yang setara. Hal ini penting dalam sains dan kehidupan sehari-hari untuk:</p>
                            <ul>
                                <li>Menyeragamkan satuan dalam perhitungan</li>
                                <li>Membandingkan nilai dengan satuan berbeda</li>
                                <li>Menyelesaikan masalah yang melibatkan berbagai satuan</li>
                            </ul>
    
                            <div class="concept-explanation">
                                <h4>Sistem Satuan</h4>
                                <p>Ada beberapa sistem satuan yang umum digunakan:</p>
                                <ul>
                                    <li><strong>Sistem Internasional (SI)</strong>: Sistem standar yang digunakan secara global</li>
                                    <li><strong>Sistem CGS</strong>: Sistem berbasis sentimeter, gram, sekon</li>
                                    <li><strong>Sistem British</strong>: Sistem yang menggunakan inci, pon, dll</li>
                                </ul>
                            </div>
    
                            <div class="conversion-principles">
                                <h4>Prinsip-Prinsip Konversi</h4>
                                <ol>
                                    <li>Mengetahui faktor konversi antar satuan</li>
                                    <li>Memahami hubungan antar satuan</li>
                                    <li>Menggunakan operasi matematika yang tepat</li>
                                    <li>Memperhatikan nilai desimal</li>
                                </ol>
                            </div>
    
                            <div class="key-points">
                                <h4>Poin-Poin Penting:</h4>
                                <ul>
                                    <li>Konversi harus mempertahankan nilai sebenarnya</li>
                                    <li>Pahami prefix satuan (kilo-, mili-, dll)</li>
                                    <li>Perhatikan posisi desimal saat mengkonversi</li>
                                    <li>Selalu cek kewajaran hasil konversi</li>
                                </ul>
                            </div>
                        </div>
                    `,
                    type: "content"
                },
                {
                    title: "Latihan Dasar Konversi",
                    type: "quiz",
                    questions: [
                        {
                            question: "Berapakah nilai 1 kilometer dalam meter?",
                            options: [
                                "10 meter",
                                "100 meter",
                                "1000 meter"
                            ],
                            correct: 2,
                            explanation: "1 kilometer = 1000 meter, ini adalah konversi dasar dalam sistem metrik."
                        }
                    ]
                }
            ]
        },
    
        "konversi-satuan-panjang": {
            title: "Konversi Satuan Panjang",
            lessons: [
                {
                    title: "Sistem Satuan Panjang",
                    content: `
                        <div class="lesson-content">
                            <h3>Konversi Satuan Panjang</h3>
                            <p>Satuan panjang memiliki berbagai tingkatan dan sistem. Pemahaman yang baik tentang konversi satuan panjang sangat penting dalam pengukuran.</p>
    
                            <div class="conversion-table">
                                <h4>Tabel Konversi Metrik</h4>
                                <ul>
                                    <li>1 kilometer (km) = 1000 meter (m)</li>
                                    <li>1 meter (m) = 100 sentimeter (cm)</li>
                                    <li>1 sentimeter (cm) = 10 milimeter (mm)</li>
                                    <li>1 meter (m) = 1000 milimeter (mm)</li>
                                </ul>
                            </div>
    
                            <div class="conversion-method">
                                <h4>Metode Konversi</h4>
                                <ol>
                                    <li>Identifikasi satuan awal dan tujuan</li>
                                    <li>Tentukan faktor pengali</li>
                                    <li>Kalikan nilai dengan faktor konversi</li>
                                    <li>Periksa kewajaran hasil</li>
                                </ol>
                            </div>
    
                            <div class="practical-examples">
                                <h4>Contoh Konversi:</h4>
                                <ul>
                                    <li>5 km = 5000 m</li>
                                    <li>250 cm = 2.5 m</li>
                                    <li>3000 mm = 3 m</li>
                                </ul>
                            </div>
                        </div>
                    `,
                    type: "content"
                }
            ]
        },
    
        "konversi-satuan-massa": {
            title: "Konversi Satuan Massa",
            lessons: [
                {
                    title: "Sistem Satuan Massa",
                    content: `
                        <div class="lesson-content">
                            <h3>Konversi Satuan Massa</h3>
                            <p>Satuan massa digunakan untuk mengukur jumlah materi dalam suatu benda. Konversi satuan massa penting dalam berbagai bidang.</p>
    
                            <div class="conversion-table">
                                <h4>Tabel Konversi Massa</h4>
                                <ul>
                                    <li>1 kilogram (kg) = 1000 gram (g)</li>
                                    <li>1 gram (g) = 1000 miligram (mg)</li>
                                    <li>1 kuintal (q) = 100 kilogram (kg)</li>
                                    <li>1 ton = 1000 kilogram (kg)</li>
                                </ul>
                            </div>
    
                            <div class="practical-use">
                                <h4>Penggunaan Praktis</h4>
                                <ul>
                                    <li>Pengukuran bahan dalam resep</li>
                                    <li>Penimbangan dalam perdagangan</li>
                                    <li>Pengukuran dalam laboratorium</li>
                                    <li>Penentuan dosis obat</li>
                                </ul>
                            </div>
                        </div>
                    `,
                    type: "content"
                }
            ]
        },
            // =========== ANALISIS ERROR ===========
    "pengantar-analisis-error": {
        title: "Pengantar Analisis Error",
        lessons: [
            {
                title: "Konsep Dasar Analisis Error",
                content: `
                    <div class="lesson-content">
                        <h3>Memahami Analisis Error</h3>
                        <p>Analisis error adalah proses mengevaluasi dan mengukur ketidakpastian dalam pengukuran. Hal ini penting untuk:</p>
                        <ul>
                            <li>Menentukan keakuratan hasil pengukuran</li>
                            <li>Mengidentifikasi sumber-sumber kesalahan</li>
                            <li>Meningkatkan kualitas pengukuran</li>
                        </ul>

                        <div class="concept-explanation">
                            <h4>Jenis-Jenis Error</h4>
                            <ul>
                                <li><strong>Error Sistematis</strong>: Kesalahan yang konsisten dan dapat diprediksi</li>
                                <li><strong>Error Random</strong>: Kesalahan acak yang tidak dapat diprediksi</li>
                                <li><strong>Error Paralaks</strong>: Kesalahan akibat sudut pandang yang tidak tepat</li>
                            </ul>
                        </div>

                        <div class="error-sources">
                            <h4>Sumber-Sumber Error</h4>
                            <ol>
                                <li>Keterbatasan alat ukur</li>
                                <li>Kesalahan prosedur pengukuran</li>
                                <li>Faktor lingkungan</li>
                                <li>Kesalahan manusia</li>
                            </ol>
                        </div>
                    </div>
                `,
                type: "content"
            }
        ]
    },

    "perhitungan-error-relatif": {
        title: "Perhitungan Error Relatif",
        lessons: [
            {
                title: "Metode Perhitungan Error Relatif",
                content: `
                    <div class="lesson-content">
                        <h3>Error Relatif</h3>
                        <p>Error relatif adalah perbandingan antara error absolut dengan nilai sebenarnya, dinyatakan dalam bentuk persentase.</p>

                        <div class="calculation-method">
                            <h4>Rumus Dasar</h4>
                            <p>Error Relatif = (|Nilai Terukur - Nilai Sebenarnya|/Nilai Sebenarnya) × 100%</p>
                            
                            <h4>Contoh Perhitungan:</h4>
                            <ul>
                                <li>Nilai sebenarnya: 100 gram</li>
                                <li>Nilai terukur: 98 gram</li>
                                <li>Error relatif = (|98-100|/100) × 100% = 2%</li>
                            </ul>
                        </div>

                        <div class="practical-tips">
                            <h4>Tips Praktis</h4>
                            <ul>
                                <li>Selalu gunakan nilai absolut dalam perhitungan</li>
                                <li>Perhatikan satuan yang digunakan</li>
                                <li>Nyatakan hasil dalam persentase</li>
                            </ul>
                        </div>
                    </div>
                `,
                type: "content"
            }
        ]
    },

    "propagasi-error": {
        title: "Propagasi Error",
        lessons: [
            {
                title: "Konsep Propagasi Error",
                content: `
                    <div class="lesson-content">
                        <h3>Propagasi Error dalam Pengukuran</h3>
                        <p>Propagasi error adalah cara error merambat dalam perhitungan yang melibatkan beberapa pengukuran.</p>

                        <div class="propagation-rules">
                            <h4>Aturan Dasar Propagasi</h4>
                            <ul>
                                <li><strong>Penjumlahan/Pengurangan</strong>: Error absolut dijumlahkan</li>
                                <li><strong>Perkalian/Pembagian</strong>: Error relatif dikombinasikan</li>
                                <li><strong>Fungsi kompleks</strong>: Menggunakan turunan parsial</li>
                            </ul>
                        </div>

                        <div class="examples">
                            <h4>Contoh Aplikasi:</h4>
                            <p>Untuk perhitungan luas persegi panjang (L = p × l):</p>
                            <ul>
                                <li>Error relatif luas = √[(Δp/p)² + (Δl/l)²]</li>
                                <li>Δp = error pengukuran panjang</li>
                                <li>Δl = error pengukuran lebar</li>
                            </ul>
                        </div>
                    </div>
                `,
                type: "content"
            }
        ]
    }
};

const finalQuizContent = {
    "pengukuran-dasar-final": {
        title: "Quiz Akhir Pengukuran Dasar",
        type: "final-quiz",
        questions: [
            {
                question: "Apakah definisi pengukuran yang paling tepat?",
                options: [
                    "Proses menghitung jumlah benda",
                    "Proses membandingkan suatu besaran dengan besaran standar",
                    "Proses menentukan warna suatu benda",
                    "Proses menimbang berat benda"
                ],
                correct: 1,
                explanation: "Pengukuran adalah proses membandingkan suatu besaran dengan besaran standar yang telah ditetapkan."
            },
            {
                question: "Manakah yang merupakan komponen penting dalam pengukuran?",
                options: [
                    "Warna dan bentuk",
                    "Panjang dan lebar",
                    "Besaran dan satuan",
                    "Tinggi dan berat"
                ],
                correct: 2,
                explanation: "Besaran dan satuan adalah dua komponen utama dalam pengukuran."
            },
            {
                question: "Apa yang dimaksud dengan besaran dalam pengukuran?",
                options: [
                    "Alat yang digunakan untuk mengukur",
                    "Standar yang digunakan sebagai pembanding",
                    "Sesuatu yang dapat diukur dan dinyatakan dengan angka",
                    "Hasil dari proses pengukuran"
                ],
                correct: 2,
                explanation: "Besaran adalah sesuatu yang dapat diukur dan dinyatakan dengan angka."
            },
            {
                question: "Alat ukur manakah yang memiliki ketelitian paling tinggi?",
                options: [
                    "Penggaris",
                    "Jangka Sorong",
                    "Mikrometer",
                    "Meteran"
                ],
                correct: 2,
                explanation: "Mikrometer memiliki ketelitian hingga 0,01 mm, lebih teliti dibanding alat ukur lainnya."
            },
            {
                question: "Berapa ketelitian pengukuran dari jangka sorong?",
                options: [
                    "1 mm",
                    "0,1 mm",
                    "0,01 mm",
                    "0,001 mm"
                ],
                correct: 1,
                explanation: "Jangka sorong memiliki ketelitian 0,1 mm atau 0,01 cm."
            },
            {
                question: "Mengapa kalibrasi alat ukur penting dilakukan?",
                options: [
                    "Untuk membuat alat ukur lebih mahal",
                    "Untuk memastikan keakuratan pengukuran",
                    "Untuk membuat alat ukur lebih ringan",
                    "Untuk mempercepat proses pengukuran"
                ],
                correct: 1,
                explanation: "Kalibrasi penting untuk memastikan keakuratan hasil pengukuran."
            },
            {
                question: "Manakah yang bukan merupakan prinsip pengukuran yang baik?",
                options: [
                    "Menggunakan alat ukur yang sesuai",
                    "Melakukan pengukuran berulang",
                    "Mengabaikan ketidakpastian pengukuran",
                    "Mencatat hasil dengan teliti"
                ],
                correct: 2,
                explanation: "Ketidakpastian pengukuran harus selalu diperhatikan dan dicantumkan dalam hasil pengukuran."
            },
            {
                question: "Apa fungsi utama neraca Ohaus?",
                options: [
                    "Mengukur panjang benda",
                    "Mengukur massa benda",
                    "Mengukur suhu benda",
                    "Mengukur waktu"
                ],
                correct: 1,
                explanation: "Neraca Ohaus digunakan untuk mengukur massa benda dengan ketelitian hingga 0,01 gram."
            },
            {
                question: "Manakah pernyataan yang benar tentang pengukuran massa?",
                options: [
                    "Massa berubah sesuai gravitasi",
                    "Massa sama dengan berat",
                    "Massa tetap di manapun benda berada",
                    "Massa hanya bisa diukur di bumi"
                ],
                correct: 2,
                explanation: "Massa bersifat tetap dan tidak dipengaruhi oleh gravitasi, berbeda dengan berat."
            },
            {
                question: "Apa yang harus dilakukan setelah melakukan pengukuran?",
                options: [
                    "Langsung membereskan alat",
                    "Mencatat hasil dengan satuan yang tepat",
                    "Mengabaikan hasil yang berbeda",
                    "Membulatkan semua hasil"
                ],
                correct: 1,
                explanation: "Hasil pengukuran harus dicatat dengan satuan yang tepat untuk dokumentasi yang akurat."
            }
        ]
    },
    "konversi-satuan-final": {
    title: "Quiz Akhir Konversi Satuan",
    type: "final-quiz",
    questions: [
        {
            question: "Berapakah 5 kilometer dalam meter?",
            options: [
                "500 meter",
                "5000 meter",
                "50000 meter",
                "5 meter"
            ],
            correct: 1,
            explanation: "1 kilometer = 1000 meter, maka 5 kilometer = 5 × 1000 = 5000 meter."
        },
        {
            question: "Berapa gram dalam 2,5 kilogram?",
            options: [
                "250 gram",
                "2500 gram",
                "25 gram",
                "25000 gram"
            ],
            correct: 1,
            explanation: "1 kilogram = 1000 gram, maka 2,5 kilogram = 2,5 × 1000 = 2500 gram."
        },
        {
            question: "Manakah yang sama dengan 1 meter?",
            options: [
                "10 sentimeter",
                "100 sentimeter",
                "1000 sentimeter",
                "10000 sentimeter"
            ],
            correct: 1,
            explanation: "1 meter = 100 sentimeter."
        },
        {
            question: "Berapa milimeter dalam 1 sentimeter?",
            options: [
                "10 milimeter",
                "100 milimeter",
                "1000 milimeter",
                "1 milimeter"
            ],
            correct: 0,
            explanation: "1 sentimeter = 10 milimeter."
        },
        {
            question: "Satuan manakah yang terbesar?",
            options: [
                "Meter",
                "Kilometer",
                "Sentimeter",
                "Desimeter"
            ],
            correct: 1,
            explanation: "Kilometer adalah satuan terbesar di antara pilihan yang ada."
        },
        {
            question: "Berapakah 3000 miligram dalam gram?",
            options: [
                "0,3 gram",
                "3 gram",
                "30 gram",
                "300 gram"
            ],
            correct: 1,
            explanation: "1000 miligram = 1 gram, maka 3000 miligram = 3 gram."
        },
        {
            question: "Manakah yang setara dengan 1 ton?",
            options: [
                "100 kg",
                "1000 kg",
                "10000 kg",
                "100000 kg"
            ],
            correct: 1,
            explanation: "1 ton = 1000 kilogram."
        },
        {
            question: "Berapa meter dalam 150 sentimeter?",
            options: [
                "0,15 meter",
                "1,5 meter",
                "15 meter",
                "150 meter"
            ],
            correct: 1,
            explanation: "100 sentimeter = 1 meter, maka 150 sentimeter = 1,5 meter."
        },
        {
            question: "Konversi yang benar untuk 2000 gram adalah...",
            options: [
                "0,2 kg",
                "2 kg",
                "20 kg",
                "200 kg"
            ],
            correct: 1,
            explanation: "1000 gram = 1 kg, maka 2000 gram = 2 kg."
        },
        {
            question: "Berapa kuintal dalam 2500 kg?",
            options: [
                "2,5 kuintal",
                "25 kuintal",
                "250 kuintal",
                "2500 kuintal"
            ],
            correct: 1,
            explanation: "1 kuintal = 100 kg, maka 2500 kg = 25 kuintal."
        }
    ]
    },
    "analisis-error-final" : {
        title: "Quiz Akhir Analisis Error",
        type: "final-quiz",
        questions: [
            {
                question: "Apakah yang dimaksud dengan error sistematis?",
                options: [
                    "Error yang terjadi secara acak",
                    "Error yang konsisten dan dapat diprediksi",
                    "Error akibat kesalahan paralaks",
                    "Error akibat faktor lingkungan"
                ],
                correct: 1,
                explanation: "Error sistematis adalah kesalahan yang terjadi secara konsisten dan dapat diprediksi pola atau sumbernya."
            },
            {
                question: "Bagaimana rumus perhitungan error relatif?",
                options: [
                    "|Nilai terukur - Nilai sebenarnya|",
                    "(Nilai terukur/Nilai sebenarnya) × 100%",
                    "(|Nilai terukur - Nilai sebenarnya|/Nilai sebenarnya) × 100%",
                    "Nilai terukur - Nilai sebenarnya × 100%"
                ],
                correct: 2,
                explanation: "Error relatif dihitung dengan membagi selisih absolut dengan nilai sebenarnya, lalu dikalikan 100%."
            },
            {
                question: "Manakah yang bukan termasuk sumber error dalam pengukuran?",
                options: [
                    "Keterbatasan alat ukur",
                    "Faktor lingkungan",
                    "Warna alat ukur",
                    "Kesalahan prosedur"
                ],
                correct: 2,
                explanation: "Warna alat ukur tidak mempengaruhi akurasi pengukuran."
            },
            {
                question: "Apa yang dimaksud dengan error paralaks?",
                options: [
                    "Error akibat alat rusak",
                    "Error akibat sudut pandang yang tidak tepat",
                    "Error akibat suhu lingkungan",
                    "Error akibat getaran"
                ],
                correct: 1,
                explanation: "Error paralaks terjadi ketika pembacaan dilakukan dari sudut pandang yang tidak tepat."
            },
            {
                question: "Dalam propagasi error, bagaimana menangani operasi penjumlahan?",
                options: [
                    "Error relatif dijumlahkan",
                    "Error absolut dijumlahkan",
                    "Error dikuadratkan",
                    "Error diabaikan"
                ],
                correct: 1,
                explanation: "Dalam operasi penjumlahan, error absolut dari masing-masing pengukuran dijumlahkan."
            },
            {
                question: "Manakah yang termasuk error random?",
                options: [
                    "Kesalahan kalibrasi",
                    "Fluktuasi tegangan listrik",
                    "Kesalahan pembacaan skala",
                    "Kesalahan penulisan data"
                ],
                correct: 1,
                explanation: "Fluktuasi tegangan listrik adalah contoh error random karena sifatnya tidak dapat diprediksi."
            },
            {
                question: "Bagaimana cara meminimalkan error paralaks?",
                options: [
                    "Menggunakan alat digital",
                    "Membaca pada posisi tegak lurus",
                    "Mengabaikan nilai desimal",
                    "Mengulangi pengukuran"
                ],
                correct: 1,
                explanation: "Error paralaks dapat diminimalkan dengan membaca skala pada posisi tegak lurus."
            },
            {
                question: "Apa yang terjadi dengan error relatif saat dua pengukuran dikalikan?",
                options: [
                    "Dijumlahkan biasa",
                    "Dikalikan",
                    "Dikuadratkan lalu dijumlahkan",
                    "Diabaikan"
                ],
                correct: 2,
                explanation: "Untuk perkalian, error relatif dikuadratkan lalu dijumlahkan (prinsip propagasi error)."
            },
            {
                question: "Manakah pernyataan yang benar tentang ketidakpastian pengukuran?",
                options: [
                    "Hanya terjadi pada alat analog",
                    "Dapat dihilangkan sepenuhnya",
                    "Selalu ada dalam setiap pengukuran",
                    "Tidak perlu dilaporkan"
                ],
                correct: 2,
                explanation: "Ketidakpastian selalu ada dalam setiap pengukuran, baik menggunakan alat digital maupun analog."
            },
            {
                question: "Bagaimana cara terbaik mengurangi error random?",
                options: [
                    "Mengabaikannya",
                    "Melakukan pengukuran berulang dan merata-rata",
                    "Menggunakan alat yang lebih mahal",
                    "Mengganti operator"
                ],
                correct: 1,
                explanation: "Error random dapat dikurangi dengan melakukan pengukuran berulang dan mengambil nilai rata-rata."
            }
        ]
},
}


// =========== NAVIGATION STATE MANAGEMENT ===========
let currentSlideIndex = 0;
let totalSlides = 0;

/**
 * Setup navigasi untuk modal pembelajaran
 * @param {number} slidesCount - Jumlah total slides
 */
function setupNavigationListeners(slidesCount) {
    totalSlides = slidesCount;
    currentSlideIndex = 0;
    
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    // Reset dan setup event listeners untuk navigasi
    prevBtn.onclick = navigateToPrevSlide;
    nextBtn.onclick = navigateToNextSlide;
    
    updateNavigationState();
}

/**
 * Update state tombol navigasi berdasarkan posisi slide
 */
function updateNavigationState() {
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    
    // Update counter
    document.getElementById('slideCounter').textContent = `${currentSlideIndex + 1}/${totalSlides}`;
}

/**
 * Navigasi ke slide sebelumnya
 */
function navigateToPrevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSlideContent();
    }
}

/**
 * Navigasi ke slide berikutnya
 */
function navigateToNextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updateSlideContent();
    }
}

// =========== CONTENT DISPLAY MANAGEMENT ===========

/**
 * Update konten slide yang ditampilkan
 */
function updateSlideContent() {
    const slides = document.querySelectorAll('.lesson-slide');
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlideIndex) {
            slide.classList.add('active');
        }
    });
    
    updateNavigationState();
}

function createQuizHTML(lesson, materialId, lessonIndex) {
    if (!lesson.questions || !lesson.questions.length) {
        return '<div class="quiz-error">Tidak ada pertanyaan tersedia</div>';
    }

    return `
        <div class="lesson-quiz">
            ${lesson.questions.map((question, qIndex) => `
                <div class="question-wrapper" data-question="${qIndex}">
                    <p class="question-text">${question.question}</p>
                    <div class="options-wrapper">
                        ${question.options.map((option, optIndex) => `
                            <label class="option-item">
                                <input type="radio" 
                                    name="quiz_${materialId}_${lessonIndex}_${qIndex}" 
                                    value="${optIndex}"
                                >
                                <span class="option-text">${option}</span>
                            </label>
                        `).join('')}
                    </div>
                    <button class="check-answer-btn" onclick="checkAnswer('${materialId}', ${lessonIndex}, ${qIndex}, ${question.correct})">
                        Periksa Jawaban
                    </button>
                    <div class="feedback" style="display: none;"></div>
                </div>
            `).join('')}
        </div>
    `;
}

function checkAnswer(materialId, lessonIndex, questionIndex, correctAnswer) {
    const questionWrapper = document.querySelector(`[data-question="${questionIndex}"]`);
    const selectedInput = questionWrapper.querySelector('input[type="radio"]:checked');
    const feedbackDiv = questionWrapper.querySelector('.feedback');
    const checkButton = questionWrapper.querySelector('.check-answer-btn');
    
    if (!selectedInput) {
        alert('Silakan pilih jawaban terlebih dahulu');
        return;
    }

    const isCorrect = parseInt(selectedInput.value) === correctAnswer;
    
    // Special handling for "pengantar-pengukuran" module
    if (materialId === 'pengantar-pengukuran') {
        feedbackDiv.textContent = isCorrect ? 'Benar!' : 'Jawaban kurang tepat, coba lagi.';
        feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackDiv.style.display = 'block';

        if (isCorrect) {
            // Only disable inputs and button when answer is correct
            questionWrapper.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = true;
            });
            checkButton.disabled = true;
        } else {
            // For incorrect answers, keep inputs enabled for retry
            questionWrapper.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = false;
            });
            checkButton.disabled = false;
        }
    } 
    else if (materialId === 'alat-ukur-panjang') {
        feedbackDiv.textContent = isCorrect ? 'Benar!' : 'Jawaban kurang tepat, coba lagi.';
        feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackDiv.style.display = 'block';

        if (isCorrect) {
            // Only disable inputs and button when answer is correct
            questionWrapper.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = true;
            });
            checkButton.disabled = true;
        } else {
            // For incorrect answers, keep inputs enabled for retry
            questionWrapper.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = false;
            });
            checkButton.disabled = false;
        }
    } 
    else if (materialId === 'pengukuran-massa') {
        feedbackDiv.textContent = isCorrect ? 'Benar!' : 'Jawaban kurang tepat, coba lagi.';
        feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackDiv.style.display = 'block';

        if (isCorrect) {
            // Only disable inputs and button when answer is correct
            questionWrapper.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = true;
            });
            checkButton.disabled = true;
        } else {
            // For incorrect answers, keep inputs enabled for retry
            questionWrapper.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = false;
            });
            checkButton.disabled = false;
        }
    } 
    else if (materialId === 'dasar-konversi') {
        feedbackDiv.textContent = isCorrect ? 'Benar!' : 'Jawaban kurang tepat, coba lagi.';
        feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackDiv.style.display = 'block';

        if (isCorrect) {
            // Only disable inputs and button when answer is correct
            questionWrapper.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = true;
            });
            checkButton.disabled = true;
        } else {
            // For incorrect answers, keep inputs enabled for retry
            questionWrapper.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = false;
            });
            checkButton.disabled = false;
        }
    } 
        else {
        // Default behavior for other modules
        feedbackDiv.textContent = isCorrect ? 'Benar!' : 'Jawaban kurang tepat, coba lagi.';
        feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackDiv.style.display = 'block';

        // Disable inputs after answering
        questionWrapper.querySelectorAll('input[type="radio"]').forEach(input => {
            input.disabled = true;
        });
        checkButton.disabled = true;
    }
}

/**
 * Menampilkan konten pembelajaran berdasarkan ID materi
 * @param {string} materialId - ID materi yang akan ditampilkan
 */
function showLessonContent(materialId) {
    console.log('Attempting to show content for:', materialId); // Debug log
    
    const material = courseContent[materialId];
    if (!material) {
        console.error('Materi tidak ditemukan:', materialId);
        return;
    }

    const modal = document.getElementById('lessonModal');
    if (!modal) {
        console.error('Modal tidak ditemukan');
        return;
    }

    const title = document.getElementById('lessonTitle');
    const modalContent = modal.querySelector('.lesson-modal-content');
    
    // Pastikan container slides ada
    let slideContainer = modalContent.querySelector('.lesson-slides');
    if (!slideContainer) {
        // Buat container jika belum ada
        slideContainer = document.createElement('div');
        slideContainer.className = 'lesson-slides';
        // Insert sebelum navigation
        const navigation = modalContent.querySelector('.lesson-navigation');
        modalContent.insertBefore(slideContainer, navigation);
    }
    
    // Reset state dan UI
    currentSlideIndex = 0;
    
    // Setup content
    title.textContent = material.title;
    slideContainer.innerHTML = '';
    
    // Generate slides
    material.lessons.forEach((lesson, index) => {
        const slide = createSlideElement(lesson, index === 0, materialId, index);
        slideContainer.appendChild(slide);
    });
    
    // Setup navigation dan tampilkan modal
    setupNavigationListeners(material.lessons.length);
    setupModalListeners(modal);
    modal.style.display = 'block';
}

// Add helper function to check if we're in quiz mode
function isInQuizMode() {
    return quizState.currentModule !== null;
}

/**
 * Membuat elemen slide untuk konten pembelajaran
 * @param {Object} lesson - Objek lesson yang berisi konten atau quiz
 * @param {boolean} isActive - Status aktif dari slide
 * @param {string} materialId - ID materi
 * @param {number} lessonIndex - Index pelajaran
 * @returns {HTMLElement}
 */
function createSlideElement(lesson, isActive, materialId, lessonIndex) {
    const slide = document.createElement('div');
    slide.className = `lesson-slide ${isActive ? 'active' : ''}`;
    
    if (lesson.type === 'content') {
        slide.innerHTML = lesson.content;
    } else if (lesson.type === 'quiz') {
        slide.innerHTML = createQuizHTML(lesson, materialId, lessonIndex);
    }
    
    return slide;
}

/**
 * Setup event listeners untuk modal
 * @param {HTMLElement} modal - Elemen modal
 */
function setupModalListeners(modal) {
    const closeBtn = modal.querySelector('.close-lesson');
    
    // Close button handler
    closeBtn.onclick = () => {
        if (isInQuizMode()) {
            handleCloseQuiz(quizState.currentModule);
        } else {
            modal.style.display = 'none';
        }
    };
    
    // Click outside modal handler
    window.onclick = (event) => {
        if (event.target === modal) {
            if (isInQuizMode()) {
                handleCloseQuiz(quizState.currentModule);
            } else {
                modal.style.display = 'none';
            }
        }
    };
    
    // Keyboard navigation
    document.onkeydown = (e) => {
        if (modal.style.display === 'block') {
            if (isInQuizMode()) {
                if (e.key === 'Escape') {
                    handleCloseQuiz(quizState.currentModule);
                }
            } else {
                switch(e.key) {
                    case 'ArrowLeft':
                        navigateToPrevSlide();
                        break;
                    case 'ArrowRight':
                        navigateToNextSlide();
                        break;
                    case 'Escape':
                        modal.style.display = 'none';
                        break;
                }
            }
        }
    };
}

// Initialize lesson buttons with proper error handling and logging
function initializeLessonButtons() {
    document.querySelectorAll('.quiz-lesson__btn').forEach(button => {
        const moduleId = button.getAttribute('data-module-id');
        console.log('Initializing button for module:', moduleId); // Debug log
        
        if (moduleId) {
            button.addEventListener('click', () => {
                console.log('Button clicked for module:', moduleId); // Debug log
                showLessonContent(moduleId);
            });
        } else {
            console.error('Module ID tidak ditemukan pada button:', button);
        }
    });
}

// =========== QUIZ STATE MANAGEMENT ===========
const quizState = {
    currentQuestion: 0,
    score: 0,
    currentModule: null
};

// =========== QUIZ EVENT HANDLERS ===========
function startFinalQuiz(moduleId) {
    const quizData = finalQuizContent[`${moduleId}-final`];
    if (!quizData) {
        console.error('Quiz tidak ditemukan untuk modul:', moduleId);
        return;
    }

    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.currentModule = moduleId;

    const modal = document.getElementById('lessonModal');
    const title = document.getElementById('lessonTitle');
    const slideContainer = document.querySelector('.lesson-slides');
    const navButtons = document.querySelector('.lesson-navigation');

    title.textContent = quizData.title;
    navButtons.style.display = 'none'; // Sembunyikan tombol navigasi
    showFinalQuestion(moduleId);

    modal.style.display = 'block';
}

function showFinalQuestion(moduleId) {
    const quizData = finalQuizContent[`${moduleId}-final`];
    const slideContainer = document.querySelector('.lesson-slides');
    const question = quizData.questions[quizState.currentQuestion];

    // Update title dan progress counter di bagian atas
    const title = document.getElementById('lessonTitle');
    const slideCounter = document.getElementById('slideCounter');
    
    title.textContent = quizData.title;
    slideCounter.textContent = `${quizState.currentQuestion + 1}/${quizData.questions.length}`;

    slideContainer.innerHTML = `
        <div class="lesson-quiz">
            <div class="quiz-header">
                <div class="quiz-progress">
                    Soal ${quizState.currentQuestion + 1} dari ${quizData.questions.length}
                </div>
                <div class="quiz-progress-bar">
                    <div class="quiz-progress" style="width: ${((quizState.currentQuestion + 1) / quizData.questions.length) * 100}%"></div>
                </div>
            </div>
            <div class="question-wrapper">
                <p class="question-text">${question.question}</p>
                <div class="options-wrapper">
                    ${question.options.map((opt, idx) => `
                        <label class="option-item">
                            <input type="radio" name="finalQuiz" value="${idx}">
                            <span class="option-text">${opt}</span>
                        </label>
                    `).join('')}
                </div>
                <button class="check-answer-btn" onclick="checkFinalQuizAnswer('${moduleId}')">
                    Periksa Jawaban
                </button>
                <div class="feedback"></div>
            </div>
        </div>
    `;
}

function checkFinalQuizAnswer(moduleId) {
    const quizData = finalQuizContent[`${moduleId}-final`];
    const question = quizData.questions[quizState.currentQuestion];
    const selectedInput = document.querySelector('input[name="finalQuiz"]:checked');
    const feedbackDiv = document.querySelector('.feedback');

    if (!selectedInput) {
        alert('Silakan pilih jawaban terlebih dahulu');
        return;
    }

    const selectedAnswer = parseInt(selectedInput.value);
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
        quizState.score++;
    }

    feedbackDiv.textContent = isCorrect ? 
        'Benar! ' + question.explanation : 
        'Kurang tepat. ' + question.explanation;
    feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackDiv.style.display = 'block';

    // Disable inputs
    document.querySelectorAll('input[name="finalQuiz"]').forEach(input => {
        input.disabled = true;
    });

    // Add navigation button
    const nextButton = document.createElement('button');
    nextButton.className = 'next-question-btn';
    const isLastQuestion = quizState.currentQuestion === quizData.questions.length - 1;
    nextButton.textContent = isLastQuestion ? 'Lihat Hasil' : 'Soal Berikutnya';
    nextButton.onclick = () => {
        if (isLastQuestion) {
            showFinalQuizResults(moduleId);
        } else {
            quizState.currentQuestion++;
            showFinalQuestion(moduleId);
        }
    };
    feedbackDiv.appendChild(nextButton);

    updateQuizProgress();
}

// Update Progress Quiz
function updateQuizProgress() {
    const quizData = finalQuizContent[`${quizState.currentModule}-final`];
    if (!quizData) return;

    const progressBar = document.querySelector('.quiz-progress-bar .quiz-progress');
    const progressText = document.querySelector('.quiz-progress');
    const progress = ((quizState.currentQuestion + 1) / quizData.questions.length) * 100;
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${quizState.currentQuestion + 1}/${quizData.questions.length}`;
    }
}

function handleCloseQuiz(moduleId) {
    const modal = document.getElementById('lessonModal');
    const navButtons = document.querySelector('.lesson-navigation');
    const slideCounter = document.getElementById('slideCounter');
    
    // Reset quiz state
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.currentModule = null;

    // Reset UI elements
    if (navButtons) navButtons.style.display = 'flex';
    if (slideCounter) slideCounter.textContent = '1/1';
    
    // Reset progress indicators
    const progressBar = document.querySelector('.quiz-progress-bar .quiz-progress');
    if (progressBar) progressBar.style.width = '0%';
    
    // Hide modal
    modal.style.display = 'none';
    
    // Optional: Refresh page content if needed
    // location.reload();
}

function showFinalQuizResults(moduleId) {
    const slideContainer = document.querySelector('.lesson-slides');
    const quizData = finalQuizContent[`${moduleId}-final`];
    const finalScore = (quizState.score / quizData.questions.length) * 100;

    slideContainer.innerHTML = `
        <div class="quiz-results">
            <h3>Hasil Quiz Akhir</h3>
            <div class="score-display">
                <p>Skor Anda:</p>
                <h2>${finalScore.toFixed(0)}%</h2>
                <p>${quizState.score} benar dari ${quizData.questions.length} soal</p>
            </div>
            <div class="result-message">
                ${finalScore >= 70 ? 
                    '<p class="success">Selamat! Anda telah menyelesaikan modul ini.</p>' : 
                    '<p class="failure">Anda perlu mencapai skor minimal 70% untuk menyelesaikan modul ini.</p>'}
            </div>
            <button class="close-quiz-btn" onclick="handleCloseQuiz('${moduleId}')">
                Tutup
            </button>
        </div>
    `;

    if (finalScore >= 70) {
        updateModuleProgress(moduleId, 'completed');
    }
}

// =========== INITIALIZATION ===========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize collapsible sections
    document.querySelectorAll('.quiz-section__header').forEach(header => {
        header.addEventListener('click', toggleSection);
    });

    // Initialize lesson buttons with the new function
    initializeLessonButtons();

    // Initialize final quiz buttons
    document.querySelectorAll('.final-quiz-btn').forEach(button => {
        const moduleId = button.getAttribute('data-module');
        if (moduleId) {
            button.onclick = () => startFinalQuiz(moduleId);
        }
    });

    // Add global modal close handler
    document.querySelectorAll('.close-lesson').forEach(button => {
        button.onclick = () => {
            const modal = button.closest('.lesson-modal');
            if (modal) {
                if (quizState.currentModule) {
                    handleCloseQuiz(quizState.currentModule);
                } else {
                    modal.style.display = 'none';
                }
            }
        };
    });
});