/* ============================================
   iVolve - GSAP Animations & Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGsap = typeof gsap !== 'undefined';
    if (hasGsap) gsap.registerPlugin(ScrollTrigger);

    initNavbar();
    if (hasGsap && !prefersReducedMotion) {
        initHeroAnimations();
        initScrollAnimations();
        initCounters();
        initParticles();
    } else {
        // No animations: show final counter values immediately
        document.querySelectorAll('.stat-number').forEach(counter => {
            counter.textContent = counter.dataset.target;
        });
    }
    initMobileMenu();
    initContactForm();
    initCookieBanner();
    initScrollProgress();
    initBackToTop();
    initActiveNavLinks();
});

/* ============================================
   Scroll Progress Bar
   ============================================ */

function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    const update = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        bar.style.width = progress + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* ============================================
   Back to Top
   ============================================ */

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 700);
    }, { passive: true });

    btn.addEventListener('click', () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion || typeof gsap === 'undefined') {
            window.scrollTo(0, 0);
        } else {
            gsap.to(window, { duration: 0.9, scrollTo: { y: 0 }, ease: 'power3.inOut' });
        }
    });
}

/* ============================================
   Active Nav Link Highlighting
   ============================================ */

function initActiveNavLinks() {
    const links = document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)');
    if (!links.length) return;

    const sections = [...links]
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const setActive = () => {
        const scrollPos = window.scrollY + 120;
        let current = null;
        sections.forEach(section => {
            if (section.offsetTop <= scrollPos) current = section;
        });
        links.forEach(link => {
            link.classList.toggle('active', current && link.getAttribute('href') === '#' + current.id);
        });
    };

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
}

/* ============================================
   Navbar
   ============================================ */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ============================================
   Hero Animations
   ============================================ */

function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3
    })
    .from('.hero-title', {
        opacity: 0,
        y: 40,
        duration: 1,
    }, '-=0.4')
    .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
    }, '-=0.6')
    .from('.hero-cta .btn', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15
    }, '-=0.4')
    .from('.hero-stats .stat', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1
    }, '-=0.3')
    .from('.scroll-indicator', {
        opacity: 0,
        duration: 1
    }, '-=0.2');

    gsap.to('.hero-bg-img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

/* ============================================
   Scroll-Triggered Animations
   ============================================ */

function initScrollAnimations() {
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    });

    // Service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: i % 3 * 0.1,
            ease: 'power3.out'
        });
    });

    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Team cards
    gsap.utils.toArray('.team-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: i % 2 === 0 ? -30 : 30,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Testimonial cards
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 40,
            scale: 0.97,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out'
        });
    });

    // Trust strip items
    gsap.utils.toArray('.trust-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 92%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: i * 0.08,
            ease: 'power2.out'
        });
    });

    // Founder credibility strip
    gsap.from('.founder-strip', {
        scrollTrigger: {
            trigger: '.founder-strip',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out'
    });

    // Tech items
    gsap.utils.toArray('.tech-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 92%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -20,
            duration: 0.5,
            delay: i * 0.03,
            ease: 'power2.out'
        });
    });

    // About section
    const aboutContent = document.querySelector('.about-content');
    const aboutVisual = document.querySelector('.about-visual');

    if (aboutContent) {
        gsap.from(aboutContent, {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -40,
            duration: 0.9,
            ease: 'power3.out'
        });
    }

    if (aboutVisual) {
        gsap.from(aboutVisual, {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: 40,
            duration: 0.9,
            delay: 0.2,
            ease: 'power3.out'
        });
    }

    // Contact section
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 40,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });

    // Code window typing effect
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        gsap.from('.code-body code', {
            scrollTrigger: {
                trigger: codeWindow,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out'
        });
    }
}

/* ============================================
   Counter Animation
   ============================================ */

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target);
        const isDecimal = target % 1 !== 0;

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.to(counter, {
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                        const progress = this.progress();
                        const current = target * progress;
                        counter.textContent = isDecimal 
                            ? current.toFixed(1) 
                            : Math.floor(current);
                    },
                    onComplete: () => {
                        counter.textContent = isDecimal 
                            ? target.toFixed(1) 
                            : target;
                    }
                });
            }
        });
    });
}

/* ============================================
   Particles Background
   ============================================ */

function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${Math.random() > 0.5 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(6, 182, 212, 0.3)'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        container.appendChild(particle);

        gsap.to(particle, {
            y: `random(-80, 80)`,
            x: `random(-40, 40)`,
            opacity: `random(0.2, 0.8)`,
            duration: `random(4, 8)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 3
        });
    }
}

/* ============================================
   Mobile Menu
   ============================================ */

function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (!toggle || !navLinks) return;

    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', navLinks.classList.contains('active') ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ============================================
   Contact Form
   ============================================ */

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const status = document.getElementById('formStatus');
        const originalText = btn.textContent;
        const endpoint = form.dataset.formEndpoint || form.action;

        if (!status) return;

        status.textContent = '';
        status.className = 'form-status';
        btn.textContent = 'Sending...';
        btn.disabled = true;

        if (!endpoint || endpoint.includes('your-form-id')) {
            status.textContent = 'Set your Formspree endpoint in the form action before going live.';
            status.classList.add('error');
            btn.textContent = originalText;
            btn.disabled = false;
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Lead capture failed.');
            }

            status.textContent = 'Thanks. Your request was sent successfully.';
            status.classList.add('success');
            btn.textContent = 'Message Sent';
            form.reset();
        } catch (error) {
            status.textContent = 'Submission failed. Please retry or email contact@ivolve.dev.';
            status.classList.add('error');
            btn.textContent = originalText;
        } finally {
            btn.disabled = false;
        }
    });
}

/* ============================================
   Cookie Notice
   ============================================ */

function initCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    const accept = document.getElementById('cookieAccept');
    const decline = document.getElementById('cookieDecline');
    if (!banner || !accept || !decline) return;

    const saved = localStorage.getItem('ivolve_cookie_pref');
    if (!saved) {
        banner.classList.add('show');
    }

    const closeBanner = (pref) => {
        localStorage.setItem('ivolve_cookie_pref', pref);
        banner.classList.remove('show');
    };

    accept.addEventListener('click', () => closeBanner('accepted'));
    decline.addEventListener('click', () => closeBanner('declined'));
}

/* ============================================
   Smooth Scroll for Safari
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion || typeof gsap === 'undefined') {
            target.scrollIntoView();
        } else {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: target, offsetY: 80 },
                ease: 'power3.inOut'
            });
        }
    });
});
