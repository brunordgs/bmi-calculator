const fields = document.querySelectorAll('[required]');

function getBMI(mass, height) {
	const bmi = mass / (height * height);

	return bmi.toFixed(2);
}

function getBMIDegree(bmi) {
	const degree = ['Underweight', 'Normal', 'Overweight', 'Obesity'];

	if (bmi < 18.5) return degree[0];
	if (bmi <= 24.9) return degree[1];
	if (bmi <= 29.9) return degree[2];
	if (bmi >= 30) return degree[3];
}

function setResult() {
	const result = document.querySelector('#result');
	const paragraph = document.createElement('p');
	const mass = Number(document.querySelector('input[name="mass"]').value);
	const height = Number(document.querySelector('input[name="height"]').value);
	const bmi = getBMI(mass, height);
	const bmiDegree = getBMIDegree(bmi);
	let message;

	bmi == 0 || isNaN(bmi)
		? (message = 'BMI is not valid')
		: (message = `Your BMI is ${bmi} (${bmiDegree})`);

	paragraph.innerHTML = message;
	result.appendChild(paragraph);
}

function validateField(field) {
	function verifyErrors() {
		let foundError = false;

		for (const error in field.validity) {
			if (field.validity[error] && !field.validity.valid) {
				foundError = error;
			}
		}

		return foundError;
	}

	function messagesType(type) {
		const messages = {
			text: {
				valueMissing: 'Please fill out this field',
			},
		};

		return messages[field.type][type];
	}

	function setCustomMessage(message) {
		const spanError = field.parentNode.querySelector('span.error');

		if (message) {
			spanError.classList.add('active');
			spanError.innerHTML = message;
		} else {
			spanError.classList.remove('active');
			spanError.innerHTML = '';
		}
	}

	return function () {
		const error = verifyErrors();

		if (error) {
			const message = messagesType(error);

			field.style.borderColor = 'red';
			setCustomMessage(message);
		} else {
			field.style.borderColor = '';
			setCustomMessage();
		}
	};
}

function customValidation(e) {
	const field = e.target;
	const validation = validateField(field);

	validation();
}

// Applying message to required field
fields.forEach(field => {
	field.addEventListener('invalid', e => {
		// Bubble eliminate
		e.preventDefault();
		customValidation(e);
	});
	field.addEventListener('blur', customValidation);
});

// Cancel default page submit
document.querySelector('form').addEventListener('submit', e => {
	e.preventDefault();

	setResult();
});
