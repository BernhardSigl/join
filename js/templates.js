/**
 * Keeps track of the last opened HTML page for navigation purposes.
 * @type {string}
 */
let lastOpenedHTML = '';

/**
 * Toggles the visibility of an HTML element.
 * @param {string} id - The ID of the HTML element.
 * @param {boolean} show - A flag indicating whether to show or hide the element.
 */
function toggleVisibility(id, show) {
    const showHide = document.getElementById(id);
    showHide.classList.toggle('dNone', !show);
}

/**
 * Toggles the required attribute of an HTML element.
 * @param {string} elementId - The ID of the HTML element.
 * @param {boolean} required - A flag indicating whether the required attribute should be set.
 */
function toggleRequiredAttribute(elementId, required) {
    const element = document.getElementById(elementId);
    element.required = required;
}

/**
 * Toggles the disabled attribute of a checkbox element.
 * @param {string} elementId - The ID of the checkbox element.
 * @param {boolean} disabled - A flag indicating whether the checkbox should be disabled.
 */
function toggleCheckboxDisabled(elementId, disabled) {
    const checkbox = document.getElementById(elementId);
    checkbox.disabled = disabled;
}

/**
 * Validates a name input for registration.
 * @param {HTMLInputElement} input - The input element to validate.
 */
function validateNameInputRegister(input) {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(input.value);
    if (!isValid) {
        input.setCustomValidity('Only letters are allowed.');
    } else {
        input.setCustomValidity('');
    }
}

/**
 * Validates a name input.
 * @param {HTMLInputElement} input - The input element to validate.
 */
function validateNameInput(input) {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(input.value);
    const isNameInArray = contactsArray.some(contact => contact.name === input.value);
    if (!isValid) {
        input.setCustomValidity('Only letters are allowed.');
    } else if (isNameInArray) {
        input.setCustomValidity('Name already exists.');
    } else {
        input.setCustomValidity('');
    }
}

/**
 * Validates an email input for registration.
 * @param {HTMLInputElement} input - The input element to validate.
 */
function validateEmailInputRegister(input) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid = regex.test(input.value);
    const isEmailInArray = users.some(user => user.email === input.value);
    if (!isValid) {
        input.setCustomValidity('Please enter a valid email address.');
    } else if (isEmailInArray) {
        input.setCustomValidity('Email already exists.');
    } else {
        input.setCustomValidity('');
    }
}

/**
 * Validates an email input.
 * @param {HTMLInputElement} input - The input element to validate.
 */
function validateEmailInput(input) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid = regex.test(input.value);

    if (!isValid) {
        input.setCustomValidity('Please enter a valid email address.');
    } else {
        input.setCustomValidity('');
    }
}

/**
 * Validates a password input.
 * @param {HTMLInputElement} input - The input element to validate.
 */
function validatePasswordInput(input) {
    const regex = /^(?=.*[A-Za-z])(?=.*[@#$%^&+=]).{6,}$/;
    const isValid = regex.test(input.value);

    if (!isValid) {
        input.setCustomValidity('Password must contain at least 6 characters including letters and may include at least one special character.');
    } else {
        input.setCustomValidity('');
    }
}

/**
 * Validates a date input.
 * @param {HTMLInputElement} input - The input element to validate.
 */
function validateDateInput(input) {
    const sanitizedValue = input.value.replace(/[^0-9.\/]/g, '');
    const formattedValue = sanitizedValue.replace(/\./g, '/');
    input.value = formattedValue;
    const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(19|20)?\d{2}$/;
    const isValid = regex.test(formattedValue);
    if (!isValid) {
        input.setCustomValidity(`Only numbers and '/' are allowed.`);
    } else {
        input.setCustomValidity('');
    }
}

/**
 * Validates a phone input.
 * @param {HTMLInputElement} input - The input element to validate.
 */
function validatePhoneInput(input) {
    const regex = /^[0-9\s+\/]+$/;
    const isValid = regex.test(input.value);
    if (!isValid) {
        input.setCustomValidity('Only numbers, spaces, "+" and "/" are allowed.');
    } else {
        input.setCustomValidity('');
    }
}

/**
 * Validates a checkbox input.
 * @param {HTMLInputElement} checkbox - The checkbox element to validate.
 */
function validateCheckbox(checkbox) {
    const isValid = checkbox.checked;
    if (!isValid) {
        checkbox.setCustomValidity('You must accept the privacy policy.');
    } else {
        checkbox.setCustomValidity('');
    }
}

/**
 * Validates an input field for non-zero content.
 * @param {HTMLInputElement} inputField - The input field to validate.
 */
function validateZeroInput(inputField) {
    if (inputField.value.trim() === '') {
        inputField.setCustomValidity('Please enter at least one character.');
    } else {
        inputField.setCustomValidity('');
    }
}

/**
 * Pull the active link based on the current URL.
 */
function setActiveLink() {
    let currentUrl = window.location.href;
    let activeLinkId = markNavbarLinks(currentUrl);
    if (activeLinkId !== "") {
        let activeLink = document.getElementById(activeLinkId);
        activeLink.style.backgroundColor = "#091931";
        activeLink.style.pointerEvents = "none";
    }
}

/**
 * Marks the appropriate navbar link based on the current URL.
 * @param {string} currentUrl - The current URL of the window.
 * @returns {string} - The ID of the active link.
 */
function markNavbarLinks(currentUrl) {
    if (currentUrl.includes("summary.html") || currentUrl.includes("/summary")) {
        return "summaryLinkId";
    } else if (currentUrl.includes("addTask.html") || currentUrl.includes("/addTask")) {
        return "addTaskLinkId";
    } else if (currentUrl.includes("board.html") || currentUrl.includes("/board")) {
        return "boardLinkId";
    } else if (currentUrl.includes("contacts.html") || currentUrl.includes("/contacts")) {
        return "contactsLinkId";
    } else if (currentUrl.includes("privacyPolicy.html") || currentUrl.includes("/privacyPolicy")) {
        return "privacyPolicyLinkId";
    } else if (currentUrl.includes("legalNotice.html") || currentUrl.includes("/legalNotice")) {
        return "legalNoticeLinkId";
    }
    return "";
}

/**
 * Slides in one object with animation.
 * @param {string} frontId - The ID of the element to slide in.
 */
function slideOneObject(frontId) {
    document.body.classList.add('disable-scroll');
    slideInAnimation = document.getElementById(frontId);
    toggleVisibility(frontId, true);
    slideInAnimation.classList.add('slide-in');
    setTimeout(function () {
        slideInAnimation.classList.remove('slide-in');
        document.body.classList.remove('disable-scroll');
    }, 500);
}

/**
 * Slides out one object with animation.
 * @param {string} frontId - The ID of the element to slide out.
 */
function slideOutOneObject(frontId) {
    document.body.classList.add('disable-scroll');
    slideInAnimation = document.getElementById(frontId);
    slideInAnimation.classList.add('slide-out');
    setTimeout(function () {
        slideInAnimation.classList.remove('slide-out');
        toggleVisibility(frontId, false);
        document.body.classList.remove('disable-scroll');
    }, 200);
}

/**
 * Slides in two objects with animation.
 * @param {string} frontId - The ID of the front element to slide in.
 * @param {string} backgroundId - The ID of the background element to toggle visibility.
 */
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

/**
 * Slides out two objects with animation.
 * @param {string} frontId - The ID of the front element to slide out.
 * @param {string} backgroundId - The ID of the background element to toggle visibility.
 */
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

/**
 * Prevents the default behavior of an event and stops propagation.
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * Opens the last opened HTML page in the browsing history.
 */
function openLastOpenedHTML() {
    window.history.back();
}

/**
 * Opens the Privacy Policy page, saving the last opened HTML page for the back button.
 */
function openPrivacyPolicyLogScreen() {
    localStorage.setItem('backBtn', 'false');
    loggedInUser.push({
        'name': 'nothing',
        'email': 'nothing@nothing.com',
    });
    lastOpenedHTML = window.location.href;
    saveLoggedInUser();
    saveLastOpenedHTML();
    window.open('privacyPolicy.html', '_blank');
}

function openLegalNoticeLogScreen() {
    localStorage.setItem('backBtn', 'false');
    loggedInUser.push({
        'name': 'nothing',
        'email': 'nothing@nothing.com',
    });
    lastOpenedHTML = window.location.href;
    saveLoggedInUser();
    saveLastOpenedHTML();
    window.open('legalNotice.html', '_blank');
}

/**
 * Deletes arrays if the user is a guest and came from the index page.
 */
function guestDeleteArrays() {
    if (document.referrer.includes('index.html')) {
        if (loggedInUser[0].email === 'guest@guest.com') {
            deleteAllTasks();
            deleteContactsArray();
            deleteAllCategories();
        }
    }
}

/**
 * Creates a task array if the user is a guest.
 */
function guestCreateTaskArray() {
    if (loggedInUser[0].email === 'guest@guest.com') {
        const existingTask = taskArray.find(task => task.id === 0);
        if (!existingTask) {
            taskArray.push({
                category: 'Design',
                confirmedSubtasks: [false, true, false],
                contacts: [
                    {
                        name: 'Guest (You)',
                        nameShort: 'G',
                        email: 'guest@guest.com',
                        color: 'grey',
                    },
                    {
                        name: 'Max Mustermann',
                        nameShort: 'MM',
                        email: 'max.mustermann@web.de',
                        phone: '+49123 1234567',
                        color: 'rgb(38, 117, 156)',
                    },
                ],
                date: '30/06/2024',
                description: 'Create a visual representation of the website layout and design, including color schemes and typography.',
                id: 0,
                low: true,
                medium: false,
                progressStatus: 'toDo',
                subtasks: ['Sketch homepage layout', 'Select color palette', 'Choose typography'],
                title: 'Design Website Mockup',
                urgent: false,
            });
        }
    }
}

/**
 * Creates a contact array if the user is a guest.
 */
function guestCreateContactArray() {
    if (loggedInUser[0].email === 'guest@guest.com') {
        const existingContact = contactsArray.find(contact => contact.name === 'Max Mustermann');
        if (!existingContact) {
            contactsArray.push({
                color: 'rgb(38, 117, 156)',
                email: 'max.mustermann@web.de',
                name: 'Max Mustermann',
                nameShort: 'MM',
                phone: '+49123 1234567',
            });
        }
    }
}

/**
 * Displays a temporary message indicating a created item.
 * @param {string} inputText - The text to display on the button.
 */
function createdItemBtn(inputText) {
    let itemCreatedBtn = document.getElementById('itemCreatedBtnId');
    itemCreatedBtn.innerHTML = /*html*/ `
    <button>${inputText}</button>`;
    itemCreatedBtn.classList.remove('dNone');
    setTimeout(function () {
        itemCreatedBtn.classList.add('dNone');
    }, 1000);
}
