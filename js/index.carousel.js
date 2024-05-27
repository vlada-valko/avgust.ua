function initSlick() {
    var windowWidth = $(window).width();
    var slidesToShow = windowWidth >= 1150 ? 3 : (windowWidth >= 850 ? 2 : 1);

    $('.slider').slick({
        arrows:true,
        dots:true,
        slidesToShow: slidesToShow,
        autoplay:true,
        speed:1000,
        autoplaySpeed:3000,
        responsive:[
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow:2
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow:1
                }
            }
        ]
    });
}

$(window).on('load resize', function() {
    initSlick();
});
