/* Determine which background to use for each hero image. */
var calcBackgrounds = function() {

	$('.hero').each(function() {

		// Try to use the small image first.
		var url = $(this).attr("sm-bg");
		var width = $(this).attr("sm-width");

		// Make sure the url and size exist, and that the window is smaller than
		// the given size.
		if (url !== undefined && width !== undefined) {
			if ($(window).width() < parseInt(width, 10)) {
				setBackground($(this), url);
				return;
			}
		}

		// If the small image wasn't used, use the normal background image.
		url = $(this).attr("bg");

		if (url !== undefined) {
			setBackground($(this), url);
		}
	});
};

/* Set the background image for a specified element to the given url. */
var setBackground = function($el, url) {
	$el.css("background", "url('" + url + "') no-repeat center center");
};

// Determine the backgrounds on page load.
$(document).ready(function() {
	calcBackgrounds();
});

// Timer for executing action after the window is done resizing
var resizeTimer;

// Only recalculate hero images after no resizing has been done for 250 milliseconds.
$(window).resize(function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(calcBackgrounds, 250);
});