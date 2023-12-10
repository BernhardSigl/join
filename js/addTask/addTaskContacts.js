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

function contactsDropdown() {
    document.getElementById('searchContactId').placeholder = "Type to search";
    let dropdownContent = document.getElementById('contactsDropdownContentId');
    let dropdownImg = document.getElementById('contactsDropdownImgId');
    if (dropdownContent.classList.contains('dNone')) {
        dropdownImg.src = './img/arrow_drop_up.svg';
        toggleVisibility('contactsDropdownContentId', true);
    }
}

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

function assignedContacts() {
    let assignedContacts = document.getElementById('assignedContactsId');
    contactsInTaskArray.sort((a, b) => a.name.localeCompare(b.name));
    assignedContacts.innerHTML = '';
    for (let i = 0; i < contactsInTaskArray.length; i++) {
        let contactBelowAssignedTo = contactsInTaskArray[i];
        assignedContacts.innerHTML += generateContactsBelowAssignedTo(contactBelowAssignedTo);
    }
}

function markAssignedContact(i, img) {
    let allAssignedContactContainers = document.getElementById(`assignedContactId${i}`);
    allAssignedContactContainers.style.backgroundColor = "#2A3647";
    allAssignedContactContainers.style.color = "white";
    allAssignedContactContainers.classList.add('darkHoverListContacts');
    img.style.backgroundImage = "url('./img/checkWhite.png')";
}

function unmarkAssignedContact(contact, img, i) {
    let allAssignedContactContainers = document.getElementById(`assignedContactId${i}`);
    img.style.backgroundImage = "url('./img/uncheck.png')";
    allAssignedContactContainers.style.backgroundColor = "white";
    allAssignedContactContainers.style.color = "black";
    allAssignedContactContainers.classList.remove('darkHoverListContacts');
    contactsInTaskArray = contactsInTaskArray.filter((c) => c !== contact);
}