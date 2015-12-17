$(document).ready(function() {
	
	$('#contact-form').submit(function(e) {

		var $form = $(this);
		
		var name = $form.find('#name').val();
		var email = $form.find('#email').val();
		var message = $form.find('#message').val();
		var gotcha = $form.find('#gotcha').val();

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

		// create notification that message is sending
		var sending_message = noty({
			layout: 'topCenter',
			type: 'information',
			text: 'Sending message...'
		});

		request.done(function() {
			// reset form values
			$form.trigger("reset");

			$form.find('*:invalid').each(function() {
				$(this).css('box-shadow', 'none');
			});

			// notify user that message was sent
			sending_message.close();
			noty({
				layout: 'topCenter',
				type: 'success',
				text: 'Succesfully sent message.',
				timeout: 5000
			});
		});

		request.fail(function() {
			sending_message.close();
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