let nameShortArray = [];
let selectedColor = '#D1D1D1';
let nameShortReturn;
let lastFirstLetter = '';
let userContactsArray = [];
let userId = null;
let contactsArray;

async function deleteContactsArray() {
    contactsArray = [];
    await setItem(`individuallyContacts_${userId}`, JSON.stringify(contactsArray));
}

async function initContacts() {
    navPanelsTemplate();
    navPanelPopupTemplate();
    addContactPopupContent();
    editContactPopupContent();
    await loadLoggedInUser();
    await loadUsers();
    await createIndividuallyContactsArray();
    await loadIndividuallyContacts();
    await createLoggedInUser();
    guestCreateContactArray();
    await renderContacts(); // two times because of "async"
    await renderContacts();
    loggedInUserNotClickable();
    toggleVisibility('loaderContainerId', false);
}

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

function sortContacts() {
    contactsArray.sort((a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' }));
}

function categoryContacts(contact, contactsInScrollbar) {
    let firstLetter = contact.name.charAt(0).toUpperCase();
    if (firstLetter !== lastFirstLetter) {
        contactsInScrollbar.innerHTML += generateContactsCategoryHTML(firstLetter);
        lastFirstLetter = firstLetter;
    }
}

function generateContactsCategoryHTML(firstLetter) {
    return /* html */ `
    <div class="categoryContactsArea">
        <div class="fontSize20 categoryContacts">
            ${firstLetter}
        </div>
        <div class="partingLine">
        </div>
    </div>
    `;
}

function generateContactsInScrollbarHTML(contact, i) {
    return /*html*/ `
    <div class="dFlex gap35 contactInfoSmall alignCenter pointer" onclick="openContactInfo(${i})" id="contactInfoSmallId${i}">
        <div class="nameShortSmall horizontalAndVertical pointer" style="background-color: ${contact.color};"  id="nameShortSmallId${i}">
            <span class="fontWhite fontSize12 pointer mb2" id="nameShortSmallText${i}">${contact.nameShort}</span>
        </div>
        <div class="column gap5 contactSmallView">
            <span class="fontSize20 pointer contactSmallName" id="contactNameSmallId${i}">${contact.name}</span>
            <span class="fontSize16 fontBrightBlue pointer contactSmallEmail" id="contactEmailSmallId${i}">${contact.email}</span>
        </div>
    </div>`
}

async function createContact() {
    let nameInput = document.getElementById('addNameId').value;
    let emailInput = document.getElementById('addEmailId').value;
    let phoneInput = document.getElementById('addPhoneId').value;
    let createContact = {
        "name": nameInput,
        "nameShort": nameShort(nameInput),
        "email": emailInput,
        "phone": phoneInput,
        "color": selectedColor,
    };
    contactsArray.push(createContact);
    slideOutTwoObjects('addContactAreaId', 'backgroundAddContactId');
    await renderContacts();
    await renderContacts();
    await setItem(`individuallyContacts_${userId}`, JSON.stringify(contactsArray));
    if (window.location.href.includes("contacts.html")) {
        loggedInUserNotClickable();
    }
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
    createdItemBtn('Contact successfully created');
}

// color function
oninput = function (event) {
    let selectedColor = event.target.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(selectedColor)) {
        updateSelectedColor(selectedColor);
    }
};

function updateSelectedColor(color) {
    document.getElementById("chooseColorId").style.backgroundColor = color;
    selectedColor = color;
    if (window.location.pathname.endsWith('contacts.html')) {
        document.getElementById("profileColorId").style.backgroundColor = color;
        selectedColor = color;
    }
}

// name short function
function nameShort(name) {
    let nameParts = name.split(' ');
    let firstName = nameParts[0];
    let lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
}

//big info
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

function gernerateEditContactPopupMobile(i) {
    return /*html*/ `
    <a class="dFlex gap8 alignCenter editContactArea pointer" onclick="openEditTaskPopup(${i})">
        <img src="img/pencilDark.png" class="symbol24 pointer">
        <span class="fontSize16 fontBlue pointer">Edit</span>
    </a>
    <a class="dFlex gap8 alignCenter deleteContactArea pointer" onclick="deleteContact(${i}); slideOutOneObject('editContactPopupId');     document.getElementById('rightContainerId').style.setProperty('display', 'none');">
        <img src="img/garbageDark.png" class="symbol24 pointer">
        <span class="fontSize16 fontBlue pointer">Delete</span>
    </a>
    `;
}

function generateContactInfoHTML(onClickedContact, i) {
    return /*html*/ `
    <div class="dFlex gap54 alignCenter nameEditDeleteArea">
        <div>
            <div class="nameShortBig horizontalAndVertical" style="background-color: ${onClickedContact.color};">
                <span class="fontWhite fontSize47">${onClickedContact.nameShort}</span>
            </div>
        </div>
        <div class="column gap8">
            <span class="fontSize47 nameOnBigView">${onClickedContact.name}</span>
            <div class="dFlex gap16 editContactBigViewArea">
                <a class="dFlex gap8 alignCenter editContactArea pointer" onclick="openEditTaskPopup(${i})">
                    <img src="img/pencilDark.png" class="symbol24 pointer">
                    <span class="fontSize16 fontBlue pointer">Edit</span>
                </a>
                <a class="dFlex gap8 alignCenter deleteContactArea pointer" onclick="deleteContact(${i})">
                    <img src="img/garbageDark.png" class="symbol24 pointer">
                    <span class="fontSize16 fontBlue pointer">Delete</span>
                </a>
            </div>
        </div>
        </div>
        <span class="fontSize20 contactInfoTextBlock alignCenter">
            Contact Information
        </span>
        <div class="column gap15">
            <span class="fontSize16 bold">
            Email
            </span>
            <a class="fontSize16 fontBrightBlue pointer emailOnBigView" href="mailto:${onClickedContact.email}">
            ${onClickedContact.email}
            </a>
        </div>
        <div class="column gap15">
            <span class="fontSize16 bold">
                Phone
            </span>
            <a class="fontSize16 fontBlue pointer phoneOnBigView" href="tel:${onClickedContact.phone}">
            ${onClickedContact.phone}
            </a>
        </div>
    </div>
    `
}

function editContact(i) {
    document.getElementById('editNameId').value = contactsArray[i].name;
    document.getElementById('editEmailId').value = contactsArray[i].email;
    document.getElementById('editPhoneId').value = contactsArray[i].phone;
    document.getElementById('profileColorId').style.background = contactsArray[i].color;
}

async function saveContact(i) {
    let editedName = document.getElementById('editNameId').value;
    let editedEmail = document.getElementById('editEmailId').value;
    let editedPhone = document.getElementById('editPhoneId').value;
    let editedColor = document.getElementById('profileColorId').style.background;
    let editedContact = {
        "name": editedName,
        "nameShort": nameShort(editedName),
        "email": editedEmail,
        "phone": editedPhone,
        "color": editedColor,
    };
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

function markContact(i) {
    let contactsInScrollbar = document.getElementById(`contactInfoSmallId${i}`);
    let allContactContainers = document.querySelectorAll('.contactInfoSmall');
    allContactContainers.forEach(container => {
        container.classList.remove('markContact');
    });
    contactsInScrollbar.classList.add('markContact');
}

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

function loggedInUserNotClickable() {
    let indexOfLoggedInUser = contactsArray.findIndex(contact => contact.email === loggedInUser[0].email);
    let loggedInUserInContactList = document.getElementById(`contactInfoSmallId${indexOfLoggedInUser}`);
    let nameShortSmallId = document.getElementById(`nameShortSmallId${indexOfLoggedInUser}`);
    let nameShortSmallText = document.getElementById(`nameShortSmallText${indexOfLoggedInUser}`);
    let contactNameSmallId = document.getElementById(`contactNameSmallId${indexOfLoggedInUser}`);
    let contactEmailSmallId = document.getElementById(`contactEmailSmallId${indexOfLoggedInUser}`);
    loggedInUserInContactList.removeAttribute('onclick');
    loggedInUserInContactList.style.setProperty('cursor', 'not-allowed', 'important');
    nameShortSmallId.style.setProperty('cursor', 'not-allowed', 'important');
    nameShortSmallText.style.setProperty('cursor', 'not-allowed', 'important');
    contactNameSmallId.style.setProperty('cursor', 'not-allowed', 'important');
    contactEmailSmallId.style.setProperty('cursor', 'not-allowed', 'important');
}

//mobile
function closeBigViewMobile() {
    document.getElementById('rightContainerId').style.setProperty('display', 'none');
    document.getElementById('editContactPrePopupId').style.setProperty('display', 'none', 'important');
    document.getElementById('backArrowMobileId').style.setProperty('display', 'none', 'important');
    slideOutOneObject('editContactPopupId');
}