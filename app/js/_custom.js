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
    const submenuToggle = (button,item)=>{
        $(item).parent().append('<span class="fas fa-chevron-right toggle-btn"></span>');
        $(button).click(function () {
            $(this).toggleClass('active');
            $(this).siblings(item).fadeToggle('fast');
        });
        if($(window).width() > 990 && item === '.sub-menu') {
            $(item).parent().addClass('itsSubmenu');
            $('.itsSubmenu').mouseenter(function () {
                $(this).addClass('active');
                $(this).children(item).fadeIn('fast');
            });
            let parentClick = $(item).parent();
            parentClick.mouseleave(function () {
               $(this).removeClass('active');
               $(this).find(item).fadeOut('fast');
            });
        }
    };
    submenuToggle('.toggle-btn','.sub-menu');
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
    // Youtube
    if($('.youtube').length>0){
        $('.youtube').each(function () {
            let youtube_url = $(this).attr('data-youtube');
            youtube_url = youtube_url.replace('https://www.youtube.com/watch?v=','');
            $(this).attr('data-youtube',youtube_url);
        });

    }
    //Video preview
    if($('.youtube').length>0) {
        (function () {
            if (!document.getElementsByClassName) {
                // Поддержка IE8
                const getElementsByClassName = function (node, classname) {
                    const a = [];
                    let re = new RegExp('(^| )' + classname + '( |$)');
                    let els = node.getElementsByTagName("*");
                    for (let i = 0, j = els.length; i < j; i++)
                        if (re.test(els[i].className)) a.push(els[i]);
                    return a;
                };
                var videos = getElementsByClassName(document.body, "youtube");
            } else {
                var videos = document.querySelectorAll(".youtube");
            }
            let nb_videos = videos.length;
            for (let i = 0; i < nb_videos; i++) {
                // Находим постер для видео, зная ID нашего видео
                if (videos[i].getAttribute('data-youtube-img') !== '') {
                    videos[i].style.backgroundImage = 'url(' + videos[i].getAttribute('data-youtube-img') + ')';
                } else {
                    videos[i].style.backgroundImage = 'url(//i.ytimg.com/vi/' + videos[i].dataset.youtube + '/sddefault.jpg)';
                }
                // Размещаем над постером кнопку Play, чтобы создать эффект плеера
                const play = document.createElement("div"),
                    youtubeSettings = document.createElement('div');
                if (videos[i].getAttribute('data-youtube-text')) {
                    const youtubeText = document.createElement('div');
                    youtubeText.setAttribute('class', 'youtube-text');
                    youtubeText.textContent = videos[i].getAttribute('data-youtube-text');
                    youtubeSettings.appendChild(youtubeText);
                }
                play.setAttribute("class", "play");
                youtubeSettings.setAttribute('class', 'flex-container youtube-container');
                youtubeSettings.appendChild(play);
                videos[i].append(youtubeSettings);
                videos[i].onclick = function () {
                    // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
                    const iframe = document.createElement("iframe");
                    let iframe_url = "https://www.youtube.com/embed/" + videos[i].dataset.youtube + "?autoplay=1&autohide=1";
                    if (this.getAttribute("data-params")) iframe_url += '&' + this.getAttribute("data-params");
                    iframe.setAttribute("src", iframe_url);
                    iframe.setAttribute("frameborder", '0');
                    // Высота и ширина iFrame будет как у элемента-родителя
                    iframe.style.width = this.style.width;
                    iframe.style.height = this.style.height;
                    // Заменяем начальное изображение (постер) на iFrame
                    this.parentNode.replaceChild(iframe, this);
                }
            }
        })();
    }
    //Service nav
    if($('.service-submenu').length>0) {
        submenuToggle('.toggle-btn', '.service-submenu');
    }
    if($('.service-nav').length>0){
        let currentUrl = document.location.href,
            currentItem = $(`.service-nav a[href="${currentUrl}"]`);
        currentItem.addClass('active');
        $('.service-nav a.active').parent('li').addClass('active').parent('ul').addClass('active').parent('li').addClass('active').parent('ul').addClass('active').parent('li').addClass('active').parent('ul').addClass('active');

    }
    //Table button
    if($('.service-content table').length>0){
        const currentTr = $('.service-content table:not(.original-table) tr:first-child td:not(:first-child)'),
              currentPackages = [];
        currentTr.each(function () {
            currentPackages.push(`<td><button class="btn  btn-table-popup" data-package="${$(this).text()}">Order</button></td>`);
        });
        $('.service-content table:not(.original-table) tbody').append(`
        <tr class="table-buttons">
           <td></td> 
        </tr>
        `);
        for(let i = 0;i<currentPackages.length;i++){
            $('.table-buttons').append(currentPackages[i]);
        }
        let count = 0;
        $(window).scroll(function(){
                let wt = $(window).scrollTop();
                let wh = $(window).height();
                let et = $('.service-content table tbody').offset().top;
                let eh = $('.service-content table tbody').outerHeight();
                let dh = $(document).height();
                if (wt + wh >= et || wh + wt == dh || eh + et < wh) {
                    count+=1;
                    if(count === 1) {
                        $('.service-content table tbody').append(`<span class="mobile-table-message">Please, turn your phone horizontally to see all prices <img src="/wp-content/themes/study/img/icons/rotation.webp" alt="rotation" class="rotation-img"></span>`);
                        setTimeout(() => {
                            $('.mobile-table-message').fadeOut('fast');
                        }, 8000);
                    }
                }
        });

    }
    //Service number
    const listCount = (item) =>{
        if($(item).length>0){
            if(item === '.list-page-list.page-list-v2 .list-page-type'){
                $(item).each(function () {
                    $(this).addClass('fas fa-chevron-right');
                })
            }
            else if(item === '.list-page-list.page-list-v3 .list-page-type'){
                $(item).each(function () {
                    $(this).addClass('fas fa-check');
                })
            }
            else {
                let count = 0;
                $(item).each(function () {
                    count += 1;
                    $(this).text(count);
                })
            }
        }
    };
    listCount('.service-advantages-number');
    listCount('.list-page-list.page-list-v1 .list-page-type');
    listCount('.list-page-list.page-list-v2 .list-page-type');
    listCount('.list-page-list.page-list-v3 .list-page-type');
    //Popup
    const togglePopup = (button,item) =>{
        if($(button).length>0){
            $(button).click(function () {
                $(item).fadeIn(500);
                if($(item).find('.currentPage')){
                    $(item).find('.currentPage').val(window.location.href);
                }
            });
            $('.popup-close').click(function () {
                $(this).parent().parent().parent().fadeOut(500);
            });
            $(item).on( 'wpcf7mailsent', ()=> {
               $(this).find('.popup-form').fadeOut('fast').find('.thx-text').fadeOut('fast');
               setTimeout(()=> {
                   $(this).fadeOut('fast')
               },1000)
            });
        }
    };
    togglePopup('.btn-table-popup','.popup-order');
    if($('.btn-table-popup').length>0){
        $('.btn-table-popup').click(function () {
            let currentPackage = $(this).attr('data-package');
            $('.popup-package').val(currentPackage);
        })
    }
    togglePopup('.btn-request','.popup-consult');
    //Read more
    if($('.read-more-text').length){
        $('.read-more-text').readmore({
            speed: 250,
            collapsedHeight: 100,
            moreLink: '<span class="fas fa-chevron-down read-more-btn"></span>',
            lessLink: '<span class="fas fa-chevron-up read-more-btn"></span>'
        })
    }
    if($('.banner-slider').length){
        $('.banner-slider').slick({
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<div class="banner-slider-btn banner-slider-btn-left"><i class="fas fa-chevron-left"></i></div>',
            nextArrow: '<div class="banner-slider-btn banner-slider-btn-right"><i class="fas fa-chevron-right"></i></div>',
            responsive: [
                {
                    breakpoint: 995,
                    settings: {
                        arrows: false,
                        dots: false
                    }
                }
            ]
        })
    }
});

