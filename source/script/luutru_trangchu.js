// Xử lý DOM sau khi trang đã tải
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo hiệu ứng
    initFadeEffects();
    
    // Xử lý menu mobile
    setupMobileMenu();
});

// Xử lý page loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
});

// Khởi tạo hiệu ứng fade-in
function initFadeEffects() {
    // Thêm class fade-in vào các phần tử
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
    });
    document.querySelectorAll('.feature-item, .service-card, .info-item').forEach(item => {
        item.classList.add('fade-in');
    });
    
    // Kiểm tra các phần tử có trong viewport
    checkVisibility();
    
    // Thêm sự kiện cuộn
    window.addEventListener('scroll', checkVisibility);
}

// Kiểm tra phần tử có trong viewport
function checkVisibility() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        if (position < windowHeight - 50) {
            element.classList.add('visible');
        }
    });
}

// Thiết lập menu trên điện thoại
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Xử lý đóng menu khi click vào liên kết
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
        });
    });
}