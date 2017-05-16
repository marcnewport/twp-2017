module.exports = function() {

	var $menu = $('.menu');
	var $showMenu = $('.show-menu');
	var $menuClose = $('.menu__close');
	var $logo = $('.header__logo');


	/**
	 * Handler for open menu button click
	 */
	function menuShow() {
		// Mark the active link
		var path = window.location.pathname.split('/').pop();
		$menu.find('[href="'+ path +'"]').addClass('active');

		$menu.addClass('menu--show');

		// Add some event listeners for close and navigation
		$menuClose.on('click', menuHide);
		$menu.on('click', 'a', menuNavigate);
		$logo.on('click', 'a', menuNavigate);

		// Focus on the first link, then trap the keyboard in the menu until closed
		$menu.find('.active').eq(0).focus();
		menuFocusable();
		$menu.trap();
	}


	/**
	 * Handler for close button click
	 */
	function menuHide() {
		// Add classes so we can animate the steps with css
		$menu
			.removeClass('menu--show')
			.addClass('menu--hide')
			.on('transitionend webkitTransitionEnd oTransitionEnd', menuHideComplete);

		// Remove the close and navigate event listeners
		$menuClose.off('click', menuHide);
		$menu.off('click', 'a', menuNavigate);
		$logo.off('click', 'a', menuNavigate);

		// Untrap the keyboard and focus back on the menu button
		$menu.untrap();
		menuUnfocusable();
		$showMenu.focus();
	}


	/**
	 * Handler for hide animation complete
	 */
	function menuHideComplete(e) {
		if (e.originalEvent.propertyName === 'transform') {
			// Remove classes and the above attached event listener
			$menu
				.removeClass('menu--hide')
				.off('transitionend webkitTransitionEnd oTransitionEnd', menuHideComplete);
		}
	}


	/**
	 * Handler for link in the menu clicked
	 */
	function menuNavigate(e) {
		e.preventDefault();
		$menu
			.removeClass('menu--show')
			.addClass('menu--hide')
			.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
				window.location = e.currentTarget.getAttribute('href');
			});
	}


	/**
	 * Resets the tabindex on focusable elements
	 */
	function menuFocusable() {
		$menu.find('a, button').attr('tabindex', 0);
	}


	/**
	 * Removes the tabindex on focusable elements
	 */
	function menuUnfocusable() {
		$menu.find('a, button').attr('tabindex', -1);
	}

	// Listen for the show menu button clicked
	$showMenu.on('click', menuShow);
	// Remove the tabindex on the menu
	menuUnfocusable();
};
