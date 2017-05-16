module.exports = function() {

	var $gallery = $('.gallery');
	var $container = $gallery.find('.gallery__container');
	var $showGallery = $('.show-gallery');
	var $hideGallery = $('.hide-gallery');


	/**
	 * Handler for open gallery button click
	 */
	function galleryShow() {
		$gallery.addClass('gallery--show');

		// Add listeners for hide and navigate..
		$hideGallery.on('click', galleryHide);
		$gallery.on('click', '.gallery-item, a', galleryNavigate);

		// Focus on the first link, then trap the keyboard in the gallery until closed
		$gallery.find('a').eq(0).focus();
		galleryFocusable();
		$gallery.trap();
	}


	/**
	 * Handler for close button click
	 */
	function galleryHide() {
		// Add classes so we can animate the steps with css
		$gallery
			.removeClass('gallery--show')
			.addClass('gallery--hide');

		// Wait for the animation to complete before we remove the gallery--hide class
		$container.on('transitionend webkitTransitionEnd oTransitionEnd', galleryHideComplete);

		// Remove hide/navigate listeners
		$hideGallery.off('click', galleryHide);
		$gallery.off('click', '.gallery-item, a', galleryNavigate);

		// Untrap the keyboard and focus back on the gallery button
		$gallery.untrap();
		galleryUnfocusable();
		$showGallery.focus();
	}


	/**
	 * Handler for hide animation complete
	 */
	function galleryHideComplete(e) {
		if (e.originalEvent.propertyName === 'transform') {
			// Remove classes and event listener (otherwise it'll listen on open too)
			$gallery.removeClass('gallery--hide');
			$container.off('transitionend webkitTransitionEnd oTransitionEnd', galleryHideComplete);
		}
	}


	/**
	 * Handler for link in the gallery clicked
	 */
	function galleryNavigate(e) {
		e.preventDefault();
		$gallery
			.removeClass('gallery--show')
			.addClass('gallery--hide');

		$container.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
			// If there is an href attr, use that..
			window.location = e.currentTarget.getAttribute('href') || e.currentTarget.dataset.href;
		});
	}


	/**
	 * Resets the tabindex on focusable elements
	 */
	function galleryFocusable() {
		$gallery.find('a, button').attr('tabindex', 0);
	}


	/**
	 * Removes the tabindex on focusable elements
	 */
	function galleryUnfocusable() {
		$gallery.find('a, button').attr('tabindex', -1);
	}


	// Setup the slick carousel
	$('.gallery__list').slick({
		adaptiveHeight: true,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><svg width="6px" height="10px" viewBox="0 0 6 10"><use xlink:href="#icon-chevron-left"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next"><svg width="6px" height="10px" viewBox="0 0 6 10"><use xlink:href="#icon-chevron-right"/></svg></button>',
		slidesToShow: 4,
		slidesToScroll: 1,
		// autoplay: true,
		speed: 1000,
		responsive: [
			{
				breakpoint: screenXS,
				settings: 'unslick'
			}
		]
	});

	// Listen for the show gallery button clicked
	$showGallery.on('click', galleryShow);

	// Remove the tabindex on the gallery by default
	galleryUnfocusable();
};
