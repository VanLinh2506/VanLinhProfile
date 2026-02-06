import re

# Đọc file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Tìm và xóa 2 dự án thừa (project 2 và 3)
# Tìm vị trí kết thúc của project 1
pattern = r'(</div>\s*</div>\s*<div class="project-card">.*?</div>\s*</div>\s*<div class="project-card">.*?</div>\s*</div>)(\s*</div>\s*</div>\s*</section>)'
replacement = r'\2'

# Tìm từ kết thúc project 1 đến trước Experience Section
project_section_pattern = r'(<div class="project-tags">.*?</div>\s*</div>\s*</div>)\s*<div class="project-card">.*?(<div class="project-card">.*?)?</div>\s*</div>\s*(</div>\s*</section>)'

# Thay thế
content = re.sub(project_section_pattern, r'\1\n        </div>\n      </div>\n    </section>', content, flags=re.DOTALL)

# Cập nhật mô tả dự án
content = content.replace('[Mô tả ngắn gọn về dự án, công nghệ sử dụng, vai trò của bạn]', 
                         'Website đặt vé xem phim trực tuyến với giao diện hiện đại. Dự án được thực hiện trong kỳ học tại FPT Polytechnic, bao gồm các tính năng: đăng ký/đăng nhập, tìm kiếm phim, đặt vé, thanh toán online, và quản lý admin.')

# Cập nhật tags
content = content.replace('<span class="tag">php</span>', '<span class="tag">PHP</span>')
content = content.replace('<span class="tag">html/css</span>', '<span class="tag">HTML/CSS</span>')
content = content.replace('<span class="tag">javascript</span>', '<span class="tag">JavaScript</span>')

# Thêm MySQL tag
content = content.replace('<span class="tag">JavaScript</span>\n              </div>',
                         '<span class="tag">JavaScript</span>\n                <span class="tag">MySQL</span>\n              </div>')

# Thêm Hobbies section trước Experience
hobbies_section = '''
    <!-- Hobbies Section -->
    <section id="hobbies" class="hobbies">
      <div class="container">
        <h2 class="section-title">Sở trường & Đam mê</h2>
        <p class="section-subtitle">Ngoài lập trình, mình còn yêu thích vẽ tranh và chụp ảnh</p>
        
        <div class="hobbies-tabs">
          <button class="hobby-tab active" data-tab="drawings">
            <i class="fas fa-palette"></i> Tranh vẽ
          </button>
          <button class="hobby-tab" data-tab="photos">
            <i class="fas fa-camera"></i> Nhiếp ảnh
          </button>
        </div>

        <div class="hobbies-content">
          <div class="hobby-gallery active" id="drawings">
            <div class="gallery-grid">
              <div class="gallery-item">
                <img src="img/drawing1.jpg" alt="Tranh vẽ 1" />
                <div class="gallery-overlay">
                  <h4>Phong cảnh</h4>
                </div>
              </div>
              <div class="gallery-item">
                <img src="img/drawing2.jpg" alt="Tranh vẽ 2" />
                <div class="gallery-overlay">
                  <h4>Chân dung</h4>
                </div>
              </div>
              <div class="gallery-item">
                <img src="img/drawing3.jpg" alt="Tranh vẽ 3" />
                <div class="gallery-overlay">
                  <h4>Trừu tượng</h4>
                </div>
              </div>
              <div class="gallery-item">
                <img src="img/drawing4.jpg" alt="Tranh vẽ 4" />
                <div class="gallery-overlay">
                  <h4>Anime</h4>
                </div>
              </div>
            </div>
          </div>

          <div class="hobby-gallery" id="photos">
            <div class="gallery-grid">
              <div class="gallery-item">
                <img src="img/photo1.jpg" alt="Ảnh chụp 1" />
                <div class="gallery-overlay">
                  <h4>Thiên nhiên</h4>
                </div>
              </div>
              <div class="gallery-item">
                <img src="img/photo2.jpg" alt="Ảnh chụp 2" />
                <div class="gallery-overlay">
                  <h4>Đường phố</h4>
                </div>
              </div>
              <div class="gallery-item">
                <img src="img/photo3.jpg" alt="Ảnh chụp 3" />
                <div class="gallery-overlay">
                  <h4>Kiến trúc</h4>
                </div>
              </div>
              <div class="gallery-item">
                <img src="img/photo4.jpg" alt="Ảnh chụp 4" />
                <div class="gallery-overlay">
                  <h4>Chân dung</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

'''

content = content.replace('    <!-- Experience Section -->', hobbies_section + '    <!-- Experience Section -->')

# Ghi lại file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Đã cập nhật file index.html thành công!")
