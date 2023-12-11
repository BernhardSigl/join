/**
 * Array to store shortened names.
 * @type {Array}
 */
let nameShortArray = [];
/**
 * The selected color for contacts.
 * @type {string}
 */
let selectedColor = '#D1D1D1';
/**
 * Variable to hold the name short returned value.
 * @type {string}
 */
let nameShortReturn;
/**
 * Variable to store the last first letter.
 * @type {string}
 */
let lastFirstLetter = '';
/**
 * Array to store user contacts.
 * @type {Array}
 */
let userContactsArray = [];
/**
 * The user Id.
 * @type {Number}
 */
let userId = null;
/**
 * Array to store contacts.
 * @type {Array}
 */
let contactsArray;

/**
 * Initializes the contacts.
 */
async function initContacts() {
    navPanelsTemplate();
    navPanelPopupTemplate();
    addContactPopupContent();
    editContactPopupContent();
    await loadLoggedInUser();
    await loadUsers();
    await loadContacts();
    await createLoggedInUser();
    guestCreateContactArray();
    await renderContacts(); // two times because of "async"
    await renderContacts();
    loggedInUserNotClickable();
    disableLoadingScreenContacts();
}

/**
 * Loads contacts.
 */
async function loadContacts() {
    await createIndividuallyContactsArray();
    await loadIndividuallyContacts();
}

/**
 * Creates the individually contacts array.
 */
async function createIndividuallyContactsArray() {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        userId = user.id;
        if (loggedInUser[0].email === user.email) {
            contactsArray = user[`individuallyContacts_${userId}`] = [];
            return userId, contactsArray;
        }
    }
}

/**
 * Deletes the contacts array.
 */
async function deleteContactsArray() {
    contactsArray = [];
    await setItem(`individuallyContacts_${userId}`, JSON.stringify(contactsArray));
}

/**
 * Disables the loading screen and makes the contacts page visible.
 */
function disableLoadingScreenContacts() {
    toggleVisibility('contactsTemplateId', true);
    toggleVisibility('loaderContainerId', false);
}

/**
 * Renders the contacts.
 */
async function renderContacts() {
    if (window.location.pathname.endsWith('contacts.html')) {
        let contactsInScrollbar = document.getElementById('contactsInScrollbarId');
        contactsInScrollbar.innerHTML = '';
        for (let i = 0; i < contactsArray.length; i++) {
            let contact = contactsArray[i];
            sortContacts(contactsArray);
            categoryContacts(contact, contactsInScrollbar);
            contactsInScrollbar.innerHTML += generateContactsInScrollbarHTML(contact, i);
        }
    }
}

/**
 * Sorts the contacts array.
 */
function sortContacts() {
    contactsArray.sort((a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' }));
}

/**
 * Categorizes the contacts.
 * @param {Object} contact - The contact object.
 * @param {HTMLElement} contactsInScrollbar - The element to display the contacts.
 */
function categoryContacts(contact, contactsInScrollbar) {
    let firstLetter = contact.name.charAt(0).toUpperCase();
    if (firstLetter !== lastFirstLetter) {
        contactsInScrollbar.innerHTML += generateContactsCategoryHTML(firstLetter);
        lastFirstLetter = firstLetter;
    }
}

/**
 * Creates a contact.
 */
async function createContact() {
    let createContact = createContactData();
    contactsArray.push(createContact);
    slideOutTwoObjects('addContactAreaId', 'backgroundAddContactId');
    await renderContacts();
    await renderContacts();
    await setItem(`individuallyContacts_${userId}`, JSON.stringify(contactsArray));
    if (window.location.href.includes("contacts.html") || window.location.href.includes("/contacts")) {
        loggedInUserNotClickable();
    }
    createContactAddTaskBoardBehavior();
    createdItemBtn('Contact successfully created');
}

/**
 * Creates contact data.
 * @returns {Object} - The contact data.
 */
function createContactData() {
    let nameInput = document.getElementById('addNameId').value;
    let emailInput = document.getElementById('addEmailId').value;
    let phoneInput = document.getElementById('addPhoneId').value;
    return {
        "name": nameInput,
        "nameShort": nameShort(nameInput),
        "email": emailInput,
        "phone": phoneInput,
        "color": selectedColor,
    };
}

/**
 * Creates contact behavior for adding tasks and boards.
 */
function createContactAddTaskBoardBehavior() {
    if (window.location.href.includes("addTask.html") || window.location.href.includes("board.html")) {
        listContacts();
        for (let j = 0; j < contactsArray.length; j++) {
            let contact = contactsArray[j];
            if (contactsInTaskArray.some(item => item.name === contact.name)) {
                toggleCheckContact(`checkContactImgId${j}`, j);
            }
        }
        const deleteRestArray = Math.ceil(contactsInTaskArray.length / 2);
        contactsInTaskArray.splice(deleteRestArray);
    }
}

/**
 * Handles the color change input event.
 * @param {Event} event - The input event.
 */
oninput = function (event) {
    let selectedColor = event.target.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(selectedColor)) {
        updateSelectedColor(selectedColor);
    }
};

/**
 * Updates the selected color.
 * @param {string} color - The selected color.
 */
function updateSelectedColor(color) {
    document.getElementById("chooseColorId").style.backgroundColor = color;
    selectedColor = color;
    if (window.location.pathname.endsWith('contacts.html')) {
        document.getElementById("profileColorId").style.backgroundColor = color;
        selectedColor = color;
    }
}

/**
 * Shortens a name.
 * @param {string} name - The full name.
 * @returns {string} - The shortened name.
 */
function nameShort(name) {
    let nameParts = name.split(' ');
    let firstName = nameParts[0];
    let lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
}

/**
 * Opens contact information.
 * @param {number} i - The index of the contact.
 */
function openContactInfo(i) {
    let contactInfo = document.getElementById('contactInfoId');
    markContact(i)
    slideOneObject('contactInfoId');
    document.getElementById('rightContainerId').style.setProperty('display', 'flex', 'important');
    document.getElementById('editContactPrePopupId').style.setProperty('display', 'flex', 'important');
    document.getElementById('backArrowMobileId').style.setProperty('display', 'flex', 'important');
    onClickedContact = contactsArray[i];
    contactInfo.innerHTML = generateContactInfoHTML(onClickedContact, i);
    let editContactPopupMobile = document.getElementById('editContactPopupId');
    editContactPopupMobile.innerHTML = gernerateEditContactPopupMobile(i);
    slideOutOneObject('editContactPopupId');
}

/**
 * Edits a contact.
 * @param {number} i - The index of the contact.
 */
function editContact(i) {
    document.getElementById('editNameId').value = contactsArray[i].name;
    document.getElementById('editEmailId').value = contactsArray[i].email;
    document.getElementById('editPhoneId').value = contactsArray[i].phone;
    document.getElementById('profileColorId').style.background = contactsArray[i].color;
}

/**
 * Saves a contact.
 * @param {number} i - The index of the contact.
 */
async function saveContact(i) {
    let editedContact = saveContactData();
    contactsArray[i] = editedContact;
    toggleVisibility('contactInfoId', false);
    closeEditContactPopup();
    await setItem(`individuallyContacts_${userId}`, JSON.stringify(contactsArray));
    await renderContacts();
    await renderContacts();
    loggedInUserNotClickable();
    closeBigViewMobile();
    createdItemBtn('Contact successfully saved');
}

/**
 * Saves the contact data.
 * @returns {Object} - The edited contact data.
 */
function saveContactData() {
    let editedName = document.getElementById('editNameId').value;
    let editedEmail = document.getElementById('editEmailId').value;
    let editedPhone = document.getElementById('editPhoneId').value;
    let editedColor = document.getElementById('profileColorId').style.background;
    return {
        "name": editedName,
        "nameShort": nameShort(editedName),
        "email": editedEmail,
        "phone": editedPhone,
        "color": editedColor,
    };
}

/**
 * Deletes a contact.
 * @param {number} i - The index of the contact to delete.
 */
async function deleteContact(i) {
    document.getElementById('cancelBtn').disabled = true;
    document.getElementById('deleteBtnId').disabled = true;
    toggleVisibility('contactInfoId', false);
    contactsArray.splice(i, 1);
    closeEditContactPopup();
    await setItem(`individuallyContacts_${userId}`, JSON.stringify(contactsArray));
    await renderContacts();
    loggedInUserNotClickable();
    closeBigViewMobile();
    createdItemBtn('Contact successfully deleted');
}

/**
 * Marks a contact.
 * @param {number} i - The index of the contact to mark.
 */
function markContact(i) {
    let contactsInScrollbar = document.getElementById(`contactInfoSmallId${i}`);
    let allContactContainers = document.querySelectorAll('.contactInfoSmall');
    allContactContainers.forEach(container => {
        container.classList.remove('markContact');
    });
    contactsInScrollbar.classList.add('markContact');
}

/**
 * Creates the logged-in user if not already present.
 * @async
 */
async function createLoggedInUser() {
    let contactExists = contactsArray.some(contact => contact.email === loggedInUser[0].email);
    if (!contactExists) {
        let createContact = {
            "name": loggedInUser[0].name + ' (You)',
            "nameShort": nameShort(loggedInUser[0].name),
            "email": loggedInUser[0].email,
            "color": 'grey',
        };
        contactsArray.push(createContact);
        await setItem(`individuallyContacts_${userId}`, JSON.stringify(contactsArray));
    }
}

/**
 * Disables clicks on the logged-in user in the contacts list.
 */
function loggedInUserNotClickable() {
    let indexOfLoggedInUser = contactsArray.findIndex(contact => contact.email === loggedInUser[0].email);
    let loggedInUserInContactList = document.getElementById(`contactInfoSmallId${indexOfLoggedInUser}`);
    let nameShortSmallId = document.getElementById(`nameShortSmallId${indexOfLoggedInUser}`);
    let nameShortSmallText = document.getElementById(`nameShortSmallText${indexOfLoggedInUser}`);
    let contactNameSmallId = document.getElementById(`contactNameSmallId${indexOfLoggedInUser}`);
    let contactEmailSmallId = document.getElementById(`contactEmailSmallId${indexOfLoggedInUser}`);
    console.log(loggedInUserInContactList);
    loggedInUserInContactList.removeAttribute('onclick');
    loggedInUserProperty(loggedInUserInContactList, nameShortSmallId, nameShortSmallText, contactNameSmallId, contactEmailSmallId);
}

/**
 * Sets properties for the logged-in user.
 * @param {HTMLElement} loggedInUserInContactList - The container for the logged-in user.
 * @param {HTMLElement} nameShortSmallId - The container for the shortened name display.
 * @param {HTMLElement} nameShortSmallText - The container for the text of the shortened name display.
 * @param {HTMLElement} contactNameSmallId - The container for the contact's name.
 * @param {HTMLElement} contactEmailSmallId - The container for the contact's email.
 */
function loggedInUserProperty(loggedInUserInContactList, nameShortSmallId, nameShortSmallText, contactNameSmallId, contactEmailSmallId) {
    loggedInUserInContactList.style.setProperty('cursor', 'not-allowed', 'important');
    nameShortSmallId.style.setProperty('cursor', 'not-allowed', 'important');
    nameShortSmallText.style.setProperty('cursor', 'not-allowed', 'important');
    contactNameSmallId.style.setProperty('cursor', 'not-allowed', 'important');
    contactEmailSmallId.style.setProperty('cursor', 'not-allowed', 'important');
}

/**
 * Closes the big view on mobile devices.
 */
function closeBigViewMobile() {
    document.getElementById('rightContainerId').style.setProperty('display', 'none');
    document.getElementById('editContactPrePopupId').style.setProperty('display', 'none', 'important');
    document.getElementById('backArrowMobileId').style.setProperty('display', 'none', 'important');
    slideOutOneObject('editContactPopupId');
}