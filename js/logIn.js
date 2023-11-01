function signUp() {
    toggleVisibility('hideLogInId', false);
    toggleVisibility('hideSignUpHeaderId', false);
    toggleVisibility('showRegisterId', true);
}

function backToLogin() {
    toggleVisibility('hideLogInId', true);
    toggleVisibility('hideSignUpHeaderId', true);
    toggleVisibility('showRegisterId', false);
}

function checkLogIn() {
    let checkImage = document.getElementById('checkLogInId');
    let currentSrc = checkImage.src;
    if (currentSrc.endsWith('uncheck.png')) {
        checkImage.src = 'img/check.png';
    } else {
        checkImage.src = 'img/uncheck.png';
    }
}

function checkSignUp() {
    let checkImage = document.getElementById('checkSignUpId');
    let currentSrc = checkImage.src;
    if (currentSrc.endsWith('uncheck.png')) {
        checkImage.src = 'img/check.png';
    } else {
        checkImage.src = 'img/uncheck.png';
    }
}

function toggleCheckImage(elementId) {
    let checkImage = document.getElementById(elementId);
    let currentSrc = checkImage.src;

    if (currentSrc.endsWith('uncheck.png')) {
        checkImage.src = 'img/check.png';
    } else {
        checkImage.src = 'img/uncheck.png';
    }
}
