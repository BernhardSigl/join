function toggleVisibility(id, show) {
    const showHide = document.getElementById(id);
    showHide.classList.toggle('dNone', !show);
}

function toggleRequiredAttribute(elementId, required) {
    const element = document.getElementById(elementId);
    element.required = required;
}

function toggleCheckboxDisabled(elementId, disabled) {
    const checkbox = document.getElementById(elementId);
    checkbox.disabled = disabled;
}

function validateNameInput(input) {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(input.value);

    if (!isValid) {
        input.setCustomValidity('Only letters are allowed.');
    } else {
        input.setCustomValidity('');
    }
}

function validateEmailInput(input) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid = regex.test(input.value);

    if (!isValid) {
        input.setCustomValidity('Please enter a valid email address.');
    } else {
        input.setCustomValidity('');
    }
}

function validatePasswordInput(input) {
    const regex = /^(?=.*[A-Za-z])(?=.*[@#$%^&+=]).{6,}$/;
    const isValid = regex.test(input.value);

    if (!isValid) {
        input.setCustomValidity('Password must contain at least 6 characters including letters and may include at least one special character.');
    } else {
        input.setCustomValidity('');
    }
}