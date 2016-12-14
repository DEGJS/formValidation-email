let email = function() {

	let messages = {
			invalidFormatMsg: {
				attribute: 'data-validation-email-message',
				message: 'Please enter a valid email address.'
			}
		},
		events = [
			'focusout',
			'submit'
		];

	function getEvents() {
		return events;
	};

	function isRelevant(containerEl, inputEls) {
		return inputEls.every(function(el) {
			return el.getAttribute('type') === 'email');
		});
	};

	function validate(matchingField) {
		return new Promise(function(resolve, reject) {
			let inputEls = matchingField.inputEls;
			if ((inputEls) && (inputEls.length > 0)) {
				let input = inputEls[0],
					pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
				if((input.value) && (input.value.length > 0)) {
					if (pattern.test(input.value)) {
						resolve({
							valid: true
						});
					} else {
						resolve({
							valid: false,
							message: messages.invalidFormatMsg,
							matchingField: matchingField
						});
					}
				} else {
					resolve({
						valid: true
					});
				}
			} else {
				reject('no inputs');
			}			
		});
	};

	return {
		events: getEvents,
		isRelevant: isRelevant,
		validate: validate
	}

};

export default email;