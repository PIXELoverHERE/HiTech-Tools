document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Theme Toggler
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        if (newTheme === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'bx bx-sun';
        } else {
            themeIcon.className = 'bx bx-moon';
        }
    }

    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.className = 'bx bx-x';
        } else {
            icon.className = 'bx bx-menu';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'bx bx-menu';
        });
    });

    /* ==========================================================================
       Sticky Header & Active Link Highlighting
       ========================================================================== */
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       Scroll Animations (Intersection Observer)
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a counter, trigger the animation
                if (entry.target.classList.contains('stats-grid')) {
                    startCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in-left').forEach(el => {
        observer.observe(el);
    });

    // Also observe stats grid for counters
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) observer.observe(statsGrid);

    /* ==========================================================================
       Number Counters Animation
       ========================================================================== */
    let countersStarted = false;
    
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + (counter.getAttribute('data-target') == 100 ? '%' : '');
                }
            };
            updateCount();
        });
    }

    /* ==========================================================================
       Product Tabs Filtering
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active to current
            btn.classList.add('active');

            const tab = btn.getAttribute('data-tab');

            productCards.forEach(card => {
                if (tab === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; }, 50);
                } else {
                    if (card.getAttribute('data-category') === tab) {
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; }, 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                }
            });
        });
    });

    /* ==========================================================================
       Form Submission
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
            btn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="bx bx-check"></i>';
                btn.style.backgroundColor = '#10b981';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
