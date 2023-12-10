/**
 * Lists contacts in the task assignment dropdown.
 */
function listContacts() {
    let listContacts = document.getElementById('assignToId');
    contactsArray.sort((a, b) => {
        if (a.email === loggedInUser[0].email) return -1;
        if (b.email === loggedInUser[0].email) return 1;
        return 0;
    });
    listContacts.innerHTML = '';
    for (let i = 0; i < contactsArray.length; i++) {
        let contact = contactsArray[i];
        listContacts.innerHTML += generateListContactsHTML(contact, i);
    }
}

/**
 * Filters contacts based on the search input in the task assignment dropdown.
 */
function filterContacts() {
    let searchInput = document.getElementById('searchContactId');
    let searchText = searchInput.value.toLowerCase();
    for (let i = 0; i < contactsArray.length; i++) {
        let contact = contactsArray[i];
        let selectedContact = document.getElementById(`assignedContactId${i}`);
        if (contact.name.toLowerCase().includes(searchText)) {
            selectedContact.style.display = 'flex';
        } else {
            selectedContact.style.display = 'none';
        }
    }
}

/**
 * Handles the behavior of the contacts dropdown, showing or hiding the content.
 */
function contactsDropdown() {
    document.getElementById('searchContactId').placeholder = "Type to search";
    let dropdownContent = document.getElementById('contactsDropdownContentId');
    let dropdownImg = document.getElementById('contactsDropdownImgId');
    if (dropdownContent.classList.contains('dNone')) {
        dropdownImg.src = './img/arrow_drop_up.svg';
        toggleVisibility('contactsDropdownContentId', true);
    }
}

/**
 * Toggles the visibility of the contacts dropdown content and adjusts the dropdown icon.
 */
function toggleContactsDrowdown() {
    document.getElementById('searchContactId').placeholder = "Select contacts to assign";
    let dropdownContent = document.getElementById('contactsDropdownContentId');
    let dropdownImg = document.getElementById('contactsDropdownImgId');
    if (!dropdownContent.classList.contains('dNone')) {
        dropdownImg.src = 'img/drowndown.png';
        toggleVisibility('contactsDropdownContentId', false);
        assignedContacts();
    } else {
        contactsDropdown();
    }
}

/**
 * Toggles the check/uncheck status of a contact in the dropdown and updates the assigned contacts array.
 * @param {string} id - The ID of the contact's checkbox image element.
 * @param {number} i - The index of the contact in the contacts array.
 */
function toggleCheckContact(id, i) {
    contact = contactsArray[i];
    let img = document.getElementById(id);
    if (img.style.backgroundImage.includes("uncheck.png")) {
        markAssignedContact(i, img);
        contactsInTaskArray.push(contact);
    } else {
        unmarkAssignedContact(contact, img, i);
    }
}

/**
 * Updates the list of assigned contacts.
 */
function assignedContacts() {
    let assignedContacts = document.getElementById('assignedContactsId');
    contactsInTaskArray.sort((a, b) => a.name.localeCompare(b.name));
    assignedContacts.innerHTML = '';
    for (let i = 0; i < contactsInTaskArray.length; i++) {
        let contactBelowAssignedTo = contactsInTaskArray[i];
        assignedContacts.innerHTML += generateContactsBelowAssignedTo(contactBelowAssignedTo);
    }
}

/**
 * Marks a contact as assigned in the dropdown and updates the assigned contacts array.
 * @param {number} i - The index of the contact in the contacts array.
 * @param {Element} img - The checkbox image element of the contact.
 */
function markAssignedContact(i, img) {
    let allAssignedContactContainers = document.getElementById(`assignedContactId${i}`);
    allAssignedContactContainers.style.backgroundColor = "#2A3647";
    allAssignedContactContainers.style.color = "white";
    allAssignedContactContainers.classList.add('darkHoverListContacts');
    img.style.backgroundImage = "url('./img/checkWhite.png')";
}

/**
 * Unmarks a contact as assigned in the dropdown and updates the assigned contacts array.
 * @param {Object} contact - The contact object.
 * @param {Element} img - The checkbox image element of the contact.
 * @param {number} i - The index of the contact in the contacts array.
 */
function unmarkAssignedContact(contact, img, i) {
    let allAssignedContactContainers = document.getElementById(`assignedContactId${i}`);
    img.style.backgroundImage = "url('./img/uncheck.png')";
    allAssignedContactContainers.style.backgroundColor = "white";
    allAssignedContactContainers.style.color = "black";
    allAssignedContactContainers.classList.remove('darkHoverListContacts');
    contactsInTaskArray = contactsInTaskArray.filter((c) => c !== contact);
}