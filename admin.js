// Admin Panel JavaScript

// Check admin access
document.addEventListener('DOMContentLoaded', () => {
    if (!isLoggedIn() || !isAdmin()) {
        window.location.href = 'index.html';
        return;
    }
    
    initAdmin();
});

// Initialize admin panel
function initAdmin() {
    loadDashboard();
    loadProfile();
    loadGallery();
    loadSocialLinks();
    initNavigation();
    
    const user = getCurrentUser();
    document.getElementById('adminName').textContent = user.name || 'Admin';
}

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.getElementById(section + 'Section').classList.add('active');
            
            document.getElementById('pageTitle').textContent = item.querySelector('span').textContent;
        });
    });
}

// Toggle sidebar
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
}

// Load Dashboard
function loadDashboard() {
    const data = getSiteData();
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    document.getElementById('totalPhotos').textContent = data.gallery.length;
    document.getElementById('totalSocial').textContent = data.social.length;
    document.getElementById('totalUsers').textContent = users.length;
}

// Load Profile
function loadProfile() {
    const data = getSiteData();
    const profile = data.profile;
    
    document.getElementById('profileName').value = profile.name || '';
    document.getElementById('profileBio').value = profile.bio || '';
    document.getElementById('profileStatus').value = profile.status || '';
    document.getElementById('profileSkills').value = (profile.skills || []).join(', ');
    document.getElementById('statCommits').value = profile.stats?.commits || 0;
    document.getElementById('statProjects').value = profile.stats?.projects || 0;
    document.getElementById('statCoffees').value = profile.stats?.coffees || 0;
    
    if (profile.avatar) {
        document.getElementById('avatarPreview').src = profile.avatar;
        document.getElementById('headerAvatar').src = profile.avatar;
    }
}

// Preview avatar
function previewAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('avatarPreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Save Profile
function saveProfile(event) {
    event.preventDefault();
    
    const data = getSiteData();
    data.profile.name = document.getElementById('profileName').value;
    data.profile.bio = document.getElementById('profileBio').value;
    data.profile.status = document.getElementById('profileStatus').value;
    data.profile.skills = document.getElementById('profileSkills').value.split(',').map(s => s.trim()).filter(s => s);
    data.profile.stats = {
        commits: parseInt(document.getElementById('statCommits').value) || 0,
        projects: parseInt(document.getElementById('statProjects').value) || 0,
        coffees: parseInt(document.getElementById('statCoffees').value) || 0
    };
    
    // Handle avatar (base64 for demo, in production use file upload)
    const avatarPreview = document.getElementById('avatarPreview');
    if (avatarPreview.src.startsWith('data:')) {
        data.profile.avatar = avatarPreview.src;
    }
    
    saveSiteData(data);
    showNotification('Đã lưu thông tin cá nhân!', 'success');
}


// Load Gallery
function loadGallery() {
    const data = getSiteData();
    const grid = document.getElementById('galleryAdminGrid');
    
    grid.innerHTML = data.gallery.map((photo, index) => `
        <div class="gallery-admin-item">
            <img src="${photo.src}" alt="${photo.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            <div class="gallery-admin-info">
                <h4>${photo.title}</h4>
                <p>${photo.desc}</p>
                <span class="category-badge">${photo.category}</span>
            </div>
            <div class="gallery-admin-actions">
                <button class="btn-icon edit" onclick="editPhoto(${index})" title="Sửa">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete" onclick="confirmDeletePhoto(${index})" title="Xóa">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Show Add Photo Modal
function showAddPhotoModal() {
    document.getElementById('photoModalTitle').textContent = 'Thêm ảnh mới';
    document.getElementById('photoIndex').value = -1;
    document.getElementById('photoForm').reset();
    document.getElementById('photoModal').classList.add('active');
}

// Edit Photo
function editPhoto(index) {
    const data = getSiteData();
    const photo = data.gallery[index];
    
    document.getElementById('photoModalTitle').textContent = 'Chỉnh sửa ảnh';
    document.getElementById('photoIndex').value = index;
    document.getElementById('photoSrc').value = photo.src;
    document.getElementById('photoTitle').value = photo.title;
    document.getElementById('photoDesc').value = photo.desc;
    document.getElementById('photoCategory').value = photo.category;
    
    document.getElementById('photoModal').classList.add('active');
}

// Hide Photo Modal
function hidePhotoModal() {
    document.getElementById('photoModal').classList.remove('active');
}

// Save Photo
function savePhoto(event) {
    event.preventDefault();
    
    const data = getSiteData();
    const index = parseInt(document.getElementById('photoIndex').value);
    
    const photo = {
        src: document.getElementById('photoSrc').value,
        title: document.getElementById('photoTitle').value,
        desc: document.getElementById('photoDesc').value,
        category: document.getElementById('photoCategory').value
    };
    
    if (index === -1) {
        data.gallery.push(photo);
        showNotification('Đã thêm ảnh mới!', 'success');
    } else {
        data.gallery[index] = photo;
        showNotification('Đã cập nhật ảnh!', 'success');
    }
    
    saveSiteData(data);
    loadGallery();
    loadDashboard();
    hidePhotoModal();
}

// Confirm Delete Photo
let deletePhotoIndex = -1;
function confirmDeletePhoto(index) {
    deletePhotoIndex = index;
    document.getElementById('confirmMessage').textContent = 'Bạn có chắc chắn muốn xóa ảnh này?';
    document.getElementById('confirmDeleteBtn').onclick = deletePhoto;
    document.getElementById('confirmModal').classList.add('active');
}

// Delete Photo
function deletePhoto() {
    if (deletePhotoIndex === -1) return;
    
    const data = getSiteData();
    data.gallery.splice(deletePhotoIndex, 1);
    saveSiteData(data);
    
    loadGallery();
    loadDashboard();
    hideConfirmModal();
    showNotification('Đã xóa ảnh!', 'success');
    deletePhotoIndex = -1;
}

// Load Social Links
function loadSocialLinks() {
    const data = getSiteData();
    const list = document.getElementById('socialAdminList');
    
    list.innerHTML = data.social.map((social, index) => `
        <div class="social-admin-item">
            <div class="social-admin-icon ${social.platform}">
                <i class="fab fa-${social.platform === 'zalo' ? '' : social.platform}"></i>
                ${social.platform === 'zalo' ? '<span class="zalo-icon">Z</span>' : ''}
            </div>
            <div class="social-admin-info">
                <h4>${social.name}</h4>
                <p>${social.username}</p>
                <a href="${social.url}" target="_blank" class="social-url">${social.url}</a>
            </div>
            <div class="social-admin-actions">
                <button class="btn-icon edit" onclick="editSocial(${index})" title="Sửa">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete" onclick="confirmDeleteSocial(${index})" title="Xóa">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Show Add Social Modal
function showAddSocialModal() {
    document.getElementById('socialModalTitle').textContent = 'Thêm liên kết MXH';
    document.getElementById('socialIndex').value = -1;
    document.getElementById('socialForm').reset();
    document.getElementById('socialModal').classList.add('active');
}

// Edit Social
function editSocial(index) {
    const data = getSiteData();
    const social = data.social[index];
    
    document.getElementById('socialModalTitle').textContent = 'Chỉnh sửa liên kết';
    document.getElementById('socialIndex').value = index;
    document.getElementById('socialPlatform').value = social.platform;
    document.getElementById('socialName').value = social.name;
    document.getElementById('socialUsername').value = social.username;
    document.getElementById('socialUrl').value = social.url;
    document.getElementById('socialAction').value = social.action;
    
    document.getElementById('socialModal').classList.add('active');
}

// Hide Social Modal
function hideSocialModal() {
    document.getElementById('socialModal').classList.remove('active');
}

// Save Social
function saveSocial(event) {
    event.preventDefault();
    
    const data = getSiteData();
    const index = parseInt(document.getElementById('socialIndex').value);
    
    const social = {
        platform: document.getElementById('socialPlatform').value,
        name: document.getElementById('socialName').value,
        username: document.getElementById('socialUsername').value,
        url: document.getElementById('socialUrl').value,
        action: document.getElementById('socialAction').value
    };
    
    if (index === -1) {
        data.social.push(social);
        showNotification('Đã thêm liên kết mới!', 'success');
    } else {
        data.social[index] = social;
        showNotification('Đã cập nhật liên kết!', 'success');
    }
    
    saveSiteData(data);
    loadSocialLinks();
    loadDashboard();
    hideSocialModal();
}

// Confirm Delete Social
let deleteSocialIndex = -1;
function confirmDeleteSocial(index) {
    deleteSocialIndex = index;
    document.getElementById('confirmMessage').textContent = 'Bạn có chắc chắn muốn xóa liên kết này?';
    document.getElementById('confirmDeleteBtn').onclick = deleteSocial;
    document.getElementById('confirmModal').classList.add('active');
}

// Delete Social
function deleteSocial() {
    if (deleteSocialIndex === -1) return;
    
    const data = getSiteData();
    data.social.splice(deleteSocialIndex, 1);
    saveSiteData(data);
    
    loadSocialLinks();
    loadDashboard();
    hideConfirmModal();
    showNotification('Đã xóa liên kết!', 'success');
    deleteSocialIndex = -1;
}

// Hide Confirm Modal
function hideConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
}
