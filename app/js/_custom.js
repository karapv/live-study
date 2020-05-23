'use strict';
document.addEventListener("DOMContentLoaded", function() {
    //Lazy Load
    let lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });
    lazyLoadInstance.update();
    //Scroll
    const scrollTo = (elem,attr) => {
        $(elem).on("click", function () {
            let anchor = $(this).attr(attr);
            console.log(anchor);
            $('html, body').stop().animate({
                scrollTop: $('#'+anchor).offset().top - 60
            }, 1500);
        });
    };
    //Submenu settings
    $('.sub-menu').parent().append('<span class="fas fa-chevron-right toggle-btn"></span>');
    $('.toggle-btn').click(function () {
        $(this).toggleClass('active');
        $(this).siblings('.sub-menu').fadeToggle('slow');
    });
    //Video slider
    $('.video-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<span class="fas fa-chevron-left btn slider-btn slider-btn-left"></span>',
        nextArrow: '<span class="fas fa-chevron-right btn slider-btn  slider-btn-right"></span>',
        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 880,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });
    //Footer nav
    $('.footer-menu-item').prepend('<i class="fas fa-plus"></i>');
    //Header nav
    $('.toggle-nav').click(function () {
        $(this).toggleClass('active');
        $('.header-bottom').fadeToggle('slow');
    })
});

