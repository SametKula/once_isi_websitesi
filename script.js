$(document).ready(function() {
    // Create slider images
    const slider = document.querySelector('.slider');
    const images = [
        'images/2.jpeg',
        'images/3.jpeg',
        'images/4.jpeg',
        'images/5.jpeg',
        'images/6.jpeg',
        'images/7.jpeg',
        'images/8.jpeg',
        'images/9.jpeg',
        'images/10.jpeg',
        'images/11.jpeg',
        'images/12.jpeg',
        'images/13.jpeg',
        'images/15.jpeg',
    ];
    images.forEach((image) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const img = document.createElement('img');
        img.src = image;
        img.alt = image;
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
                    src: thumb.attr('src'),
                    controls: true,
                    autoplay: true,
                    loop: true,
                }).prop('muted', true);
            } else {
                mainItem = $('<img>', {
                    src: thumb.attr('src'),
                    alt: thumb.attr('alt')
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
