module.exports = function() {

	var $filter = $('.main__filter');
	var $label = $filter.find('.filter__label');
	var $list = $filter.find('ul');
	var filters = [];
	var isMobile = false;

	$window.on('resize', checkBrowserWidth).trigger('resize');
	$filter.on('click', 'button', updateFilter);
	$label.on('click', toggleList);


	/**
	 * Handles the slightly different functionality for mobile
	 */
	function checkBrowserWidth() {
		if ($window.width() < screenXS) {
			isMobile = true;
			$list.hide();
		}
		else {
			isMobile = false;
			$list.show();
		}
	}


	/**
	 * Hides/shows the list
	 */
	function toggleList() {
		$list.toggle();
	}


	/**
	 * Handles filter button clicks
	 */
	function updateFilter() {

		$label.find('span').html(this.innerText);

		// Only make one item selected if mobile
		if (isMobile) {
			// $filter.find('.active').removeClass('active');
			$list.hide();
		}
		$filter.find('.active').removeClass('active');

		this.classList.toggle('active');
		filterItems(this.dataset.filter);
	}


	/**
	 * Filters the cards on the page
	 *
	 * @todo add alternating card classes
	 */
	function filterItems(category) {

		var $cards = $('.card');
		var index = filters.indexOf(category);

		// // Check if a new filter was added
		if (category === 'all') {
			filters = [];
		}
		else {
			filters = [category];
		}
		// else if (index >= 0) {
		// 	// Filter already exists so remove it
		// 	filters.splice(index, 1);
		// }
		// else {
		// 	// Only allow 1 filter if in mobile view
		// 	if (isMobile) {
		// 		filters = [category];
		// 	}
		// 	else {
		// 		filters.push(category);
		// 	}
		// }

		// Check if there are any filters
		if (filters.length) {
			// Loop through all cards and match the filters to the categories
			$cards.each(function() {
				if (filters.indexOf(this.dataset.category) >= 0) {
					this.classList.remove('filter-hide');
				}
				else {
					this.classList.add('filter-hide');
				}
			});
		}
		else {
			// Otherwise just remove all filter classes
			$cards.removeClass('filter-hide');
		}

		// The page size may have changed so refresh the waypoints
		Waypoint.refreshAll();

		// $('.easein').removeClass('easein');
		// TODO why does this not work after the first time?
		// setTimeout(Waypoint.refreshAll, 500);
	}
};
