/**
 * Represents the status of the "urgent" button.
 * @type {boolean}
 */
let urgentStatus = false;
/**
 * Represents the status of the "medium" button.
 * @type {boolean}
 */
let mediumStatus = false;
/**
 * Represents the status of the "low" button.
 * @type {boolean}
 */
let lowStatus = false;

let onePrioBtnPressed = true;

/**
 * Handles the click event for the "urgent" button.
 */
function urgentBtn() {
    let urgentBtn = document.getElementById('addUrgentId');
    let urgentImg = document.getElementById('urgentImgId');
    let urgentText = document.getElementById('urgentTextId');
    hideError();
    resetButtons();
    mediumStatus = false;
    lowStatus = false;
    if (urgentStatus === false) {
        urgentBtnPressed(urgentImg, urgentBtn, urgentText);
    } else {
        urgentBtnUnpressed(urgentImg, urgentBtn, urgentText);
    }
}

/**
 * Sets the styling and status when the "urgent" button is pressed.
 * @param {HTMLElement} urgentImg - The image element for the "urgent" button.
 * @param {HTMLElement} urgentBtn - The "urgent" button element.
 * @param {HTMLElement} urgentText - The text element for the "urgent" button.
 */
function urgentBtnPressed(urgentImg, urgentBtn, urgentText) {
    urgentImg.src = 'img/urgentWhite.png';
    urgentBtn.style.backgroundColor = '#FF3D00';
    urgentText.style.color = 'white';
    urgentText.style.fontWeight = 'bold';
    urgentStatus = true;
}

/**
 * Resets the styling and status when the "urgent" button is unpressed.
 * @param {HTMLElement} urgentImg - The image element for the "urgent" button.
 * @param {HTMLElement} urgentBtn - The "urgent" button element.
 * @param {HTMLElement} urgentText - The text element for the "urgent" button.
 */
function urgentBtnUnpressed(urgentImg, urgentBtn, urgentText) {
    urgentImg.src = 'img/urgentRed.png';
    urgentBtn.style.backgroundColor = '';
    urgentText.style.color = '';
    urgentText.style.fontWeight = '';
    urgentStatus = false;
}

/**
 * Handles the click event for the "medium" button.
 */
function mediumBtn() {
    resetButtons();
    urgentStatus = false;
    lowStatus = false;
    let mediumBtn = document.getElementById('addMediumId');
    let mediumImg = document.getElementById('mediumImgId');
    let mediumText = document.getElementById('mediumTextId');
    hideError();
    if (mediumStatus === false) {
        mediumBtnPressed(mediumImg, mediumBtn, mediumText);
    } else {
        mediumBtnUnpressed(mediumImg, mediumBtn, mediumText);
    }
}

/**
 * Sets the styling and status when the "medium" button is pressed.
 * @param {HTMLElement} mediumImg - The image element for the "medium" button.
 * @param {HTMLElement} mediumBtn - The "medium" button element.
 * @param {HTMLElement} mediumText - The text element for the "medium" button.
 */
function mediumBtnPressed(mediumImg, mediumBtn, mediumText) {
    mediumImg.src = 'img/mediumWhite.png';
    mediumBtn.style.backgroundColor = '#FFA800';
    mediumText.style.color = 'white';
    mediumText.style.fontWeight = 'bold';
    mediumStatus = true;
}

/**
 * Resets the styling and status when the "medium" button is unpressed.
 * @param {HTMLElement} mediumImg - The image element for the "medium" button.
 * @param {HTMLElement} mediumBtn - The "medium" button element.
 * @param {HTMLElement} mediumText - The text element for the "medium" button.
 */
function mediumBtnUnpressed(mediumImg, mediumBtn, mediumText) {
    mediumImg.src = 'img/mediumOrange.png';
    mediumBtn.style.backgroundColor = '';
    mediumText.style.color = '';
    mediumText.style.fontWeight = '';
    mediumStatus = false;
}

/**
 * Handles the click event for the "low" button.
 */
function lowBtn() {
    resetButtons();
    urgentStatus = false;
    mediumStatus = false;
    let lowBtn = document.getElementById('addLowId');
    let lowImg = document.getElementById('lowImgId');
    let lowText = document.getElementById('lowTextId');
    hideError();
    if (lowStatus === false) {
        lowBtnPressed(lowImg, lowBtn, lowText);
    } else {
        lowBtnUnpressed(lowImg, lowBtn, lowText);
    }
}

/**
 * Sets the styling and status when the "low" button is pressed.
 * @param {HTMLElement} lowImg - The image element for the "low" button.
 * @param {HTMLElement} lowBtn - The "low" button element.
 * @param {HTMLElement} lowText - The text element for the "low" button.
 */
function lowBtnPressed(lowImg, lowBtn, lowText) {
    lowImg.src = 'img/lowWhite.png';
    lowBtn.style.backgroundColor = '#7AE229';
    lowText.style.color = 'white';
    lowText.style.fontWeight = 'bold';
    lowStatus = true;
}

/**
 * Resets the styling and status when the "low" button is unpressed.
 * @param {HTMLElement} lowImg - The image element for the "low" button.
 * @param {HTMLElement} lowBtn - The "low" button element.
 * @param {HTMLElement} lowText - The text element for the "low" button.
 */
function lowBtnUnpressed(lowImg, lowBtn, lowText) {
    lowImg.src = 'img/lowGreen.png';
    lowBtn.style.backgroundColor = '';
    lowText.style.color = '';
    lowText.style.fontWeight = '';
    lowStatus = false;
}

/**
 * Validates the priority buttons and sets the status accordingly.
 * Displays an error message if exactly one priority button is not selected.
 */
function validateButton() {
    if (urgentStatus + mediumStatus + lowStatus !== 1) {
        onePrioBtnPressed = false;
        displayError();
    } else {
        hideError();
        onePrioBtnPressed = true;
    }
}

/**
 * Displays an error message in the designated error container.
 */
function displayError() {
    document.getElementById(`errorContainerBtnId`).innerHTML = `Please select a prioritization`;
}

/**
 * Hides the error message in the designated error container.
 */
function hideError() {
    document.getElementById(`errorContainerBtnId`).innerHTML = '';
}

/**
 * Resets the styling and status for all priority buttons.
 */
function resetButtons() {
    resetButton('addUrgentId', 'urgentImgId', 'urgentTextId', 'img/urgentRed.png');
    resetButton('addMediumId', 'mediumImgId', 'mediumTextId', 'img/mediumOrange.png');
    resetButton('addLowId', 'lowImgId', 'lowTextId', 'img/lowGreen.png');
}

/**
 * Resets the styling and status for a specific priority button.
 * @param {string} buttonId - The ID of the priority button.
 * @param {string} imgId - The ID of the image element associated with the button.
 * @param {string} textId - The ID of the text element associated with the button.
 * @param {string} defaultImgSrc - The default image source for the button.
 */
function resetButton(buttonId, imgId, textId, defaultImgSrc) {
    let button = document.getElementById(buttonId);
    let img = document.getElementById(imgId);
    let text = document.getElementById(textId);
    img.src = defaultImgSrc;
    button.style.backgroundColor = '';
    text.style.color = '';
    text.style.fontWeight = '';
}

/**
 * Clears the status and styling for all priority buttons.
 */
function clearButtons() {
    resetButtons();
    urgentStatus = false;
    mediumStatus = false;
    lowStatus = false;
}
