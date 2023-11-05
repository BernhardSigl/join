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

function markCategory(linkId) {
    let links = document.getElementsByClassName('categoryLink');
    for (i = 0; i < links.length; i++) {
        links[i].style.backgroundColor = 'transparent';
    }
    let selectedLink = document.getElementById(linkId);
    if (selectedLink) {
        selectedLink.style.backgroundColor = '#091931';
    }
}

function slideOneObject(frontId) {
    toggleVisibility(frontId, true);
    slideInAnimation = document.getElementById(frontId);
    slideInAnimation.classList.remove('slide-out', 'slide-in');
    slideInAnimation.classList.add('slide-in');
}

function slideOutOneObject(frontId) {
    slideInAnimation = document.getElementById(frontId);
    slideInAnimation.classList.remove('slide-out');
    slideInAnimation.classList.add('slide-out');
}

function slideTwoObjects(frontId, backgroundId) {
    document.body.classList.add('disable-scroll');
    slideInAnimation = document.getElementById(frontId);
    toggleVisibility(frontId, true);
    toggleVisibility(backgroundId, true);
    slideInAnimation.classList.add('slide-in');
    setTimeout(function () {
        slideInAnimation.classList.remove('slide-in');
        document.body.classList.remove('disable-scroll');
    }, 500);
}

function slideOutTwoObjects(frontId, backgroundId) {
    document.body.classList.add('disable-scroll');
    slideInAnimation = document.getElementById(frontId);
    slideInAnimation.classList.add('slide-out');
    setTimeout(function () {
        toggleVisibility(backgroundId, false);
        toggleVisibility(frontId, false);
        slideInAnimation.classList.remove('slide-out');
        document.body.classList.remove('disable-scroll');
    }, 200);
}

function doNotClose(event) {
    event.stopPropagation();
}