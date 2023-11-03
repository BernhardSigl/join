let users = [];

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
    toggleCheckboxDisabled('checkboxId', false);
    toggleVisibility('showRegisterId', true);
    toggleRequiredAttribute('regNameId', true);
    toggleRequiredAttribute('regEmailId', true);
    toggleRequiredAttribute('regPasswordFirstId', true);
    toggleRequiredAttribute('regPasswordSecondId', true);
}

// register
function backToLogin() {
    toggleVisibility('hideLogInId', true);
    toggleVisibility('hideSignUpHeaderId', true);
    toggleVisibility('showRegisterId', false);
    toggleCheckboxDisabled('checkboxId', true);
    toggleRequiredAttribute('regNameId', false);
    toggleRequiredAttribute('regEmailId', false);
    toggleRequiredAttribute('regPasswordFirstId', false);
    toggleRequiredAttribute('regPasswordSecondId', false);
}

function checkboxStatus() {
    const checkboxStatus = document.getElementById('checkboxId');
    validateCheckbox(checkboxStatus);
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
    const checkboxStatus = document.getElementById('checkboxId');
    regBtn.disabled = true;
    if (passwordsMatch(passwordFirst, passwordSecond)) {
        createUser(passwordFirst);
        resetForm(regBtn, checkboxStatus);
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

function resetForm(regBtn, checkboxStatus) {
    regNameId.value = '';
    regEmailId.value = '';
    regPasswordFirstId.value = '';
    regPasswordSecondId.value = '';
    checkboxStatus.checked = false;
    regBtn.disabled = false;
}

function passwordsDontMatch() {
    const passwordSecond = document.getElementById('regPasswordSecondId');
    passwordSecond.setCustomValidity(`Passwords don't match.`);
    const form = passwordSecond.form;
    form.reportValidity();
}
