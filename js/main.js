// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');
    const menuBars = document.querySelectorAll('.header__menu-bar');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            const isOpen = nav.classList.contains('header__nav--open');
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
        
        function openMenu() {
            nav.classList.add('header__nav--open');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuBars.forEach((bar, index) => {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            });
        }
        
        function closeMenu() {
            nav.classList.remove('header__nav--open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuBars.forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        }
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu after clicking
                closeMenu();
            }
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(this);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
    
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Email validation
        const emailField = form.querySelector('#email');
        if (emailField && !validateEmail(emailField.value)) {
            showError(emailField, 'Пожалуйста, введите корректный email адрес');
            isValid = false;
        }
        
        if (isValid) {
            // Form submission would go here
            alert('Форма успешно отправлена! (В демонстрационных целях)');
            form.reset();
        }
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        
        if (field.hasAttribute('required') && !value) {
            showError(field, getFieldErrorMessage(fieldName, 'required'));
            return false;
        }
        
        if (field.type === 'email' && value && !validateEmail(value)) {
            showError(field, 'Пожалуйста, введите корректный email адрес');
            return false;
        }
        
        clearError(field);
        return true;
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(field, message) {
        clearError(field);
        field.classList.add('form-input--error');
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearError(field) {
        field.classList.remove('form-input--error');
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    function getFieldErrorMessage(fieldName, errorType) {
        const messages = {
            name: {
                required: 'Пожалуйста, введите ваше имя'
            },
            email: {
                required: 'Пожалуйста, введите ваш email'
            },
            message: {
                required: 'Пожалуйста, введите ваше сообщение'
            }
        };
        
        return messages[fieldName]?.[errorType] || 'Это поле обязательно для заполнения';
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
// Dark theme functionality removed as requested
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    }
});