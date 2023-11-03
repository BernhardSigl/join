let users = [];
let rememberMe = [];

async function regInit() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch {
        console.warn('Token invalid becauce no user has been created yet');
    }
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
}

function logIn() {
    let logEmail = document.getElementById('logEmailId').value;
    let logPassword = document.getElementById('logPasswordId').value;
    let checkCredential = users.find(user => user.email === logEmail && user.password === logPassword);
    if (checkCredential) {
        trueCredential();
        console.log('front page is comming');
    } else {
        falseCredential();
    }
}

function trueCredential() {
    let logCheckbox = document.getElementById('logCheckboxId');
    let checkboxIsValid = logCheckbox.checked;
    if (!checkboxIsValid) {
        console.log('invalid');
    } else {
        console.log('valid');
        rememberMe.push({
            email: logEmailId.value,
            password: logPasswordId.value,
        });
        save();
    }
}

function falseCredential() {
    let wrongInput = document.getElementById('logPasswordId');
    wrongInput.setCustomValidity(`Wrong email or password`);
    let form = wrongInput.form;
    form.reportValidity();
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
    users.pop();
}

async function deleteUsers() {
    users = [];
    await setItem('users', JSON.stringify(users));
}

function validateCheckbox(checkbox) {
    const checkboxStatus = document.getElementById('regCheckboxId');
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
    regBtn.disabled = true;
    if (passwordsMatch(passwordFirst, passwordSecond)) {
        createUser(passwordFirst);
        resetForm(regBtn, regCheckboxStatus);
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
