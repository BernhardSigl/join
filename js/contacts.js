let contactsArray = [];
let nameShortArray = [];
let selectedColor = '#D1D1D1';
let nameShortReturn;
let lastFirstLetter = null;

async function deleteArray() {
    contactsArray = [];
    await setItem('contactsArray', JSON.stringify(contactsArray));
}

async function initContacts() {
    navPanelsTemplate();
    addContactPopupContent();
    editContactPopupContent();
    await loadContacts();
    renderContacts();
}

function renderContacts() {
    let contactsInScrollbar = document.getElementById('contactsInScrollbarId');
    contactsInScrollbar.innerHTML = '';
    for (let i = 0; i < contactsArray.length; i++) {
        let contact = contactsArray[i];
        sortContacts(contactsArray);
        categoryContacts(contact, contactsInScrollbar);
        contactsInScrollbar.innerHTML += generateContactsInScrollbarHTML(contact, i);
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
    <div>
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
        <div class="nameShortSmall horizontalAndVertical pointer" style="background-color: ${contact.color};">
            <span class="fontWhite fontSize12 pointer mb2">${contact.nameShort}</span>
        </div>
        <div class="column gap5">
            <span class="fontSize20 pointer">${contact.name}</span>
            <span class="fontSize16 fontBrightBlue pointer">${contact.email}</span>
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
    }
    contactsArray.push(createContact);
    await setItem('contactsArray', JSON.stringify(contactsArray));
    closeContactPopup();
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
    onClickedContact = contactsArray[i];
    contactInfo.innerHTML = generateContactInfoHTML(onClickedContact, i);
}

function generateContactInfoHTML(onClickedContact, i) {
    return /*html*/ `
    <div class="dFlex gap54 alignCenter">
        <div>
            <div class="nameShortBig horizontalAndVertical" style="background-color: ${onClickedContact.color};">
                <span class="fontWhite fontSize47">${onClickedContact.nameShort}</span>
            </div>
        </div>
        <div class="column gap8">
            <span class="fontSize47">${onClickedContact.name}</span>
            <div class="dFlex gap16">
                <a class="dFlex gap8 alignCenter editContactArea pointer" onclick="openEditTaskPopup()">
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
            <a class="fontSize16 fontBrightBlue pointer" href="mailto:${onClickedContact.email}">
            ${onClickedContact.email}
            </a>
        </div>
        <div class="column gap15">
            <span class="fontSize16 bold">
                Phone
            </span>
            <a class="fontSize16 fontBlue pointer" href="tel:${onClickedContact.phone}">
            ${onClickedContact.phone}
            </a>
        </div>
    </div>
    `
}

function deleteContact(i) {
    toggleVisibility('contactInfoId', false);
    contactsArray.splice(i, 1);
    renderContacts();
}

function markContact(i) {
    let contactsInScrollbar = document.getElementById(`contactInfoSmallId${i}`);
    let allContactContainers = document.querySelectorAll('.contactInfoSmall');
    allContactContainers.forEach(container => {
        container.classList.remove('markContact');
    });
    contactsInScrollbar.classList.add('markContact');
}