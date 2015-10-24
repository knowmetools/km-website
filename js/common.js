$('.navbar-toggler').on('click', function() {
	$el = $($(this).attr('data-target'));
	if (!$el.hasClass('collapsing')) {
		if ($el.css('display') == 'none') {
			$el.addClass('nav-stacked');
			$el.css('clear', 'both');
			$el.show();
		} else {
			$el.removeClass('nav-stacked');
			$el.css('clear', 'none');
			$el.hide();
		}
	}
});