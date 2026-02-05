// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Lấy dữ liệu form
        const formData = new FormData(contactForm);
        
        // Ở đây bạn có thể thêm code để gửi email hoặc lưu vào database
        // Ví dụ: sử dụng EmailJS, FormSpree, hoặc backend API của bạn
        
        alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
        contactForm.reset();
    });
}

// Section animation removed to prevent glassmorphism issues
// Cards will appear normally without fade animation

// Ensure skill cards are always visible
document.addEventListener('DOMContentLoaded', () => {
  const skillCards = document.querySelectorAll('.skill-category');
  skillCards.forEach(card => {
    card.style.opacity = '1';
    card.style.visibility = 'visible';
  });
});

// Background Toggle
const bgToggle = document.getElementById('bgToggle');
if (bgToggle) {
  bgToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });
}


// Floating Contact Button Toggle
const contactToggle = document.getElementById('contactToggle');
const contactMenu = document.getElementById('contactMenu');

if (contactToggle && contactMenu) {
  contactToggle.addEventListener('click', () => {
    contactToggle.classList.toggle('active');
    contactMenu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.floating-contact')) {
      contactToggle.classList.remove('active');
      contactMenu.classList.remove('active');
    }
  });
}
