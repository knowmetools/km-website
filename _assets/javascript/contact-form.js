$(document).ready(function() {
	
	$('#contact-form').submit(function(e) {

		var $form = $(this);
		var $input_name = $form.find('#name');
		var $input_email = $form.find('#email');
		var $input_message = $form.find('#message');
		var $input_gotcha = $form.find('#gotcha');

		var name = $input_name.val();
		var email = $input_email.val();
		var message = $input_message.val();
		var gotcha = $input_gotcha.val();

		if (gotcha !== '') {
			noty({
				layout: 'topCenter',
				type: 'error',
				text: 'You have managed to fill out the hidden field used to catch spam. Please clear that field and try again.',
				closeWith: ['button', 'backdrop'],
				modal: true
			});
			
			return false;
		}

		data = {
			name: name,
			email: email,
			message: message,
		};

		var request = $.ajax({
			url: $form.attr('action'),
			method: $form.attr('method'),
			data: data,
			dataType: "json"
		});

		request.done(function() {
			// reset form values
			$input_name.val('');
			$input_email.val('');
			$input_message.val('');
			$input_gotcha.val('');

			// notify user that message was sent
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