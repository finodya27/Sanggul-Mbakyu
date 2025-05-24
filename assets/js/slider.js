// Testimonial Slider JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialSlider();
});

function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-btn.prev-btn');
    const nextBtn = document.querySelector('.slider-btn.next-btn');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentIndex = 0;
    let autoSlideInterval;

    // Show slide function
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });

        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000);
    }

    // Stop auto slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(currentIndex + 1);
            startAutoSlide();
        });
    }

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(currentIndex - 1);
            startAutoSlide();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Initialize
    showSlide(currentIndex);
    startAutoSlide();

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
}