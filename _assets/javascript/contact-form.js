$(document).ready(function() {
	
	$('#contact-form').submit(function(e) {

		var $form = $(this);
		var input_name = $form.find('#name').val();
		var input_email = $form.find('#email').val();
		var input_message = $form.find('#message').val();
		var input_gotcha = $form.find('#gotcha').val();

		if (input_gotcha !== '') {
			return false;
		}

		data = {
			name: input_name,
			email: input_email,
			message: input_message,
		};

		var request = $.ajax({
			url: $form.attr('action'),
			method: $form.attr('method'),
			data: data,
			dataType: "json"
		});

		request.done(function() {
			noty({
				layout: 'topCenter',
				type: 'success',
				text: 'Succesfully sent message.',
				timeout: 5000
			});
		});

		request.fail(function() {
			noty({
				layout: 'topCenter',
				type: 'error',
				text: "We were unable to send your message. Please wait a few moments and try again. If the problem persists, you can manually send an email to <a href='mailto:team@knowmetools.com' target='_blank'>team@knowmetools.com</a>",
				closeWith: ['button', 'backdrop'],
				modal: true
			});
		});

		e.preventDefault();
	});
});