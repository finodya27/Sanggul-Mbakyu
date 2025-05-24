// Main JavaScript for Sanggul Mbakyu Website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    // Mobile navigation
    initMobileNav();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Scroll animations
    initScrollAnimations();
    
    // Header scroll effect
    initHeaderScrollEffect();
    
    // Product filters (if on products page)
    if (document.querySelector('.products-filters')) {
        initProductFilters();
    }
    
    // Search functionality
    initSearchFunctionality();
    
    // Quick view functionality
    initQuickView();
    
    // Loading animations
    initLoadingAnimations();
    
    // Form validations
    initFormValidations();
}

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.scroll-animate, .product-card, .feature, .testimonial-card');
    
    animateElements.forEach(el => {
        if (!el.classList.contains('scroll-animate')) {
            el.classList.add('scroll-animate');
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Product Filters
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide products based on filter
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category') || 'all';
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput) {
        // Search on input
        searchInput.addEventListener('input', performSearch);
        
        // Search on button click
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }
        
        // Search on enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        productCards.forEach(card => {
            const productName = card.querySelector('.product-name');
            const productText = productName ? productName.textContent.toLowerCase() : '';
            
            if (searchTerm === '' || productText.includes(searchTerm)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Show message if no results
        let noResults = document.querySelector('.no-results');
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.classList.add('no-results', 'text-center', 'mt-3');
            const productsSection = document.querySelector('.products-section');
            if (productsSection) {
                productsSection.appendChild(noResults);
            }
        }
        noResults.textContent = visibleCount === 0 && searchTerm !== '' ? 'Tidak ada produk ditemukan.' : '';
    }
}

// Quick View Functionality
function initQuickView() {
    const quickViewButtons = document.querySelectorAll('.btn-quick-view');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productRating = productCard.querySelector('.product-rating').innerHTML;
            
            // Create modal
            const modal = document.createElement('div');
            modal.classList.add('quick-view-modal');
            modal.innerHTML = `
                <div class="quick-view-content">
                    <button class="close-modal" aria-label="Tutup modal"><i class="fas fa-times"></i></button>
                    <div class="quick-view-image">
                        <div class="product-img-placeholder">
                            <i class="fas fa-crown"></i>
                        </div>
                    </div>
                    <div class="quick-view-info">
                        <h2>${productName}</h2>
                        <p class="product-price">${productPrice}</p>
                        <div class="product-rating">${productRating}</div>
                        <p class="quick-view-description">Deskripsi produk: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button class="btn btn-primary">Tambah ke Keranjang</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';

            // Close modal
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                modal.remove();
                document.body.style.overflow = '';
            });

            // Close on click outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    document.body.style.overflow = '';
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', function handler(e) {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.body.style.overflow = '';
                    document.removeEventListener('keydown', handler);
                }
            });
        });
    });
}

// Loading Animations
function initLoadingAnimations() {
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn, .btn-quick-view, .search-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('btn-quick-view')) {
                this.classList.add('loading');
                this.disabled = true;
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 1000);
            }
        });
    });
}

// Form Validations
function initFormValidations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    const errorMsg = document.createElement('span');
                    errorMsg.classList.add('error-message');
                    errorMsg.textContent = 'Kolom ini wajib diisi';
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        input.parentNode.appendChild(errorMsg);
                    }
                } else {
                    input.classList.remove('error');
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                        input.nextElementSibling.remove();
                    }
                }
            });
            
            if (isValid) {
                alert('Formulir berhasil dikirim!');
                form.reset();
            }
        });
    });
}

// Add scrolled class to header for styling
document.querySelector('.header').classList.add('scrolled');