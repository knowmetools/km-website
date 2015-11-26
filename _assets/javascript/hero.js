var set_bg = function($el) {
	if ($el).attr("bg") !== undefined) {
		$el.css("background", "url('" + $el.attr("bg") + "') no-repeat center center");
		console.log("Set background image of '" + $(this).attr("bg") + "'");
	}
};

$(document).ready(function() {
	$('.hero').each(function() {
		set_bg($(this));
	});
});