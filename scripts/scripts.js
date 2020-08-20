const form = document.querySelector('form');

form.addEventListener('submit', e => {
	e.preventDefault();

	const massEl = e.target.querySelector('input[name="mass"]');
	const heightEl = e.target.querySelector('input[name="height"]');
	const mass = Number(massEl.value);
	const height = Number(heightEl.value);
	const bmi = getBMI(mass, height);
	const bmiDegree = getBMIDegree(bmi);
	let message;

	if (bmi == 0) {
		message = 'BMI is not valid';
	} else {
		message = `Your BMI is ${bmi} (${bmiDegree})`;
	}

	if (!mass) {
		return setResult('Invalid mass', false);
	}

	if (!height) {
		return setResult('Invalid height', false);
	}

	setResult(message, true);
});

function getBMIDegree(bmi) {
	const degree = ['Underweight', 'Normal', 'Overweight', 'Obesity'];

	if (bmi < 18.5) return degree[0];
	if (bmi <= 24.9) return degree[1];
	if (bmi <= 29.9) return degree[2];
	if (bmi >= 30) return degree[3];
}

function getBMI(mass, height) {
	const bmi = mass / (height * height);

	return bmi.toFixed(2);
}

function setResult(message, isValid) {
	const result = document.querySelector('#result');
	const paragraph = document.createElement('p');

	isValid
		? paragraph.classList.add('success')
		: paragraph.classList.add('failure');

	paragraph.innerHTML = message;
	result.appendChild(paragraph);
}
