$content = Get-Content index.html -Raw -Encoding UTF8

# Xóa 2 dự án thừa bằng cách tìm và thay thế
$pattern = '(?s)(<span class="tag">javascript</span>\s*</div>\s*</div>\s*</div>)\s*<div class="project-card">.*?</div>\s*</div>\s*<div class="project-card">.*?</div>\s*</div>'
$replacement = '$1'
$content = $content -replace $pattern, $replacement

# Cập nhật mô tả dự án
$content = $content -replace '\[Mô tả ngắn gọn về dự án, công nghệ sử dụng, vai trò của bạn\]', 'Website đặt vé xem phim trực tuyến với giao diện hiện đại. Dự án được thực hiện trong kỳ học tại FPT Polytechnic, bao gồm các tính năng: đăng ký/đăng nhập, tìm kiếm phim, đặt vé, thanh toán online, và quản lý admin.'

# Cập nhật tags
$content = $content -replace '<span class="tag">php</span>', '<span class="tag">PHP</span>'
$content = $content -replace '<span class="tag">html/css</span>', '<span class="tag">HTML/CSS</span>'
$content = $content -replace '<span class="tag">javascript</span>', '<span class="tag">JavaScript</span>'

# Thêm MySQL tag
$content = $content -replace '(<span class="tag">JavaScript</span>)', '$1`n                <span class="tag">MySQL</span>'

# Lưu file
$content | Set-Content index.html -Encoding UTF8

Write-Host "Đã cập nhật file thành công!"
