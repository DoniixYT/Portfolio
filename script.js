// ===== PRELOADER =====
let isPageLoaded = false;

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('loading');
        isPageLoaded = true;
        // Start animations and typing after preloader
        setTimeout(() => {
            initAnimations();
            startTypingEffect();
        }, 100);
    }, 2500);
});

function initAnimations() {
    // Initialize all scroll-based animations here
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-card h3, .about-card p, ' +
        '.skills-category h3, .skill-item, ' +
        '.project-info h3, .project-info p, .project-tags, ' +
        '.contact-info h3, .contact-info p'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => textObserver.observe(el));
}

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || window.pageYOffset;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== SECTION SWITCHING =====
const allSections = document.querySelectorAll('section, .hero');
let currentSectionIndex = 0;
let isAnimating = false;

// Initialize - show first section (hero)
allSections[0].classList.add('active');

// Handle wheel scroll
window.addEventListener('wheel', (e) => {
    if (isAnimating) return;
    
    if (e.deltaY > 0) {
        // Scroll down
        if (currentSectionIndex < allSections.length - 1) {
            changeSection(currentSectionIndex + 1);
        }
    } else {
        // Scroll up
        if (currentSectionIndex > 0) {
            changeSection(currentSectionIndex - 1);
        }
    }
}, { passive: true });

// Handle keyboard navigation (disabled for Konami code compatibility)
// Uncomment if you want arrow key navigation instead of Konami code
/*
window.addEventListener('keydown', (e) => {
    if (isAnimating) return;
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSectionIndex < allSections.length - 1) {
            changeSection(currentSectionIndex + 1);
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSectionIndex > 0) {
            changeSection(currentSectionIndex - 1);
        }
    }
});
*/

function changeSection(newIndex) {
    if (newIndex === currentSectionIndex || isAnimating) return;
    
    isAnimating = true;
    
    // Remove active from current
    allSections[currentSectionIndex].classList.remove('active');
    
    // Add active to new
    allSections[newIndex].classList.add('active');
    
    currentSectionIndex = newIndex;
    
    // Show/hide footer based on section
    const footer = document.querySelector('.footer');
    if (newIndex === allSections.length - 1) {
        // Last section (contact)
        footer.style.opacity = '1';
    } else {
        footer.style.opacity = '0';
    }
    
    // Reset animation lock
    setTimeout(() => {
        isAnimating = false;
    }, 1000);
}

// Handle ALL anchor links with hash
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        
        // Find section index by ID
        let targetIndex = -1;
        allSections.forEach((section, index) => {
            if (section.id === targetId || (targetId === 'hero' && section.classList.contains('hero'))) {
                targetIndex = index;
            }
        });
        
        if (targetIndex !== -1) {
            changeSection(targetIndex);
        }
    });
});

// Handle scroll indicator click - go to next section
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        if (currentSectionIndex < allSections.length - 1) {
            changeSection(currentSectionIndex + 1);
        }
    });
}

// ===== 3D TILT EFFECT FOR CARDS =====
const cards = document.querySelectorAll('.about-card, .skills-category, .project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===== TEXT ANIMATIONS ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animuj wszystkie teksty
const animatedElements = document.querySelectorAll(
    '.section-header, .about-card h3, .about-card p, ' +
    '.skills-category h3, .skill-item, ' +
    '.project-info h3, .project-info p, .project-tags, ' +
    '.contact-info h3, .contact-info p'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    textObserver.observe(el);
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== HERO ANIMATIONS =====
// Animate words with delays
document.querySelectorAll('.hero-title .word').forEach(word => {
    const delay = word.getAttribute('data-delay');
    word.style.animationDelay = `${delay}ms`;
});

document.querySelectorAll('.hero-subtitle .line').forEach(line => {
    const delay = line.getAttribute('data-delay');
    line.style.animationDelay = `${delay}ms`;
});


// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax only for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ===== CUSTOM FORM VALIDATION =====
const form = document.getElementById('contactForm');
if (form) {
    // Disable default validation
    form.setAttribute('novalidate', 'novalidate');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Remove all previous errors
        document.querySelectorAll('.error-message').forEach(err => err.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        // Hide form message
        const formMessage = document.getElementById('formMessage');
        formMessage.className = 'form-message';
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let firstInvalid = null;
        let errorMessage = '';
        
        // Find first invalid field
        for (let input of inputs) {
            if (!input.value.trim()) {
                firstInvalid = input;
                errorMessage = `${input.labels[0]?.textContent || 'This field'} is required`;
                break;
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                firstInvalid = input;
                errorMessage = 'Please enter a valid email address';
                break;
            }
        }
        
        if (firstInvalid) {
            showError(firstInvalid, errorMessage);
            firstInvalid.focus();
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return; // Stop form submission - don't continue to AJAX
        }
        
        // Form is valid - submit via AJAX
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await fetch('https://api.casespin.fun/mail/contact.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            formMessage.className = 'form-message';
            if (data.success) {
                formMessage.classList.add('success');
                formMessage.textContent = data.message;
                form.reset();
                // CONFETTI!
                createConfetti();
            } else {
                formMessage.classList.add('error');
                formMessage.textContent = data.message;
            }
            
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
            
        } catch (error) {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'An error occurred. Please try again later.';
            
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
    
    // Remove error on input
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            const error = input.parentElement.querySelector('.error-message');
            if (error) error.remove();
            input.classList.remove('error');
        });
    });
}

function showError(input, message) {
    input.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<span class="error-icon">⚠️</span><span>${message}</span>`;
    input.parentElement.appendChild(errorDiv);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== PROJECT CARDS TILT EFFECT =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// This handler is now integrated with validation above

// ===== FORM INPUT ANIMATIONS =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateX(5px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateX(0)';
    });
});

// ===== TYPING EFFECT =====
function startTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        
        let charIndex = 0;
        const firstPartEnd = text.indexOf('•'); // "Full Stack Developer"
        
        function typeText() {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
                
                // Szybko dla "Full Stack Developer", wolno dla "• Powered by Coffee"
                const delay = charIndex <= firstPartEnd ? 50 : 100;
                setTimeout(typeText, delay);
            }
        }
        
        setTimeout(typeText, 500);
    }
}

// Typing effect is now called from preloader

// ===== SCROLL PROGRESS INDICATOR =====
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #7434f3, #bc91f7);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ===== NUMBERS COUNTER ANIMATION =====
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.skill-percent');
    
    numbers.forEach(number => {
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 50;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                number.textContent = Math.ceil(current) + '%';
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target + '%';
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(number);
    });
};

animateNumbers();

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hey Developer!', 'font-size: 24px; font-weight: bold; color: #7434f3;');
console.log('%cLooking for a skilled full-stack developer?', 'font-size: 16px; color: #b494e6;');
console.log('%c🐦 https://x.com/dev_Doniix', 'font-size: 14px; color: #bc91f7;');
console.log('%cLet\'s build something amazing together!', 'font-size: 14px; color: #a0a0b0;');

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-dependent code here
    });
}, { passive: true });

// Lazy load images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== FLYING HEARTS ANIMATION =====
const footerHeart = document.querySelector('.footer-heart');
if (footerHeart) {
    footerHeart.addEventListener('click', (e) => {
        // Get center of screen
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Create explosion of hearts from center of screen
        for (let i = 0; i < 12; i++) {
            createFlyingHeart(centerX, centerY, i);
        }
    });
}

function createFlyingHeart(x, y, index) {
    const heart = document.createElement('div');
    heart.className = 'flying-heart';
    heart.textContent = '❤️';
    
    // Calculate random direction (360 degrees)
    const angle = (Math.random() * 360) * (Math.PI / 180);
    const distance = 100 + Math.random() * 100; // Random distance (smaller)
    
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    // Set CSS variables for animation
    heart.style.setProperty('--tx', tx + 'px');
    heart.style.setProperty('--ty', ty + 'px');
    
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.animationDelay = (index * 0.05) + 's';
    
    document.body.appendChild(heart);
    
    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 2000 + (index * 50));
}

// ===== CONFETTI ANIMATION =====
function createConfetti() {
    const colors = ['#7C3AED', '#FFA04C', '#EC4899', '#10B981', '#3B82F6'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ===== EASTER EGGS =====
const rainbowCode = ['r', 'a', 'i', 'n', 'b', 'o', 'w'];
const hackCode = ['h', 'a', 'c', 'k'];
let rainbowIndex = 0;
let hackIndex = 0;

document.addEventListener('keydown', (e) => {
    // Check if we're in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    // Check rainbow code
    if (e.key === rainbowCode[rainbowIndex]) {
        rainbowIndex++;
        if (rainbowIndex === rainbowCode.length) {
            activateRainbowMode();
            rainbowIndex = 0;
            hackIndex = 0;
        }
    } else {
        rainbowIndex = 0;
    }
    
    // Check hack code
    if (e.key === hackCode[hackIndex]) {
        hackIndex++;
        if (hackIndex === hackCode.length) {
            activateHackMode();
            hackIndex = 0;
            rainbowIndex = 0;
        }
    } else {
        hackIndex = 0;
    }
});

function activateRainbowMode() {
    // Rainbow mode - everything becomes rainbow!
    document.body.style.filter = 'hue-rotate(0deg)';
    
    let degree = 0;
    const rainbowInterval = setInterval(() => {
        degree = (degree + 2) % 360;
        document.body.style.filter = `hue-rotate(${degree}deg)`;
    }, 20);
    
    createConfetti();
    
    // Show message
    const message = document.createElement('div');
    message.className = 'konami-message';
    message.textContent = '🌈 RAINBOW MODE ACTIVATED! 🌈';
    message.style.filter = 'hue-rotate(0deg)'; // Keep message normal
    document.body.appendChild(message);
    
    // Stop after 5 seconds
    setTimeout(() => {
        message.remove();
        clearInterval(rainbowInterval);
        document.body.style.filter = '';
    }, 5000);
}

function activateHackMode() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 99999;
        opacity: 0;
        transition: opacity 1s;
    `;
    document.body.appendChild(overlay);
    
    // Fade to black
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    // Start matrix and boot sequence
    setTimeout(() => {
        startHackMode(overlay);
    }, 1000);
}

function startHackMode(overlay) {
    // Hide all content
    document.querySelectorAll('body > *:not([style*="z-index: 99999"])').forEach(el => {
        el.style.display = 'none';
    });
    
    // Create matrix canvas
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99999;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Matrix rain
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 33);
    
    // Boot sequence after 3 seconds
    setTimeout(() => {
        clearInterval(matrixInterval);
        startBootSequence(canvas);
    }, 3000);
}

function startBootSequence(canvas) {
    // Clear canvas
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create terminal
    const terminal = document.createElement('div');
    terminal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 800px;
        color: #0f0;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        z-index: 100000;
        text-shadow: 0 0 5px #0f0;
    `;
    document.body.appendChild(terminal);
    
    const bootMessages = [
        'SYSTEM BOOT SEQUENCE INITIATED...',
        '',
        'Loading kernel modules...',
        '[OK] CPU initialized',
        '[OK] Memory check passed',
        '[OK] Network interface detected',
        '',
        'Starting services...',
        '[OK] SSH daemon started',
        '[OK] Web server started',
        '[OK] Database connected',
        '',
        'SYSTEM READY',
        '',
        'Type "help" for available commands',
        ''
    ];
    
    let lineIndex = 0;
    const bootInterval = setInterval(() => {
        if (lineIndex < bootMessages.length) {
            const line = document.createElement('div');
            line.textContent = bootMessages[lineIndex];
            line.style.marginBottom = '5px';
            terminal.appendChild(line);
            lineIndex++;
        } else {
            clearInterval(bootInterval);
            setTimeout(() => {
                showTerminal(canvas, terminal);
            }, 1000);
        }
    }, 200);
}

function showTerminal(canvas, bootTerminal) {
    // Remove boot terminal
    bootTerminal.remove();
    
    // Keep matrix running in background
    const ctx = canvas.getContext('2d');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Start matrix background
    const matrixInterval = setInterval(drawMatrix, 33);
    
    // Store interval for cleanup
    window.hackMatrixInterval = matrixInterval;
    
    // Create full terminal interface with transparency
    const terminalContainer = document.createElement('div');
    terminalContainer.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 100000; padding: 2rem; overflow-y: auto; color: #0f0; font-family: 'Courier New', monospace;">
            <div style="border: 2px solid #0f0; padding: 1rem; margin-bottom: 1rem; text-align: center; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(5px);">
                <div style="font-size: 1.5rem; letter-spacing: 3px; text-shadow: 0 0 10px #0f0;">⚠️ SYSTEM ACCESS GRANTED ⚠️</div>
            </div>
            <div id="hack-output" style="margin: 1rem 0; background: rgba(0, 0, 0, 0.7); padding: 1rem; border: 1px solid #0f0; min-height: 300px; backdrop-filter: blur(3px);"></div>
            <div style="display: flex; align-items: center; background: rgba(0, 0, 0, 0.8); padding: 0.5rem; border: 1px solid #0f0;">
                <span style="color: #0ff; margin-right: 0.5rem;">root@nathan:~$</span>
                <input type="text" id="hack-input" style="background: transparent; border: none; color: #0f0; font-family: 'Courier New', monospace; font-size: 14px; outline: none; flex: 1; text-shadow: 0 0 5px #0f0;" autofocus>
            </div>
            <button onclick="exitHackMode()" style="position: fixed; top: 20px; right: 20px; padding: 0.5rem 1rem; border: 2px solid #0f0; background: rgba(0, 0, 0, 0.8); color: #0f0; font-family: 'Courier New', monospace; cursor: pointer; text-shadow: 0 0 5px #0f0; backdrop-filter: blur(5px);">EXIT [ESC]</button>
        </div>
    `;
    document.body.appendChild(terminalContainer);
    
    // Initialize terminal commands
    initHackTerminal();
}

window.exitHackMode = function() {
    // Stop matrix animation
    if (window.hackMatrixInterval) {
        clearInterval(window.hackMatrixInterval);
    }
    
    // Remove all hack elements
    document.querySelectorAll('[style*="z-index: 99999"], [style*="z-index: 100000"]').forEach(el => el.remove());
    document.querySelectorAll('canvas').forEach(el => {
        if (el.style.zIndex === '99999') el.remove();
    });
    
    // Show original content
    document.querySelectorAll('body > *').forEach(el => {
        el.style.display = '';
    });
};

function initHackTerminal() {
    const output = document.getElementById('hack-output');
    const input = document.getElementById('hack-input');
    
    // System files and directories
    const fileSystem = {
        '/': ['home', 'etc', 'var', 'usr', 'bin'],
        '/home': ['nathan', 'guest'],
        '/home/nathan': ['documents', 'projects', 'secrets.txt'],
        '/home/nathan/documents': ['resume.pdf', 'notes.txt'],
        '/home/nathan/projects': ['portfolio', 'hacktools'],
        '/etc': ['passwd', 'shadow', 'hosts'],
        '/var': ['log', 'www'],
        '/var/log': ['auth.log', 'system.log'],
    };
    
    let currentDir = '/home/nathan';
    let systemCompromised = false;
    
    function addTerminalLine(text, className = '') {
        const line = document.createElement('div');
        line.innerHTML = text;
        line.style.marginBottom = '5px';
        if (className === 'success') line.style.color = '#0f0';
        if (className === 'error') line.style.color = '#f00';
        if (className === 'info') line.style.color = '#0ff';
        output.appendChild(line);
        output.parentElement.scrollTop = output.parentElement.scrollHeight;
    }
    
    function listFiles(dir) {
        const files = fileSystem[dir];
        if (files) {
            files.forEach(file => {
                addTerminalLine(file, 'success');
            });
        } else {
            addTerminalLine('[!] Directory not found', 'error');
        }
    }
    
    function readFile(filename) {
        const files = {
            'secrets.txt': 'FLAG{y0u_f0und_th3_s3cr3t}<br>Password: admin123<br>API Key: sk_live_51HxY...',
            'passwd': 'root:x:0:0:root:/root:/bin/bash<br>nathan:x:1000:1000:Nathan:/home/nathan:/bin/bash',
            'shadow': 'root:$6$xyz$encrypted_password_hash::0:99999:7:::',
            'auth.log': '[2025-11-11 23:00:01] Failed login attempt from 192.168.1.100<br>[2025-11-11 23:00:15] Successful login: nathan',
            'notes.txt': 'Remember to change default passwords!<br>TODO: Fix security vulnerability in login system'
        };
        
        if (files[filename]) {
            addTerminalLine('<br>' + files[filename], 'info');
        } else {
            addTerminalLine('[!] File not found or permission denied', 'error');
        }
    }
    
    const commands = {
        help: () => {
            addTerminalLine('<br>=== AVAILABLE COMMANDS ===', 'info');
            addTerminalLine('help       - Show this help menu');
            addTerminalLine('ls         - List directory contents');
            addTerminalLine('cd [dir]   - Change directory');
            addTerminalLine('cat [file] - Read file contents');
            addTerminalLine('pwd        - Print working directory');
            addTerminalLine('whoami     - Display current user');
            addTerminalLine('ps         - List running processes');
            addTerminalLine('netstat    - Show network connections');
            addTerminalLine('sudo       - Execute command as root');
            addTerminalLine('clear      - Clear terminal');
            addTerminalLine('exit       - Disconnect<br>');
        },
        ls: () => {
            addTerminalLine('');
            listFiles(currentDir);
            addTerminalLine('');
        },
        pwd: () => {
            addTerminalLine('<br>' + currentDir + '<br>', 'info');
        },
        whoami: () => {
            addTerminalLine('<br>nathan<br>', 'success');
        },
        ps: () => {
            addTerminalLine('<br>PID  USER     COMMAND', 'info');
            addTerminalLine('1    root     /sbin/init');
            addTerminalLine('234  root     /usr/sbin/sshd');
            addTerminalLine('456  nathan   /bin/bash');
            addTerminalLine('789  nathan   node server.js');
            addTerminalLine('1024 www-data nginx<br>');
        },
        netstat: () => {
            addTerminalLine('<br>Active Internet connections', 'info');
            addTerminalLine('Proto  Local Address      Foreign Address    State');
            addTerminalLine('tcp    0.0.0.0:22         0.0.0.0:*          LISTEN');
            addTerminalLine('tcp    0.0.0.0:80         0.0.0.0:*          LISTEN');
            addTerminalLine('tcp    192.168.1.10:443   93.184.216.34:443  ESTABLISHED<br>');
        },
        sudo: () => {
            if (!systemCompromised) {
                addTerminalLine('<br>[sudo] password for nathan: ******', 'info');
                addTerminalLine('[!] Attempting privilege escalation...', 'info');
                setTimeout(() => {
                    addTerminalLine('[+] Root access granted!', 'success');
                    addTerminalLine('[!] System compromised. Full control achieved.<br>', 'success');
                    systemCompromised = true;
                }, 1500);
            } else {
                addTerminalLine('<br>[!] Already running as root<br>', 'info');
            }
        },
        clear: () => {
            output.innerHTML = '';
        },
        exit: () => {
            addTerminalLine('[!] Closing connection...', 'info');
            setTimeout(() => {
                exitHackMode();
            }, 1000);
        }
    };
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const fullCmd = input.value.trim();
            const parts = fullCmd.split(' ');
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);
            
            addTerminalLine(`<span style="color: #0ff;">root@nathan:~$</span> ${input.value}`);
            input.value = '';
            
            // Handle commands with arguments
            if (cmd === 'cat' && args.length > 0) {
                readFile(args[0]);
            } else if (cmd === 'cd' && args.length > 0) {
                const newDir = args[0];
                if (newDir === '..') {
                    const parts = currentDir.split('/').filter(p => p);
                    parts.pop();
                    currentDir = '/' + parts.join('/');
                    if (currentDir === '/') currentDir = '/';
                    addTerminalLine('');
                } else if (fileSystem[currentDir + '/' + newDir] || fileSystem['/' + newDir]) {
                    currentDir = currentDir === '/' ? '/' + newDir : currentDir + '/' + newDir;
                    addTerminalLine('');
                } else {
                    addTerminalLine('<br>[!] Directory not found<br>', 'error');
                }
            } else if (commands[cmd]) {
                commands[cmd]();
            } else if (cmd) {
                addTerminalLine(`<br>[!] Command not found: ${cmd}<br>`, 'error');
            }
        }
    });
    
    // Keep input focused
    input.focus();
    document.addEventListener('click', () => {
        input.focus();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            exitHackMode();
        }
    });
}
