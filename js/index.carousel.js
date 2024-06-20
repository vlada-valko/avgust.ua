function initSlick() {
    var windowWidth = $(window).width();
    var slidesToShow = windowWidth >= 1150 ? 3 : (windowWidth >= 850 ? 2 : 1);

    if ($('.slider').hasClass('slick-initialized')) {
        $('.slider').slick('unslick');
    }

    $('.slider').slick({
        arrows: true,
        dots: true,
        slidesToShow: slidesToShow,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 33000,
        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
}

$(window).on('load resize', function() {
    initSlick();
});

// Викликаємо initSlick після повного завантаження сторінки
$(document).ready(function() {
    initSlick();
});