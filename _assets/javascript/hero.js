$(document).ready(function() {
	$('.hero').each(function() {
		if ($(this).attr("bg") !== undefined) {
			$(this).css('background', "url('" + $(this).attr("bg") + "') no-repeat center center");
			console.log("Set background image of '" + $(this).attr("bg") + "'");
		}
	});
});