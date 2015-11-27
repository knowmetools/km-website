var setBg = function($el) {

	// determine which background to use
	// for now it is automatically 'bg'
	var background = undefined;

	if ($el.attr("sm-bg") !== undefined && $el.attr("sm-width") !== undefined) {
		// console.log("$(window).width() < " + parseInt($el.attr("sm-width"), 10) + ": " + ($(window).width() < $el.attr("sm-width")))
		if ($(window).width() < parseInt($el.attr("sm-width"), 10)) {
			console.log("Set background to small image");
			background = "url('" + $el.attr("sm-bg") + "') no-repeat center center";
		} else if ($el.attr("bg") !== undefined) {
			console.log("Set background to normal image.");
			background = "url('" + $el.attr("bg") + "') no-repeat center center";
		}
	}

	if (background !== undefined) {
		$el.css("background", background);
		console.log("For window width of " + $(window).width() + ", set background to: '" + background + "'");
	}
};

$(document).ready(function() {
	$('.hero').each(function() {
		setBg($(this));
	});
});

var resizeTimer;

$(window).resize(function() {

	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function(e) {
		$('.hero').each(function() {
			setBg($(this));
		});
	}, 250);
});