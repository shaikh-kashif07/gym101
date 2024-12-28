// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize all major functionality
    initializeNavigation();
    initializeClassFilters();
    initializeTestimonialSlider();
    initializeContactForm();
    initializeAnimations();
    initializeMembershipButtons();
}

// Navigation functionality
function initializeNavigation() {
    const nav = document.getElementById('mainNav');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect for navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// Class filtering system
function initializeClassFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const classCards = document.querySelectorAll('.class-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter classes
            const filter = button.getAttribute('data-filter');
            classCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 500);
                }
            });
        });
    });
}

// Testimonials slider
function initializeTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let isAnimating = false;
    let autoPlayInterval;

    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        // Hide all slides
        testimonialCards.forEach(card => {
            card.style.opacity = '0';
            card.style.display = 'none';
        });

        // Show current slide
        testimonialCards[index].style.display = 'block';
        setTimeout(() => {
            testimonialCards[index].style.opacity = '1';
            isAnimating = false;
        }, 50);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentSlide);
    }

    // Initialize slider controls
    nextBtn.addEventListener('click', () => {
        clearInterval(autoPlayInterval);
        nextSlide();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoPlayInterval);
        prevSlide();
        startAutoPlay();
    });

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    // Initialize first slide and auto-play
    showSlide(currentSlide);
    startAutoPlay();
}

// Contact form validation and handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validation rules
        const validation = {
            name: value => value.length >= 2,
            email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: value => /^\d{10}$/.test(value.replace(/\D/g, '')),
            message: value => value.length >= 10
        };

        // Error messages
        const errorMessages = {
            name: 'Please enter a valid name (minimum 2 characters)',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid 10-digit phone number',
            message: 'Please enter a message (minimum 10 characters)'
        };

        // Validate each field
        let isValid = true;
        for (const [field, value] of Object.entries(formData)) {
            if (!validation[field](value)) {
                alert(errorMessages[field]);
                isValid = false;
                break;
            }
        }

        if (isValid) {
            // Here you would typically send the data to a server
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        }
    });
}

// Animation system
function initializeAnimations() {
    const animatedElements = document.querySelectorAll(
        '.trainer-card, .class-card, .plan-card, .testimonial-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Membership plan handling
function initializeMembershipButtons() {
    const planButtons = document.querySelectorAll('.plan-button');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.closest('.plan-card').querySelector('h3').textContent;
            
            // Show confirmation modal (you would typically implement a proper modal here)
            const confirmed = confirm(`Would you like to proceed with the ${planName} plan?`);
            
            if (confirmed) {
                // Here you would typically redirect to a signup/payment page
                alert(`Thank you for choosing the ${planName} plan! We'll redirect you to complete your membership.`);
            }
        });
    });
}

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

// Handle window resize events
window.addEventListener('resize', debounce(() => {
    // Reinitialize any size-dependent functionality
    if (window.innerWidth <= 768) {
        // Mobile-specific adjustments
    } else {
        // Desktop-specific adjustments
    }
}, 250));

// Initialize everything when the page loads
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.remove('loading');
});