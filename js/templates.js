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

function validateNameInputRegister(input) {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(input.value);
    if (!isValid) {
        input.setCustomValidity('Only letters are allowed.');
    } else {
        input.setCustomValidity('');
    }
}

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

function validateDateInput(input) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const isValid = regex.test(input.value);

    if (!isValid) {
        input.setCustomValidity(`Only numbers and '/' are allowed.`);
    } else {
        input.setCustomValidity('');
    }
}

function validatePhoneInput(input) {
    const regex = /^[0-9\s+\/]+$/;
    const isValid = regex.test(input.value);
    if (!isValid) {
        input.setCustomValidity('Only numbers, spaces, "+", and "/" are allowed.');
    } else {
        input.setCustomValidity('');
    }
}

function validateZeroInput(inputField) {
    if (inputField.value.trim() === '') {
        inputField.setCustomValidity('Please enter at least one character.');
    } else {
        inputField.setCustomValidity('');
    }
}

function setActiveLink() {
    let currentUrl = window.location.href;
    let activeLinkId = "";
    if (currentUrl.includes("summary.html")) {
        activeLinkId = "summaryLinkId";
    } else if (currentUrl.includes("addTask.html")) {
        activeLinkId = "addTaskLinkId";
    } else if (currentUrl.includes("board.html")) {
        activeLinkId = "boardLinkId";
    } else if (currentUrl.includes("contacts.html")) {
        activeLinkId = "contactsLinkId";
    } else if (currentUrl.includes("privacyPolicy.html")) {
        activeLinkId = "privacyPoliciyLinkId";
    } else if (currentUrl.includes("legalNotice.html")) {
        activeLinkId = "legalNoticeLinkId";
    }
    if (activeLinkId !== "") {
        let activeLink = document.getElementById(activeLinkId);
        activeLink.style.backgroundColor = "#091931";
        activeLink.style.pointerEvents = "none";
    }
}

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

function openLastOpenedHTML() {
    window.history.back();
}

let lastOpenedHTML = '';
function openPrivacyPolicyLogScreen() {
    loggedInUser.push({
        'name': 'nothing',
        'email': 'nothing@nothing.com',
    });
    lastOpenedHTML = window.location.href;
    saveLoggedInUser();
    saveLastOpenedHTML();
    window.location.href = 'privacyPolicy.html';
}

function guestDeleteArrays() {
    if (document.referrer.includes('index.html')) {
        if (loggedInUser[0].email === 'guest@guest.com') {
            deleteAllTasks();
            deleteContactsArray();
        }
    }
}

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

function createdItemBtn(inputText) {
    let itemCreatedBtn = document.getElementById('itemCreatedBtnId');

    itemCreatedBtn.innerHTML = /*html*/ `
    <button>${inputText}</button>`;
    itemCreatedBtn.classList.remove('dNone');

    setTimeout(function () {
        itemCreatedBtn.classList.add('dNone');
    }, 1500);
}
