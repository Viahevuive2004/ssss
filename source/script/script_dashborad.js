document.addEventListener('DOMContentLoaded', function() {

    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const mainContent = document.querySelector('.main-content');
    const allDashboardSections = document.querySelectorAll('.dashboard-section');
    const sidebarLinks = document.querySelectorAll('.sidebar .main-nav a');

    // --- Sidebar Toggle ---
    if (menuToggle && sidebar && mainContent) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('sidebar-collapsed');
        });
    }

     // Close sidebar on smaller screens when clicking outside
     document.addEventListener('click', function(event) {
        if (window.innerWidth < 768 && sidebar && !sidebar.classList.contains('collapsed')) {
             const isClickInsideSidebar = sidebar.contains(event.target);
             const isClickOnMenuToggle = menuToggle ? menuToggle.contains(event.target) : false;

             if (!isClickInsideSidebar && !isClickOnMenuToggle) {
                 sidebar.classList.add('collapsed');
                 mainContent.classList.add('sidebar-collapsed');
             }
        }
     });


    // --- Main Navigation (Section Switching) ---
    function setActiveSection(targetId) {
        // Remove active class from all sections and sidebar links
        allDashboardSections.forEach(section => section.classList.remove('active'));
        sidebarLinks.forEach(link => link.parentElement.classList.remove('active'));

        // Add active class to the target section
        const targetSection = document.getElementById(targetId.substring(1)); // Remove #
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Add active class to the corresponding sidebar link
        const targetLink = document.querySelector(`.sidebar .main-nav a[href="${targetId}"]`);
        if (targetLink) {
            targetLink.parentElement.classList.add('active');
        }

         // Close sidebar on mobile after click (optional)
         if (window.innerWidth < 768 && sidebar && !sidebar.classList.contains('collapsed')) {
            // Timeout allows potential transition to finish before hiding
            // setTimeout(() => {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('sidebar-collapsed');
            // }, 150);
         }
    }

    // Event listener for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');

            // Check if it's an internal anchor link
            if (targetId && targetId.startsWith('#')) {
                event.preventDefault(); // Prevent default anchor jump
                setActiveSection(targetId);
                // Optionally update URL hash
                // window.location.hash = targetId;
            }
            // Allow normal navigation for external links or other types
        });
    });

    // Activate section based on URL hash on page load
    if (window.location.hash) {
        setActiveSection(window.location.hash);
    } else {
        // Optionally activate the first section if no hash
        // setActiveSection('#tongquan'); // Already handled by adding 'active' in HTML
    }


    // --- Settings Page Sub-Navigation ---
    const settingsNavLinks = document.querySelectorAll('.settings-nav-list a');
    const settingsContentSections = document.querySelectorAll('.settings-content-section');

    if (settingsNavLinks.length > 0 && settingsContentSections.length > 0) {
        settingsNavLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');

                if (targetId && targetId.startsWith('#')) {
                    event.preventDefault(); // Prevent default for internal links

                    const targetContentId = targetId + '-content'; // e.g., #personal-info-content
                    const targetContent = document.getElementById(targetContentId);

                    // Update active state for settings nav links
                    document.querySelectorAll('.settings-nav-list li.active').forEach(li => li.classList.remove('active'));
                    this.parentElement.classList.add('active');

                    // Hide all settings content sections first
                    settingsContentSections.forEach(section => section.classList.remove('active'));

                    // Show the target settings content section
                    if (targetContent) {
                        targetContent.classList.add('active');
                    } else {
                         // Handle cases like Logout or missing content
                         if (targetId === '#logout') {
                             alert('Xử lý đăng xuất!');
                             // window.location.href = '/logout';
                         }
                         console.warn("Settings content section not found for:", targetId);
                    }
                }
                 // Allow normal navigation if href doesn't start with #
            });
        });

        // Activate the first settings tab initially if needed
        const firstActiveSettingsLink = document.querySelector('.settings-nav-list li.active a');
        if(firstActiveSettingsLink){
             const initialTargetId = firstActiveSettingsLink.getAttribute('href');
             const initialTargetContent = document.getElementById(initialTargetId.substring(1) + '-content');
             settingsContentSections.forEach(section => section.classList.remove('active')); // Ensure others are hidden
             if(initialTargetContent) initialTargetContent.classList.add('active');
        }
    }

    // --- Placeholder Date/Time Picker Interaction ---
    // IMPORTANT: Replace with a real JS library
    const calendarDays = document.querySelectorAll('.calendar-grid span:not(:nth-child(-n+7))');
    const pickerDisplay = document.querySelector('.picker-display');
    const hiddenDateTimeField = document.getElementById('appointment-datetime-lk'); // Use unique ID

    if (calendarDays.length > 0 && pickerDisplay && hiddenDateTimeField) {
        calendarDays.forEach(day => {
            day.addEventListener('click', function() {
                document.querySelectorAll('.calendar-grid span.selected').forEach(el => el.classList.remove('selected'));
                this.classList.add('selected');
                const dayNumber = this.textContent;
                const monthYear = "Tháng 4, năm 2025"; // Hardcoded
                const dayOfWeek = "Chủ nhật"; // Hardcoded
                const selectedDate = `${dayOfWeek}, ngày ${dayNumber}, ${monthYear}`;
                pickerDisplay.textContent = selectedDate;
                // Update hidden input (needs proper formatting)
                // hiddenDateTimeField.value = `2025-04-${dayNumber.padStart(2,'0')}T08:00`; // Example
                console.log("Selected Date (Placeholder):", selectedDate);
            });
        });
    }

    // --- Placeholder Form Submission ---
    const appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(event) {
             console.log('Form submitted (placeholder)');
             event.preventDefault(); // Prevent actual submission for demo
        });
    }

    console.log("Dashboard Initialized.");

    // Tối ưu hiệu suất cho biểu đồ
    // Chỉ tạo biểu đồ khi phần tử đang hiển thị
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    function showActiveSection() {
        const hash = window.location.hash || '#tongquan';
        
        sections.forEach(section => {
            if('#' + section.id === hash) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        
        navLinks.forEach(link => {
            if(link.getAttribute('href') === hash) {
                link.parentElement.classList.add('active');
            } else {
                link.parentElement.classList.remove('active');
            }
        });
    }
    
    // Khởi tạo lại kích thước biểu đồ khi resize cửa sổ
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if(window.Chart) {
                Chart.instances.forEach(chart => {
                    chart.resize();
                });
            }
        }, 250);
    });
    
    showActiveSection();
    window.addEventListener('hashchange', showActiveSection);

}); // End DOMContentLoaded