$('.navbar-toggler').on('click', function() {
	var $el = $($(this).attr('data-target'));
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

var highlightNavbar = function(el_id) {
	var $el = $("a#" + el_id);
	// make it the active link
	$el.addClass("active");

	// add accessibility items
	var $span = $("<span class='sr-only'>(current)</span>");
	$el.append($span);

	// if element is a dropdown item, highlight parent button
	if ($el.hasClass("dropdown-item")) {
		var $link = $el.parent().parent().find('.dropdown-toggle');
		$link.addClass("active");
	}
}