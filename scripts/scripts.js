const fields = document.querySelectorAll("[required]");

function getBMI(mass, height) {
  const bmi = mass / (height * height);

  return bmi.toFixed(2);
}

function getBMIDegree(bmi) {
  const degree = ["Underweight", "Normal", "Overweight", "Obesity"];
  const levels = [bmi < 18.5, bmi <= 24.9, bmi <= 29.9, bmi >= 30];
  let bmiLevel;
  levels.map((level, index) =>
    level && !bmiLevel ? (bmiLevel = degree[index]) : level
  );

  return bmiLevel;
}

function setResult() {
  const result = document.querySelector("#result");
  const paragraph = document.createElement("p");
  const mass = +document
    .querySelector('input[name="mass"]')
    .value.replace(",", ".");
  const height = +document
    .querySelector('input[name="height"]')
    .value.replace(",", ".");
  const bmi = getBMI(mass, height);
  const bmiDegree = getBMIDegree(bmi);
  let message;

  message =
    !+bmi || isNaN(bmi)
      ? "BMI is not valid"
      : `Your BMI is ${bmi} (${bmiDegree})`;

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
        valueMissing: "Please fill out this field",
        patternMismatch: "Please use the correct pattern for this field",
      },
    };

    return messages[field.type][type];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = messagesType(error);

      field.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      field.style.borderColor = "";
      setCustomMessage();
    }
  };
}

function customValidation({ target }) {
  const field = target;
  const validation = validateField(field);

  validation();
}

// Applying message to required field
fields.forEach((field) => {
  field.addEventListener("invalid", (e) => {
    // Bubble eliminate
    e.preventDefault();
    customValidation(e);
  });
  field.addEventListener("blur", customValidation);
});

// Cancel default page submit
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  setResult();
});
