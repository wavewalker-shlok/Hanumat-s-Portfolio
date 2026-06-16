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
});

// ==================== NAVBAR ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link on scroll
        updateActiveNavLink();
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
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
                
                // Trigger skill bars when skills section is visible
                if (entry.target.closest('#skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Observe all section headers and major elements
    const sections = document.querySelectorAll('.section-header, .timeline-item, .edu-card, .strength-card, .achievement-card, .contact-card');
    sections.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ==================== SKILL BARS ====================
let skillBarsAnimated = false;

function initSkillBars() {
    const skillsSection = document.getElementById('skills');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillBarsAnimated) {
                animateSkillBars();
                skillBarsAnimated = true;
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
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
    let countersAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
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

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill all fields!', 'error');
                return;
            }

            // Simulate form submission
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
    // Resume download buttons — show success notification on click
const downloadBtns = document.querySelectorAll('#downloadResume, #downloadResumeBtn');
downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        showNotification('Resume download started! Check your downloads folder.', 'success');
    });
});

    
}

function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Styles
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

    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

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
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== PARALLAX EFFECT (OPTIONAL) ====================
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
        
        // Only animate while hero is in view (performance)
        if (scrolled <= heroHeight) {
            // Back layer — slower (depth illusion)
            mountainBack.style.transform = `translateY(${scrolled * 0.15}px) scale(1.05)`;
            // Front layer — faster
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