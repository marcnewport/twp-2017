module.exports = function() {
	// Testimonial quotes slick carousel
	$('.main--about .quotes').slick({
		adaptiveHeight: true,
		arrows: false,
		dots: true
	});

	// Team member slick carousel
	$('.main--about .members').slick({
		adaptiveHeight: true,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><svg width="6px" height="10px" viewBox="0 0 6 10"><use xlink:href="#icon-chevron-left"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next"><svg width="6px" height="10px" viewBox="0 0 6 10"><use xlink:href="#icon-chevron-right"/></svg></button>',
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: screenXS,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
};
