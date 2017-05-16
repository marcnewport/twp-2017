/*
 * Encapsulate the main script so we don't clutter the global name space
 */
(function($) {

	global.$window = $(window);
	global.$document = $(document);
	global.screenXS = 768;

	// Import our partial scripts
	var menu = require('./partials/menu');
	var gallery = require('./partials/gallery');
	var about = require('./partials/about');
	var filter = require('./partials/filter');


	/**
	 * Document ready handler - initialises our scripts
	 */
	function init() {
		// Run our partial scripts
		// TODO : decide when to run these scripts, not all need to run on every page
		menu();
		gallery();
		about();
		filter();


		// Listen for the document to scroll from top
		$('body').waypoint({
			handler: easeinLogo,
			offset: '-1%'
		});

		// Listen for a card to come into the viewport
		$('.card').waypoint({
			handler: easeinCard,
			offset: '90%'
		});

		// Listen for a card to come into the viewport
		$('.footer').waypoint({
			handler: easeinFooter,
			offset: '5%'
		});
	}


	/**
	 * Handler for body waypoint
	 */
	function easeinLogo(direction) {
		if ($window.width() < screenXS) {
			if (direction === 'down') {
				$('.header').addClass('header--small');
			}
			else {
				$('.header').removeClass('header--small');
			}
		}
	}


	/**
	 * Handler for card waypoint
	 */
	function easeinCard() {
		var image = this.element.querySelector('.card__image');
		var content = this.element.querySelector('.card__content');

		// console.dir(image);

		if (image) {
			image.classList.add('easein');
		}
		if (content) {
			content.classList.add('easein');
		}
	}


	/**
	 * Handler for footer waypoint
	 */
	function easeinFooter(direction) {
		if (direction === 'down') {
			document.body.classList.add('easein-footer');
		}
		else {
			document.body.classList.remove('easein-footer');
		}
	}


	// Listen for the document to load
	$document.ready(init);
})(jQuery);
