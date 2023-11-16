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

function validateDateInput(input) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const isValid = regex.test(input.value);

    if (!isValid) {
        input.setCustomValidity(`Only numbers and '/' are allowed.`);
    } else {
        input.setCustomValidity('');
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
    }, 500);
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

function toggleFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}

function enterFullscreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
}