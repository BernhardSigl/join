/**
 * Array to store user data.
 */
let users = [];
/**
 * Array to store email and password for the 'Remember me' feature.
 */
let rememberMe = [];
/**
 * Array to store name and email of the logged-in user.
 */
let loggedInUser = [];

/**
 * Initializes authentication by loading necessary data and triggering a animation.
 */
async function authenticationInit() {
    await saveLoggedInUser();
    await loadUsers();
    await loadRememberMe();
    loadAutoLoginData();
    animationStartScreen();
}

/**
 * Loads auto-login data if 'Remember me' is enabled.
 */
function loadAutoLoginData() {
    let logCheckbox = document.getElementById('logCheckboxId');
    if (rememberMe.length > 0) {
        let lastRememberedUser = rememberMe[0];
        document.getElementById('logEmailId').value = lastRememberedUser.email;
        document.getElementById('logPasswordId').value = lastRememberedUser.password;
        logCheckbox.checked = true;
    }
}

/**
 * Attempts to log in the user by checking credentials.
 */
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

/**
 * Checks if the provided credentials match the user's data.
 * @param {Object} user - User object.
 * @param {HTMLElement} logInEmail - Input element for login email.
 * @param {HTMLElement} logInPassword - Input element for login password.
 * @returns {boolean} - True if credentials match, false otherwise.
 */
function checkCredential(user, logInEmail, logInPassword) {
    return user.email === logInEmail.value && user.password === logInPassword.value;
}

/**
 * Processes successful authentication.
 * @param {Object} user - User object.
 */
function trueCredential(user) {
    checkLoggedInUser(user);
    checkRememberMe();
    window.location.href = 'summary.html';
}

/**
 * Checks the logged-in user and updates data accordingly.
 * @param {Object} user - User object.
 */
async function checkLoggedInUser(user) {
    loggedInUser.push({
        'name': user.name,
        'email': user.email,
    });
    await saveLoggedInUser();
}

/**
 * Checks 'Remember me' status and saves data if enabled.
 */
async function checkRememberMe() {
    const isValid = document.getElementById('logCheckboxId').checked;
    rememberMe = [];
    if (isValid) {
        rememberMe.push({
            'email': logEmailId.value,
            'password': logPasswordId.value,
        });
    }
    await saveRememberMe();
}

/**
 * Handles incorrect credentials by setting custom validity.
 */
function wrongCredential() {
    let wrongInput = document.getElementById('logPasswordId');
    wrongInput.setCustomValidity(`Wrong email or password`);
}

/**
 * Initiates the sign-up process by toggling visibility and attributes.
 */
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

/**
 * Logs in as a guest user with predefined credentials.
 */
function guestLogIn() {
    toggleRequiredAttribute('logPasswordId', false);
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

/**
 * Toggles password visibility for the given input field.
 * @param {string} inputId - ID of the password input field.
 * @param {string} imgId - ID of the associated image for visibility toggle.
 */
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

/**
 * Shows or hides the password based on the current visibility state.
 * @param {string} inputId - ID of the password input field.
 * @param {string} imgId - ID of the associated image for visibility toggle.
 */
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

/**
 * Toggles the visibility of elements to navigate back to the login screen.
 */
function backToLogin() {
    toggleVisibility('hideLogInId', true);
    toggleVisibility('hideSignUpHeaderId', true);
    toggleVisibility('showRegisterId', false);
    toggleCheckboxDisabled('regCheckboxId', true);
    toggleRequiredAttribute('regNameId', false);
    toggleRequiredAttribute('regEmailId', false);
    toggleRequiredAttribute('regPasswordFirstId', false);
    toggleRequiredAttribute('regPasswordSecondId', false);
}

/**
 * Retrieves registration-related data.
 * @returns {Object} An object containing registration data.
 */
function registerData() {
    let passwordFirst = document.getElementById('regPasswordFirstId');
    let passwordSecond = document.getElementById('regPasswordSecondId');
    let regCheckboxStatus = document.getElementById('regCheckboxId');
    let regEmail = document.getElementById('regEmailId');
    let logInEmailValue = document.getElementById('logEmailId');
    let logInPasswordValue = document.getElementById('logPasswordId');
    let logCheckbox = document.getElementById('logCheckboxId');
    let regBtn = document.getElementById('regBtnId').innerHTML;
    return { passwordFirst, passwordSecond, regCheckboxStatus, regEmail, logInEmailValue, logInPasswordValue, logCheckbox, regBtn };
}

/**
 * Initiates the registration process, handling password matching and user creation.
 */
async function register() {
    const { passwordFirst, passwordSecond, regCheckboxStatus, regEmail, logInEmailValue, logInPasswordValue, logCheckbox, regBtn } = registerData();
    regBtn.disabled = true;
    if (passwordsMatch(passwordFirst, passwordSecond)) {
        createdItemBtn('User successfully created');
        rememberMe = [];
        await saveRememberMe();
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

/**
 * Checks if two password fields match.
 * @param {HTMLElement} passwordFirst - The first password input field.
 * @param {HTMLElement} passwordSecond - The second password input field.
 * @returns {boolean} True if passwords match, false otherwise.
 */
function passwordsMatch(passwordFirst, passwordSecond) {
    return passwordFirst.value === passwordSecond.value;
}

/**
 * Creates a new user with the provided password and saves the user data.
 * @param {HTMLElement} passwordFirst - The password input field.
 */
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

/**
 * Resets the form by clearing input values and resetting checkbox status.
 * @param {HTMLElement} regBtn - Button element for registration.
 * @param {HTMLElement} regCheckboxStatus - Checkbox element for registration.
 */
function resetForm(regBtn, regCheckboxStatus) {
    regNameId.value = '';
    regEmailId.value = '';
    regPasswordFirstId.value = '';
    regPasswordSecondId.value = '';
    regCheckboxStatus.checked = false;
    regBtn.disabled = false;
}

/**
 * Handles the case where passwords entered during registration do not match.
 */
function passwordsDontMatch() {
    const passwordSecond = document.getElementById('regPasswordSecondId');
    passwordSecond.setCustomValidity(`Passwords don't match.`);
    const form = passwordSecond.form;
    form.reportValidity();
}

/**
 * Removes the start screen animation after a delay.
 */
function animationStartScreen() {
    setTimeout(() => {
        document.getElementById('logInJoinLogoId').classList.remove('notVisible');
        document.getElementById('animationLogInBackgroundId').style.display = 'none';
    }, 1500);
}