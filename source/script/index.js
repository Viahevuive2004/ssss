// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo hiệu ứng fade-in
    initFadeEffects();
    
    // Thiết lập menu điện thoại
    setupMobileMenu();
    
    // Thiết lập cuộn mượt cho các liên kết
    setupSmoothScroll();
    
    // Xử lý form liên hệ
    setupContactForm();
});

// Xử lý page loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
});

// Cập nhật hàm initFadeEffects để thêm hiệu ứng cho feature-card
function initFadeEffects() {
    // Thêm class fade-in vào các phần tử
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    const items = document.querySelectorAll('.feature-card, .info-item, .about-content');
    items.forEach(item => {
        item.classList.add('fade-in');
    });
    
    // Thêm hiệu ứng hover cho feature-card
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
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
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        // Đóng menu khi click vào liên kết
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
            });
        });
    }
}

// Thiết lập cuộn mượt cho các liên kết
function setupSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Chỉ xử lý các liên kết đến id
            if (this.getAttribute('href').charAt(0) === '#') {
                const targetId = this.getAttribute('href');
                
                // Bỏ qua nếu là "#" (không có mục tiêu)
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Tính toán vị trí cuộn
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Xử lý form liên hệ
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy dữ liệu từ form
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // Hiển thị thông báo đơn giản (thực tế sẽ gửi dữ liệu đến server)
            alert('Cảm ơn ' + formData.name + '! Chúng tôi đã nhận được tin nhắn của bạn và sẽ liên hệ lại sớm.');
            
            // Reset form
            contactForm.reset();
        });
    }
}