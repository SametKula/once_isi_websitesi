$(document).ready(function() {
    // Create slider images
    const slider = document.querySelector('.slider');
    const images = [
        'images/2.webp',
        'images/3.webp',
        'images/4.webp',
        'images/5.webp',
        'images/6.webp',
        'images/7.webp',
        'images/8.webp',
        'images/9.webp',
        'images/10.webp',
        'images/11.webp',
        'images/12.webp',
        'images/13.webp',
        'images/15.webp',
    ];
    images.forEach((image) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const img = document.createElement('img');
        img.src = image;
        img.alt = image;
        img.loading = "lazy";
        img.fetchpriority = "high";
        img.decoding = "async";
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = "cover"
        slide.appendChild(img);
        slider.appendChild(slide);
    });

    // Slider functionality
    let currentSlide = 1;
    const slides = $('.slide');
    const slideCount = slides.length;

    function showSlide(index) {
        slides.removeClass('active');
        slides.eq(index).addClass('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    }

    // Auto slide every 5 seconds
    setInterval(nextSlide, 20000);

    // Button controls
    $('.next').click(nextSlide);
    $('.prev').click(prevSlide);

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        const target = $(this.getAttribute('href'));
        
        if(target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 60
            }, 500);
        }
    });

    // Gallery functionality
    const galleryMain = $('.gallery-main');
    const thumbs = $('.gallery-thumbs .thumb');
    let currentGalleryIndex = 0;

    function showGalleryItem(index) {
        const thumb = thumbs.eq(index);
        const isVideo = thumb.is('video');
        
        galleryMain.fadeOut(300, function() {
            galleryMain.empty();
            
            let mainItem;
            if (isVideo) {
                mainItem = $('<video>', {
                    class: 'thumb mx-auto d-block',
                    loading: 'lazy',
                    preload: 'none',
                    height: '100%',
                    muted: true,
                    autoplay: true,
                    loop: true,
                    playsInline: true,
                }).html(`<source src="${thumb.attr('src')}" type="video/webm">`).on('play', function() {
                    this.muted = true;
                });
            } else {
                mainItem = $('<img>', {
                    src: thumb.attr('src'),
                    alt: thumb.attr('alt'),
                    loading: 'eager',
                    fetchpriority: 'high',
                    decoding: 'async'
                });
            }
            
            galleryMain.append(mainItem).fadeIn(300);
        });
        
        thumbs.removeClass('active');
        thumb.addClass('active');
        currentGalleryIndex = index;
    }

    function nextGalleryImage() {
        const nextIndex = (currentGalleryIndex + 1) % thumbs.length;
        showGalleryItem(nextIndex);
    }

    function prevGalleryImage() {
        const prevIndex = (currentGalleryIndex - 1 + thumbs.length) % thumbs.length;
        showGalleryItem(prevIndex);
    }

    // Thumbnail click handlers
    thumbs.click(function() {
        const index = thumbs.index(this);
        showGalleryItem(index);
    });

    // Gallery navigation buttons
    $('.gallery-next').click(nextGalleryImage);
    $('.gallery-prev').click(prevGalleryImage);

    // Auto advance gallery every 8 seconds
    setInterval(nextGalleryImage, 8000);

    // Initialize first gallery item
    showGalleryItem(0);
});
