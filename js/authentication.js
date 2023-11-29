let users = [];
let rememberMe = [];
let loggedInUser = [];

async function authenticationInit() {
    await saveLoggedInUser();
    await loadUsers();
    await loadRememberMe();
    loadAutoLoginData();
    animationStartScreen();
}

// async function autoLogIn() {
//     let logCheckbox = document.getElementById('logCheckboxId');
//     if (rememberMe.length > 0) {
//         await loadAutoLoginData(logCheckbox);
//         logIn();
//     } else {
//         toggleVisibility('hiddenLoginId', true);
//     }
// }

function loadAutoLoginData() {
    let logCheckbox = document.getElementById('logCheckboxId');
    if (rememberMe.length > 0) {
        let lastRememberedUser = rememberMe[0];
        document.getElementById('logEmailId').value = lastRememberedUser.email;
        document.getElementById('logPasswordId').value = lastRememberedUser.password;
        logCheckbox.checked = true;
    }
}

function logIn() {
    let logInEmail = document.getElementById('logEmailId');
    let logInPassword = document.getElementById('logPasswordId');

    users.forEach(user => {
        if (checkCredential(user, logInEmail, logInPassword)) {
            trueCredential(user);
        } else {
            wrongCredential();
        }
    });
}

function checkCredential(user, logInEmail, logInPassword) {
    return user.email === logInEmail.value && user.password === logInPassword.value;
}

async function trueCredential(user) {
    // who is logged in
    loggedInUser.push({
        'name': user.name,
        'email': user.email,
    });
    saveLoggedInUser();

    // remember me
    let logCheckbox = document.getElementById('logCheckboxId');
    const isValid = logCheckbox.checked;
    rememberMe = [];
    if (isValid) {
        rememberMe.push({
            'email': logEmailId.value,
            'password': logPasswordId.value,
        });
    }
    window.location.href = 'summary.html';
    saveRememberMe();
}

function wrongCredential() {
    let wrongInput = document.getElementById('logPasswordId');
    wrongInput.setCustomValidity(`Wrong email or password`);
}

// login
function signUp() {
    toggleVisibility('hideLogInId', false);
    toggleVisibility('hideSignUpHeaderId', false);
    toggleCheckboxDisabled('regCheckboxId', false);
    toggleVisibility('showRegisterId', true);
    toggleRequiredAttribute('regNameId', true);
    toggleRequiredAttribute('regEmailId', true);
    toggleRequiredAttribute('regPasswordFirstId', true);
    toggleRequiredAttribute('regPasswordSecondId', true);
    toggleVisibility('forgotPasswordAreaId', false);
}

function guestLogIn() {
    let logInEmailText = document.getElementById('logEmailId');
    let logInPasswordText = document.getElementById('logPasswordId');
    logInEmailText.style.color = 'white';
    logInPasswordText.style.color = 'white';
    logInEmailText.value = 'guest@guest.com';
    logInPasswordText.value = 'guest#';
    let logCheckbox = document.getElementById('logCheckboxId');
    if (logCheckbox.checked) {
        logCheckbox.checked = false;
    }
    logIn();
}

function togglePasswordVisibility(inputId, imgId) {
    let passwordInput = document.getElementById(`${inputId}`);
    let passwordImg = document.getElementById(`${imgId}`);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordImg.src = 'img/closeEye.png';
    } else {
        passwordInput.type = 'password';
        passwordImg.src = 'img/lock.png';
    }
}

function showPasswordOpportunity(inputId, imgId) {
    let passwordInput = document.getElementById(`${inputId}`);
    let passwordImg = document.getElementById(`${imgId}`);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'password';
        passwordImg.src = 'img/openEye.png';
    } else {
        passwordInput.type = 'text';
        passwordImg.src = 'img/closeEye.png';
    }
}

// register
function backToLogin() {
    toggleVisibility('hideLogInId', true);
    toggleVisibility('hideSignUpHeaderId', true);
    toggleVisibility('showRegisterId', false);
    toggleCheckboxDisabled('regCheckboxId', true);
    toggleRequiredAttribute('regNameId', false);
    toggleRequiredAttribute('regEmailId', false);
    toggleRequiredAttribute('regPasswordFirstId', false);
    toggleRequiredAttribute('regPasswordSecondId', false);
    toggleVisibility('forgotPasswordAreaId', false);
}

async function deleteUsers() {
    users = [];
    await setItem('users', JSON.stringify(users));
}

function validateCheckbox(checkbox) {
    const isValid = checkbox.checked;
    if (!isValid) {
        checkbox.setCustomValidity('You must accept the privacy policy.');
    } else {
        checkbox.setCustomValidity('');
    }
}

async function register() {
    let passwordFirst = document.getElementById('regPasswordFirstId');
    let passwordSecond = document.getElementById('regPasswordSecondId');
    let regBtn = document.getElementById('regBtnId').innerHTML;
    let regCheckboxStatus = document.getElementById('regCheckboxId');
    let regEmail = document.getElementById('regEmailId');
    let logInEmailValue = document.getElementById('logEmailId');
    let logInPasswordValue = document.getElementById('logPasswordId');
    let logCheckbox = document.getElementById('logCheckboxId');
    regBtn.disabled = true;
    if (passwordsMatch(passwordFirst, passwordSecond)) {
        rememberMe = [];
        saveRememberMe();
        createUser(passwordFirst);
        backToLogin();
        logInEmailValue.value = regEmail.value;
        logInPasswordValue.value = passwordFirst.value;
        resetForm(regBtn, regCheckboxStatus);
        logCheckbox.checked = false;
    } else {
        passwordsDontMatch();
    }
}

function passwordsMatch(passwordFirst, passwordSecond) {
    return passwordFirst.value === passwordSecond.value;
}

async function createUser(passwordFirst) {
    let password = passwordFirst.value;
    users.push({
        name: regNameId.value,
        email: regEmailId.value,
        password: password,
        id: new Date().getTime(),
    });
    await setItem('users', JSON.stringify(users));
}

function resetForm(regBtn, regCheckboxStatus) {
    regNameId.value = '';
    regEmailId.value = '';
    regPasswordFirstId.value = '';
    regPasswordSecondId.value = '';
    regCheckboxStatus.checked = false;
    regBtn.disabled = false;
}

function passwordsDontMatch() {
    const passwordSecond = document.getElementById('regPasswordSecondId');
    passwordSecond.setCustomValidity(`Passwords don't match.`);
    const form = passwordSecond.form;
    form.reportValidity();
}

function animationStartScreen() {
    setTimeout(() => {
        document.getElementById('logInJoinLogoId').classList.remove('notVisible');
        document.getElementById('animationLogInBackgroundId').style.display = 'none';
    }, 1500);
}
