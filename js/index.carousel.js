

$(window).on('load', function() {
	$('.slider').slick({
		arrows:true,
		dots:true,
		slidesToShow:3,
		autoplay:true,
		speed:1000,
		autoplaySpeed:800000,
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
});

