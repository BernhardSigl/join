let urgentStatus = false;
let mediumStatus = false;
let lowStatus = false;

function urgentBtn() {
    let urgentBtn = document.getElementById('addUrgentId');
    let urgentImg = document.getElementById('urgentImgId');
    let urgentText = document.getElementById('urgentTextId');
    resetButtons();
    mediumStatus = false;
    lowStatus = false;
    if (urgentStatus === false) {
        urgentBtnPressed(urgentImg, urgentBtn, urgentText);
    } else {
        urgentBtnUnpressed(urgentImg, urgentBtn, urgentText);
    }
}

function urgentBtnPressed(urgentImg, urgentBtn, urgentText) {
    urgentImg.src = 'img/urgentWhite.png';
    urgentBtn.style.backgroundColor = '#FF3D00';
    urgentText.style.color = 'white';
    urgentText.style.fontWeight = 'bold';
    urgentStatus = true;
}

function urgentBtnUnpressed(urgentImg, urgentBtn, urgentText) {
    urgentImg.src = 'img/urgentRed.png';
    urgentBtn.style.backgroundColor = '';
    urgentText.style.color = '';
    urgentText.style.fontWeight = '';
    urgentStatus = false;
}

function mediumBtn() {
    resetButtons();
    urgentStatus = false;
    lowStatus = false;
    let mediumBtn = document.getElementById('addMediumId');
    let mediumImg = document.getElementById('mediumImgId');
    let mediumText = document.getElementById('mediumTextId');
    if (mediumStatus === false) {
        mediumBtnPressed(mediumImg, mediumBtn, mediumText);
    } else {
        mediumBtnUnpressed(mediumImg, mediumBtn, mediumText);
    }
}

function mediumBtnPressed(mediumImg, mediumBtn, mediumText) {
    mediumImg.src = 'img/mediumWhite.png';
    mediumBtn.style.backgroundColor = '#FFA800';
    mediumText.style.color = 'white';
    mediumText.style.fontWeight = 'bold';
    mediumStatus = true;
}

function mediumBtnUnpressed(mediumImg, mediumBtn, mediumText) {
    mediumImg.src = 'img/mediumOrange.png';
    mediumBtn.style.backgroundColor = '';
    mediumText.style.color = '';
    mediumText.style.fontWeight = '';
    mediumStatus = false;
}

function lowBtn() {
    resetButtons();
    urgentStatus = false;
    mediumStatus = false;
    let lowBtn = document.getElementById('addLowId');
    let lowImg = document.getElementById('lowImgId');
    let lowText = document.getElementById('lowTextId');
    if (lowStatus === false) {
        lowBtnPressed(lowImg, lowBtn, lowText);
    } else {
        lowBtnUnpressed(lowImg, lowBtn, lowText);
    }
}

function lowBtnPressed(lowImg, lowBtn, lowText) {
    lowImg.src = 'img/lowWhite.png';
    lowBtn.style.backgroundColor = '#7AE229';
    lowText.style.color = 'white';
    lowText.style.fontWeight = 'bold';
    lowStatus = true;
}

function lowBtnUnpressed(lowImg, lowBtn, lowText) {
    lowImg.src = 'img/lowGreen.png';
    lowBtn.style.backgroundColor = '';
    lowText.style.color = '';
    lowText.style.fontWeight = '';
    lowStatus = false;
}

function resetButtons() {
    resetButton('addUrgentId', 'urgentImgId', 'urgentTextId', 'img/urgentRed.png');
    resetButton('addMediumId', 'mediumImgId', 'mediumTextId', 'img/mediumOrange.png');
    resetButton('addLowId', 'lowImgId', 'lowTextId', 'img/lowGreen.png');
}

function resetButton(buttonId, imgId, textId, defaultImgSrc) {
    let button = document.getElementById(buttonId);
    let img = document.getElementById(imgId);
    let text = document.getElementById(textId);
    img.src = defaultImgSrc;
    button.style.backgroundColor = '';
    text.style.color = '';
    text.style.fontWeight = '';
}

function clearButtons() {
    resetButtons();
    urgentStatus = false;
    mediumStatus = false;
    lowStatus = false;
}