// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 2500);

    // Initialize all animations
    createMatrixRain();
    createStars();
    createShootingStars();
    createFloatingShapes();
    createCodeParticles();
    initCursor();
    initCountUp();
    initCardTilt();
    initParticleTrail();
    initNavigation();
    initTypewriter();
    initGalleryFilter();
    initGalleryPagination();
    initLightbox();
    initScrollAnimations();
});

// Gallery Pagination
let currentPage = 1;
const itemsPerPage = 6;
let filteredItems = [];

function initGalleryPagination() {
    const allItems = document.querySelectorAll('.gallery-item');
    filteredItems = Array.from(allItems);
    updatePagination();
    showPage(1);
}

function updatePagination() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const pageNumbers = document.getElementById('pageNumbers');
    
    if (!pageNumbers) return;
    
    pageNumbers.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-num' + (i === currentPage ? ' active' : '');
        btn.textContent = i;
        btn.onclick = () => showPage(i);
        pageNumbers.appendChild(btn);
    }
    
    // Update prev/next buttons
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');
    
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function showPage(page) {
    currentPage = page;
    
    // Hide all items first
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.display = 'none';
    });
    
    // Show items for current page
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    filteredItems.slice(start, end).forEach((item, index) => {
        item.style.display = 'block';
        item.style.animation = `galleryFadeIn 0.5s ease ${index * 0.1}s forwards`;
    });
    
    updatePagination();
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        showPage(newPage);
    }
}

// Matrix Rain Effect
function createMatrixRain() {
    const container = document.getElementById('matrixRain');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>{}[]();:=+-*/';
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const char = document.createElement('span');
            char.className = 'matrix-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = Math.random() * 100 + '%';
            char.style.animationDuration = (Math.random() * 5 + 5) + 's';
            char.style.fontSize = (Math.random() * 10 + 10) + 'px';
            container.appendChild(char);
            
            // Remove and recreate
            char.addEventListener('animationend', () => {
                char.remove();
                createMatrixChar(container, chars);
            });
        }, i * 200);
    }
}

function createMatrixChar(container, chars) {
    const char = document.createElement('span');
    char.className = 'matrix-char';
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.style.left = Math.random() * 100 + '%';
    char.style.animationDuration = (Math.random() * 5 + 5) + 's';
    char.style.fontSize = (Math.random() * 10 + 10) + 'px';
    container.appendChild(char);
    
    char.addEventListener('animationend', () => {
        char.remove();
        createMatrixChar(container, chars);
    });
}

// Create Stars
function createStars() {
    const container = document.getElementById('stars');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        container.appendChild(star);
    }
}

// Create Shooting Stars
function createShootingStars() {
    const container = document.getElementById('shootingStars');
    
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.top = Math.random() * 50 + '%';
        star.style.left = '-150px';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(star);
        
        setTimeout(() => star.remove(), 4000);
    }, 4000);
}

// Create Floating Shapes
function createFloatingShapes() {
    const container = document.getElementById('shapes');
    const colors = ['#00d9ff', '#ff6b9d', '#6c5ce7', '#feca57', '#48dbfb'];
    
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.width = (Math.random() * 400 + 200) + 'px';
        shape.style.height = shape.style.width;
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.background = colors[i];
        shape.style.animationDelay = (i * 3) + 's';
        container.appendChild(shape);
    }
}

// Create Code Particles
function createCodeParticles() {
    const container = document.getElementById('codeParticles');
    const codeSnippets = ['{ }', '< />', '( )', '[ ]', '= =', '+ +', '- -', '* *', '/ /', '; ;', '::'];
    
    setInterval(() => {
        const particle = document.createElement('span');
        particle.className = 'code-particle';
        particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 30000);
    }, 2000);
}

// Custom Cursor
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX - 6 + 'px';
        cursor.style.top = mouseY - 6 + 'px';
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX - 20 + 'px';
        follower.style.top = followerY - 20 + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Hover effect
    const interactiveElements = document.querySelectorAll('a, button, .gallery-card, .social-card, .filter-btn, .skill-tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover');
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover');
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Typewriter Effect for Job Title
function initTypewriter() {
    const titles = ['Full Stack Developer', 'UI/UX Designer', 'Creative Coder', 'Problem Solver', 'Tech Enthusiast'];
    const element = document.getElementById('jobTitle');
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            element.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1500);
}

// Count Up Animation
function initCountUp() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}


// Card 3D Tilt Effect
function initCardTilt() {
    const card = document.getElementById('profileCard');
    if (!card) return;
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// Particle Trail
function initParticleTrail() {
    let lastTime = 0;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime > 50) {
            createTrailParticle(e.clientX, e.clientY);
            lastTime = now;
        }
    });
}

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const colors = ['#00d9ff', '#ff6b9d', '#6c5ce7', '#feca57'];
    
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: trailFade 1s ease-out forwards;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

// Add trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0) translateY(-30px); opacity: 0; }
    }
`;
document.head.appendChild(trailStyle);

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const scrollTop = document.getElementById('scrollTop');
    
    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            scrollTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            scrollTop.classList.remove('visible');
        }
        
        // Update active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Scroll to top
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Gallery Filter
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Update filtered items for pagination
            if (filter === 'all') {
                filteredItems = Array.from(galleryItems);
            } else {
                filteredItems = Array.from(galleryItems).filter(item => item.dataset.category === filter);
            }
            
            // Reset to page 1 and show
            currentPage = 1;
            showPage(1);
        });
    });
}

// Lightbox
const galleryData = [
    { src: 'photos/sunset-village.jpg', title: 'Hoàng Hôn Làng Quê', desc: 'Vẻ đẹp bình yên' },
    { src: 'photos/lanterns.jpg', title: 'Phố Cổ', desc: 'Nét đẹp truyền thống' },
    { src: 'photos/red-flags.jpg', title: 'Đèn Lồng Hội An', desc: 'Lung linh đêm phố cổ' },
    { src: 'photos/lake-reflection.jpg', title: 'Bình Minh', desc: 'Khởi đầu ngày mới' },
    { src: 'photos/night-park.jpg', title: 'Nắng Chiều', desc: 'Ánh nắng vàng ấm áp' },
    { src: 'photos/morning-sun.jpg', title: 'Đêm Yên Bình', desc: 'Ánh đèn thành phố' },
    { src: 'photos/pagoda.jpg', title: 'Mặt Hồ Tĩnh Lặng', desc: 'Phản chiếu bầu trời' },
    { src: 'photos/sunset-city.jpg', title: 'Con Đường', desc: 'Hành trình phía trước' },
    { src: 'photos/park-path.jpg', title: 'Tháp Cổ', desc: 'Ánh trăng huyền ảo' }
];

let currentLightboxIndex = 0;

function initLightbox() {
    const thumbsContainer = document.getElementById('lightboxThumbs');
    
    // Create thumbnails
    galleryData.forEach((item, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'lightbox-thumb';
        thumb.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
        thumb.addEventListener('click', () => goToSlide(index));
        thumbsContainer.appendChild(thumb);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    goToSlide(index);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = galleryData.length - 1;
    if (currentLightboxIndex >= galleryData.length) currentLightboxIndex = 0;
    goToSlide(currentLightboxIndex);
}

function goToSlide(index) {
    currentLightboxIndex = index;
    const item = galleryData[index];
    
    document.getElementById('lightboxImg').src = item.src;
    document.getElementById('lightboxTitle').textContent = item.title;
    document.getElementById('lightboxDesc').textContent = item.desc;
    
    // Update thumbnails
    document.querySelectorAll('.lightbox-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.gallery-item, .social-card').forEach(el => {
        observer.observe(el);
    });
}

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    this.style.transform = 'rotate(360deg) scale(1.2)';
    setTimeout(() => {
        this.style.transform = '';
    }, 400);
});

// Ripple Effect on Social Cards
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to { transform: scale(1); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

// Magnetic Effect on Gallery Cards
document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translateY(-10px) scale(1.02) rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        triggerConfetti();
    }
});

function triggerConfetti() {
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#6c5ce7', '#00d9ff'];
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -20px;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                pointer-events: none;
                z-index: 10001;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall ${Math.random() * 2 + 2}s ease-out forwards;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 20);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(${Math.random() * 720}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    document.querySelectorAll('.floating-shape').forEach((shape, i) => {
        const speed = (i + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add social card particle effect on hover
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const particles = this.querySelector('.card-particles');
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const particle = document.createElement('span');
                particle.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: particleFloat 1s ease-out forwards;
                `;
                particles.appendChild(particle);
                setTimeout(() => particle.remove(), 1000);
            }, i * 50);
        }
    });
});

const particleFloatStyle = document.createElement('style');
particleFloatStyle.textContent = `
    @keyframes particleFloat {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2) translateY(-30px); opacity: 0; }
    }
`;
document.head.appendChild(particleFloatStyle);
