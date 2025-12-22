// Authentication System
const AUTH_KEY = 'vanlinh_auth';
const USERS_KEY = 'vanlinh_users';
const SITE_DATA_KEY = 'vanlinh_site_data';

// Admin credentials (hashed for security)
const ADMIN_EMAIL = 'nguyenvanlinh25062006@gmail.com';
const ADMIN_PASSWORD = 'VanLinh2506';

// Initialize default data
function initSiteData() {
    if (!localStorage.getItem(SITE_DATA_KEY)) {
        const defaultData = {
            profile: {
                name: 'Van Linh',
                avatar: 'VanLinh.jpg',
                bio: 'Passionate about creating beautiful & functional code ✨',
                status: 'Available for hire',
                skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
                stats: { commits: 1500, projects: 50, coffees: 999 }
            },
            gallery: [
                { src: 'photos/sunset-village.jpg', title: 'Hoàng Hôn Làng Quê', desc: 'Vẻ đẹp bình yên', category: 'nature' },
                { src: 'photos/lanterns.jpg', title: 'Phố Cổ', desc: 'Nét đẹp truyền thống', category: 'city' },
                { src: 'photos/red-flags.jpg', title: 'Đèn Lồng Hội An', desc: 'Lung linh đêm phố cổ', category: 'night' },
                { src: 'photos/lake-reflection.jpg', title: 'Bình Minh', desc: 'Khởi đầu ngày mới', category: 'city' },
                { src: 'photos/night-park.jpg', title: 'Nắng Chiều', desc: 'Ánh nắng vàng ấm áp', category: 'city' },
                { src: 'photos/morning-sun.jpg', title: 'Đêm Yên Bình', desc: 'Ánh đèn thành phố', category: 'night' },
                { src: 'photos/pagoda.jpg', title: 'Mặt Hồ Tĩnh Lặng', desc: 'Phản chiếu bầu trời', category: 'nature' },
                { src: 'photos/sunset-city.jpg', title: 'Con Đường', desc: 'Hành trình phía trước', category: 'nature' },
                { src: 'photos/park-path.jpg', title: 'Tháp Cổ', desc: 'Ánh trăng huyền ảo', category: 'night' }
            ],
            social: [
                { platform: 'tiktok', name: 'TikTok', username: '@vanlinh', url: 'https://www.tiktok.com/@vanlinh20225', action: 'Follow' },
                { platform: 'facebook', name: 'Facebook', username: 'Van Linh', url: 'https://www.facebook.com/van.linh.983706', action: 'Add Friend' },
                { platform: 'instagram', name: 'Instagram', username: '@vanlinh', url: 'https://www.instagram.com/vanlinh2506_/', action: 'Follow' },
                { platform: 'youtube', name: 'YouTube', username: 'Van Linh Channel', url: 'https://www.youtube.com/@xinux8190', action: 'Subscribe' },
                { platform: 'telegram', name: 'Telegram', username: '@vanlinh', url: '#', action: 'Message' },
                { platform: 'zalo', name: 'Zalo', username: 'Van Linh', url: 'https://zaloapp.com/qr/p/nkz87u9tltsg', action: 'Chat' },
                { platform: 'threads', name: 'Threads', username: '@vanlinh', url: 'https://www.threads.com/@vanlinh2506_', action: 'Follow' },
                { platform: 'github', name: 'GitHub', username: '@vanlinh', url: 'https://github.com/VanLinh2506', action: 'Follow' }
            ]
        };
        localStorage.setItem(SITE_DATA_KEY, JSON.stringify(defaultData));
    }
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }
}

// Get site data
function getSiteData() {
    initSiteData();
    return JSON.parse(localStorage.getItem(SITE_DATA_KEY));
}

// Save site data
function saveSiteData(data) {
    localStorage.setItem(SITE_DATA_KEY, JSON.stringify(data));
}


// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) !== null;
}

// Check if current user is admin
function isAdmin() {
    const auth = JSON.parse(localStorage.getItem(AUTH_KEY));
    return auth && auth.email === ADMIN_EMAIL;
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
}

// Login function
function login(email, password) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const user = { email, name: 'Admin', isAdmin: true };
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        return { success: true, isAdmin: true };
    }
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ email: user.email, name: user.name, isAdmin: false }));
        return { success: true, isAdmin: false };
    }
    
    return { success: false, message: 'Email hoặc mật khẩu không đúng!' };
}

// Register function
function register(name, email, password) {
    if (email === ADMIN_EMAIL) {
        return { success: false, message: 'Email này đã được sử dụng!' };
    }
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Email này đã được đăng ký!' };
    }
    
    users.push({ name, email, password, createdAt: new Date().toISOString() });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return { success: true, message: 'Đăng ký thành công!' };
}

// Logout function
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'index.html';
}

// Show auth modal
function showAuthModal(type = 'login') {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('active');
        switchAuthTab(type);
    }
}

// Hide auth modal
function hideAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Switch between login and register tabs
function switchAuthTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    }
}

// Handle login form submit
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const result = login(email, password);
    
    if (result.success) {
        hideAuthModal();
        if (result.isAdmin) {
            window.location.href = 'admin.html';
        } else {
            updateAuthUI();
            showNotification('Đăng nhập thành công!', 'success');
        }
    } else {
        showNotification(result.message, 'error');
    }
}

// Handle register form submit
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
        return;
    }
    
    const result = register(name, email, password);
    
    if (result.success) {
        showNotification(result.message, 'success');
        switchAuthTab('login');
        document.getElementById('loginEmail').value = email;
    } else {
        showNotification(result.message, 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update UI based on auth state
function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    const adminBtn = document.getElementById('adminBtn');
    
    if (isLoggedIn()) {
        const user = getCurrentUser();
        if (authBtn) {
            authBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> <span>Đăng xuất</span>`;
            authBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                logout();
            };
            authBtn.title = 'Đăng xuất';
        }
        if (adminBtn && isAdmin()) {
            adminBtn.style.display = 'flex';
            adminBtn.onclick = function(e) {
                e.stopPropagation();
                window.location.href = 'admin.html';
            };
        }
    } else {
        if (authBtn) {
            authBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> <span>Đăng nhập</span>';
            authBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                showAuthModal('login');
            };
            authBtn.title = 'Đăng nhập';
        }
        if (adminBtn) {
            adminBtn.style.display = 'none';
        }
    }
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    initSiteData();
    updateAuthUI();
});
