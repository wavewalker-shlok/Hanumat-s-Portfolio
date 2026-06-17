// ==================== DOM CONTENT LOADED ====================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTypingEffect();
    initParticles();
    initScrollAnimations();
    initSkillBars();
    initCounters();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initMountainParallax();
    initExperiencePinned();
    initEducationLibrary();
    initSkillsMarquee();
    initAchievementsSimple();
    initResumeSection();
    initContactSection();
    initNewsletterForm();
});

// ==================== NAVBAR ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==================== TYPING EFFECT ====================
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const titles = [
        'Business Manager @ Aavas Financiers Ltd',
        'MBA Finance | R.A. Podar Institute',
        'IIM Ranchi — Investment Banking',
        'Banking & NBFC Professional',
        'Affordable Housing Finance Expert'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeText() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    typeText();
}

// ==================== PARTICLES ====================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particlesContainer.appendChild(particle);
    }
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.closest('#skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const sections = document.querySelectorAll('.section-header, .edu-card, .strength-card, .achievement-card, .contact-card');
    sections.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ==================== SKILL BARS ====================
let skillBarsAnimated = false;

function initSkillBars() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillBarsAnimated) {
                animateSkillBars();
                skillBarsAnimated = true;
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
}

function animateSkillBars() {
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// ==================== COUNTERS ====================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    let countersAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    if (!isNaN(target)) {
                        animateCounter(counter, target);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    function updateCounter() {
        current += step;
        if (current >= target) {
            element.textContent = target;
        } else {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// ==================== CONTACT FORM ====================
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            if (!name || !email || !subject || !message) {
                showNotification('Please fill all fields!', 'error');
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Resume download buttons
    const downloadBtns = document.querySelectorAll('#downloadResume, #downloadResumeBtn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Resume download started! Check your downloads folder.', 'success');
        });
    });
}

// ==================== NEWSLETTER FORM ====================
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input.value.trim();

        if (!email) {
            showNotification('Please enter an email address!', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email!', 'error');
            return;
        }

        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Subscribing...';
        btn.disabled = true;

        setTimeout(() => {
            showNotification('🎉 Successfully subscribed! Thank you.', 'success');
            input.value = '';
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1200);
    });
}

// ==================== NOTIFICATION ====================
function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: "'Inter', sans-serif",
        zIndex: '10000',
        transform: 'translateX(120%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: '#ffffff',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    });

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== HERO IMAGE PARALLAX ====================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage && scrollY < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
});

// ==================== HERO MOUNTAINS PARALLAX ====================
function initMountainParallax() {
    const mountainBack = document.querySelector('.mountain-back');
    const mountainFront = document.querySelector('.mountain-front');
    const hero = document.querySelector('.hero');

    if (!mountainBack || !mountainFront || !hero) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled <= heroHeight) {
            mountainBack.style.transform = `translateY(${scrolled * 0.15}px) scale(1.05)`;
            mountainFront.style.transform = `translateY(${scrolled * 0.35}px)`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// ==================== EXPERIENCE PINNED SCROLL (GSAP) ====================
function initExperiencePinned() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP not loaded — Experience section will work without animations');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.experience-pin');
    const slides = gsap.utils.toArray('.exp-slide');
    const dots = gsap.utils.toArray('.exp-dot');
    const progressFill = document.getElementById('expProgressFill');

    if (!section || slides.length === 0) return;

    const totalSlides = slides.length;
    let currentSlide = -1;

    slides[0].classList.add('active');
    animateSlideIn(slides[0]);
    currentSlide = 0;

    ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * totalSlides}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        snap: {
            snapTo: 1 / (totalSlides - 1),
            duration: { min: 0.3, max: 0.6 },
            ease: 'power2.inOut'
        },
        onUpdate: (self) => {
            const progress = self.progress;
            const slideIndex = Math.min(
                Math.floor(progress * totalSlides),
                totalSlides - 1
            );

            if (progressFill) {
                progressFill.style.width = (progress * 100) + '%';
            }

            if (slideIndex !== currentSlide) {
                changeSlide(slideIndex);
            }
        }
    });

    function changeSlide(newIndex) {
        if (currentSlide >= 0 && slides[currentSlide]) {
            slides[currentSlide].classList.remove('active');
        }

        slides[newIndex].classList.add('active');

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === newIndex);
        });

        animateSlideIn(slides[newIndex]);

        currentSlide = newIndex;
    }

    function animateSlideIn(slide) {
        const giantCounter = slide.querySelector('.exp-giant-counter');
        const card = slide.querySelector('.exp-card');
        const header = slide.querySelector('.exp-card-header');
        const divider = slide.querySelector('.exp-divider');
        const meta = slide.querySelector('.exp-meta');
        const desc = slide.querySelector('.exp-description');
        const tags = slide.querySelectorAll('.exp-tag');

        gsap.set(giantCounter, { opacity: 0, x: 100, scale: 0.8 });
        gsap.set(card, { opacity: 0, y: 50, scale: 0.95 });
        gsap.set([header, divider, meta, desc], { opacity: 0, y: 25 });
        gsap.set(tags, { opacity: 0, y: 20, scale: 0.9 });

        const tl = gsap.timeline();

        tl.to(giantCounter, { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' })
          .to(card, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.8')
          .to(header, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.5')
          .to(divider, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.35')
          .to(meta, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
          .to(desc, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
          .to(tags, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              stagger: 0.08,
              ease: 'back.out(1.4)'
          }, '-=0.3');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const sectionTop = section.offsetTop;
            const scrollDistance = (window.innerHeight * (totalSlides - 1)) * (index / (totalSlides - 1));
            window.scrollTo({
                top: sectionTop + scrollDistance,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
}

// ==================== EDUCATION LIBRARY — GSAP ANIMATIONS ====================
function initEducationLibrary() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const eduBg = document.querySelector('.education-library .edu-bg-image');
    if (eduBg) {
        gsap.to(eduBg, {
            y: '15%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.education-library',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    const eduHeader = document.querySelector('.edu-header-dark');
    if (eduHeader) {
        gsap.from(eduHeader.children, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.education-library',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    const featuredCards = document.querySelectorAll('.edu-featured-row .edu-card');
    featuredCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, x: index === 0 ? -60 : 60, y: 30, scale: 0.95 },
            {
                opacity: 1, x: 0, y: 0, scale: 1,
                duration: 0.9, delay: index * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.edu-featured-row',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    const divider = document.querySelector('.edu-section-divider');
    if (divider) {
        gsap.from(divider, {
            opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
                trigger: divider,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    const foundationCards = document.querySelectorAll('.edu-foundation-row .edu-card');
    foundationCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.92 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.8, delay: index * 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.edu-foundation-row',
                    start: 'top 82%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    document.querySelectorAll('.edu-card').forEach(card => {
        const icon = card.querySelector('.edu-icon-box');
        const ribbon = card.querySelector('.edu-ribbon');
        const tags = card.querySelectorAll('.edu-tag');

        if (icon) {
            gsap.fromTo(icon,
                { opacity: 0, scale: 0, rotation: -90 },
                {
                    opacity: 1, scale: 1, rotation: 0,
                    duration: 0.6, delay: 0.3, ease: 'back.out(1.8)',
                    scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );
        }

        if (ribbon) {
            gsap.fromTo(ribbon,
                { opacity: 0, y: -20, scale: 0.5 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.6, delay: 0.5, ease: 'back.out(2)',
                    scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );
        }

        if (tags.length > 0) {
            gsap.fromTo(tags,
                { opacity: 0, scale: 0.6 },
                {
                    opacity: 1, scale: 1,
                    duration: 0.4, stagger: 0.07, delay: 0.6, ease: 'back.out(1.5)',
                    scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );
        }
    });
}


// ==================== SKILLS MARQUEE — GSAP ANIMATIONS ====================
function initSkillsMarquee() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Header reveal
    const header = document.querySelector('.skills-marquee .section-header');
    if (header) {
        gsap.from(header.children, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.skills-marquee',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // Marquee rows fade in (one by one)
    const rows = gsap.utils.toArray('.marquee-row');
    rows.forEach((row, index) => {
        gsap.from(row, {
            opacity: 0,
            y: 40,
            duration: 0.9,
            delay: 0.3 + (index * 0.2),
            ease: 'power3.out',
            scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}


// ==================== ACHIEVEMENTS — SIMPLE GSAP ====================
function initAchievementsSimple() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const header = document.querySelector('.achievements-simple .section-header');
    if (header) {
        gsap.from(header.children, {
            opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.achievements-simple', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    }

    const board = document.querySelector('.cork-board');
    if (board) {
        gsap.from(board, {
            opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: board, start: 'top 80%', toggleActions: 'play none none reverse' }
        });
    }

    const cards = gsap.utils.toArray('.pinned-card');
    cards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0, scale: 0.7, y: -30, rotation: 0,
            duration: 0.6, delay: 0.3 + (index * 0.1), ease: 'back.out(1.6)',
            scrollTrigger: { trigger: board, start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    });

    const pins = gsap.utils.toArray('.pin');
    pins.forEach((pin, index) => {
        gsap.from(pin, {
            scale: 0, opacity: 0,
            duration: 0.4, delay: 0.6 + (index * 0.1), ease: 'back.out(2)',
            scrollTrigger: { trigger: board, start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    });
}

// ==================== RESUME SECTION — GSAP ANIMATIONS ====================
function initResumeSection() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const resumeContent = document.querySelector('.resume-content');
    if (!resumeContent) return;

    const icon = document.querySelector('.resume-icon-badge');
    if (icon) {
        gsap.from(icon, {
            opacity: 0, scale: 0, rotation: -180,
            duration: 0.9, ease: 'back.out(1.8)',
            scrollTrigger: { trigger: '.resume-section', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    }

    const subtitle = document.querySelector('.resume-subtitle');
    if (subtitle) {
        gsap.from(subtitle, {
            opacity: 0, y: 20, duration: 0.6, delay: 0.3, ease: 'power3.out',
            scrollTrigger: { trigger: '.resume-section', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    }

    const heading = document.querySelector('.resume-text h2');
    if (heading) {
        gsap.from(heading, {
            opacity: 0, y: 30, duration: 0.7, delay: 0.4, ease: 'power3.out',
            scrollTrigger: { trigger: '.resume-section', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    }

    const description = document.querySelector('.resume-text p');
    if (description) {
        gsap.from(description, {
            opacity: 0, y: 20, duration: 0.7, delay: 0.55, ease: 'power3.out',
            scrollTrigger: { trigger: '.resume-section', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    }

    const ctaBtn = document.querySelector('.resume-cta-btn');
    if (ctaBtn) {
        gsap.from(ctaBtn, {
            opacity: 0, scale: 0.7, y: 20, duration: 0.7, delay: 0.7, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.resume-section', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    }

    const metaItems = gsap.utils.toArray('.resume-meta > *');
    metaItems.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0, y: 15, duration: 0.5, delay: 1 + (index * 0.08), ease: 'power2.out',
            scrollTrigger: { trigger: '.resume-section', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    });
}

// ==================== CONTACT SECTION — GSAP ANIMATIONS ====================
function initContactSection() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const header = document.querySelector('.contact-split .section-header');
    if (header) {
        gsap.from(header.children, {
            opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-split', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    }

    const bgCard = document.querySelector('.contact-bg-card');
    if (bgCard) {
        gsap.from(bgCard, {
            opacity: 0, x: 60, y: 30, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-card-wrapper', start: 'top 80%', toggleActions: 'play none none reverse' }
        });
    }

    const card = document.querySelector('.contact-card');
    if (card) {
        gsap.from(card, {
            opacity: 0, y: 50, scale: 0.96, duration: 1, delay: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-card-wrapper', start: 'top 80%', toggleActions: 'play none none reverse' }
        });
    }

    const infoTitle = document.querySelector('.info-panel-title');
    const infoItems = gsap.utils.toArray('.info-item');
    const socialSection = document.querySelector('.info-social-section');

    if (infoTitle) {
        gsap.from(infoTitle, {
            opacity: 0, x: -30, duration: 0.7, delay: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-card', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    }

    infoItems.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0, x: -30, duration: 0.6, delay: 0.6 + (index * 0.12), ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-card', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    });

    if (socialSection) {
        gsap.from(socialSection, {
            opacity: 0, y: 20, duration: 0.7, delay: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-card', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    }

    const formHeader = document.querySelector('.form-header');
    const formGroups = gsap.utils.toArray('.contact-form .form-group');
    const sendBtn = document.querySelector('.contact-send-btn');

    if (formHeader) {
        gsap.from(formHeader, {
            opacity: 0, y: 25, duration: 0.7, delay: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-card', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    }

    formGroups.forEach((group, index) => {
        gsap.from(group, {
            opacity: 0, y: 20, duration: 0.5, delay: 0.7 + (index * 0.1), ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-card', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    });

    if (sendBtn) {
        gsap.from(sendBtn, {
            opacity: 0, scale: 0.8, duration: 0.6, delay: 1.2, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.contact-card', start: 'top 75%', toggleActions: 'play none none reverse' }
        });
    }
}