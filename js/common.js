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

$(document).ready(function() {
	// find header link for current page
	$el = $("a#" + HEADER_ID);
	// make it the active link
	$el.addClass("active");

	// add accessibility items
	$span = $("<span class='sr-only'>(current)</span>");
	$el.append($span);
});