/* ==========================================================================
   JOJO MANUEL P PORTFOLIO — CLEAN INTERACTION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons
    if (window.feather) {
        feather.replace();
    }

    // Current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------------------------------------
       1. Scroll Progress & Header Scroll
       ---------------------------------------------------------------------- */
    const scrollProgressEl = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = (window.scrollY / totalHeight) * 100;
        
        if (scrollProgressEl) {
            scrollProgressEl.style.width = `${currentProgress}%`;
        }

        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ----------------------------------------------------------------------
       2. Dark / Light Theme Switcher
       ---------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const savedTheme = localStorage.getItem('jojo_theme') || 'dark';

    htmlEl.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('jojo_theme', newTheme);
        });
    }

    /* ----------------------------------------------------------------------
       3. Mobile Navigation Toggle & Scroll Spy
       ---------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    function scrollSpy() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollSpy);

    /* ----------------------------------------------------------------------
       4. Project Filtering Tabs
       ---------------------------------------------------------------------- */
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ----------------------------------------------------------------------
       5. Project Detail Case Study Modal
       ---------------------------------------------------------------------- */
    const projectModal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    const viewDetailBtns = document.querySelectorAll('.view-details-btn');

    const projectData = {
        'hope-web': {
            title: 'Hope Web — Full-Stack Blood Donation Platform',
            category: 'Full-Stack Web & Healthcare',
            tech: ['MERN Stack', 'JWT Authentication', 'REST APIs', 'Docker Container', 'Firebase Hosting', 'Razorpay Gateway'],
            description: `
                <p>Hope Web is a scalable full-stack blood donation and blood bank management platform designed for blood banks, hospitals, donors, and administrators.</p>
                <h4 style="margin: 1rem 0 0.5rem 0; font-size: 1rem;">Key Highlights:</h4>
                <ul style="padding-left: 1.2rem; line-height: 1.6; color: var(--text-secondary);">
                    <li>Role-Based Access Control (RBAC) with secure JSON Web Token (JWT) session validation.</li>
                    <li>Automated donor matching algorithm based on blood group requirements and geographic proximity.</li>
                    <li>Hospital and Blood Bank management dashboards with inventory tracking and transaction logging.</li>
                    <li>Dockerized deployment pipeline for server hosting and isolation.</li>
                </ul>
            `
        },
        'iot-blood': {
            title: 'WBC Electrical Impedance Counter (Coulter Principle)',
            category: 'IoT Biosensor Prototype',
            tech: ['ESP32', 'Coulter Principle', 'ADS1115 ADC', 'LM358 Op-Amp', 'Micro-Electrodes'],
            description: `
                <p>Developed an IoT WBC counting prototype implementing the Coulter principle of electrical impedance cell detection.</p>
                <h4 style="margin: 1rem 0 0.5rem 0; font-size: 1rem;">Key Highlights:</h4>
                <ul style="padding-left: 1.2rem; line-height: 1.6; color: var(--text-secondary);">
                    <li>Custom sensing micro-aperture with precision electrodes in electrolyte solution.</li>
                    <li>High-gain amplification stage using LM358 operational amplifiers for transient resistance pulses.</li>
                    <li>16-bit analog-to-digital signal conversion via ADS1115 interfaced with ESP32 over I2C.</li>
                    <li>Real-time pulse peak counting algorithm in C++ validated using yeast cell solutions.</li>
                </ul>
            `
        },
        'iot-rain': {
            title: 'Rain Protect — Acid Rain Protection Automation',
            category: 'IoT Environmental Automation',
            tech: ['ESP8266', 'TDS Sensor', 'pH Sensor', 'Rain Detector', 'Servo & Relay Actuators'],
            description: `
                <p>Autonomous IoT rainwater quality monitoring system safeguarding plants and greenhouse crops from acid rain.</p>
                <h4 style="margin: 1rem 0 0.5rem 0; font-size: 1rem;">Key Highlights:</h4>
                <ul style="padding-left: 1.2rem; line-height: 1.6; color: var(--text-secondary);">
                    <li>Continuous rainwater sampling with TDS probes and pH sensors.</li>
                    <li>ESP8266 triggers real-time alerts when pH falls below safe threshold (&lt; 5.6).</li>
                    <li>Automates servo motors and relay switches to deploy protective covers over crops.</li>
                </ul>
            `
        }
    };

    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pKey = btn.getAttribute('data-project');
            const data = projectData[pKey];

            if (data && projectModal && modalBody) {
                modalBody.innerHTML = `
                    <div>
                        <span style="font-size: 0.75rem; font-weight: 700; color: var(--accent-primary); text-transform: uppercase;">${data.category}</span>
                        <h2 style="font-size: 1.5rem; margin: 0.4rem 0 1rem 0;">${data.title}</h2>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
                            ${data.tech.map(t => `<span style="padding: 0.2rem 0.6rem; background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); border-radius: 4px; font-size: 0.78rem;">${t}</span>`).join('')}
                        </div>
                        <div style="color: var(--text-secondary); line-height: 1.6;">
                            ${data.description}
                        </div>
                    </div>
                `;
                projectModal.classList.remove('hidden');
                if (window.feather) feather.replace();
            }
        });
    });

    if (modalCloseBtn && projectModal) {
        modalCloseBtn.addEventListener('click', () => {
            projectModal.classList.add('hidden');
        });
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.add('hidden');
            }
        });
    }

    /* ----------------------------------------------------------------------
       6. Printable Resume Modal
       ---------------------------------------------------------------------- */
    const openResumeBtn = document.getElementById('open-resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const resumeCloseBtn = document.getElementById('resume-close');
    const printResumeBtn = document.getElementById('print-resume-btn');

    if (openResumeBtn && resumeModal) {
        openResumeBtn.addEventListener('click', () => {
            resumeModal.classList.remove('hidden');
        });
    }

    if (resumeCloseBtn && resumeModal) {
        resumeCloseBtn.addEventListener('click', () => {
            resumeModal.classList.add('hidden');
        });
    }

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.add('hidden');
            }
        });
    }

    if (printResumeBtn) {
        printResumeBtn.addEventListener('click', () => {
            window.print();
        });
    }

    /* ----------------------------------------------------------------------
       7. Certificate Image Popup Modal
       ---------------------------------------------------------------------- */
    const certModal = document.getElementById('cert-modal');
    const certModalClose = document.getElementById('cert-modal-close');
    const certModalTitle = document.getElementById('cert-modal-title');
    const certModalImg = document.getElementById('cert-modal-img');
    const certModalLink = document.getElementById('cert-modal-link');
    const clickableCerts = document.querySelectorAll('.clickable-cert');

    clickableCerts.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-cert-img');
            const title = card.getAttribute('data-cert-title');

            if (certModal && certModalImg && imgSrc) {
                certModalImg.src = imgSrc;
                if (certModalTitle) certModalTitle.textContent = title || 'Certificate';
                if (certModalLink) certModalLink.href = imgSrc;
                certModal.classList.remove('hidden');
                if (window.feather) feather.replace();
            }
        });
    });

    if (certModalClose && certModal) {
        certModalClose.addEventListener('click', () => {
            certModal.classList.add('hidden');
        });
    }

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                certModal.classList.add('hidden');
            }
        });
    }



    /* ----------------------------------------------------------------------
       8. Copy to Clipboard
       ---------------------------------------------------------------------- */
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (navigator.clipboard && textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = `<i data-feather="check" style="color: #10b981;"></i>`;
                    if (window.feather) feather.replace();

                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        if (window.feather) feather.replace();
                    }, 2000);
                });
            }
        });
    });
});
