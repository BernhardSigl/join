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
        contactsInScrollbar.innerHTML += generateContactsInScrollbarHTML(contact);
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

function generateContactsInScrollbarHTML(contact) {
    return /*html*/ `
    <div class="dFlex gap35 contactInfoSmall alignCenter pointer">
        <div class="nameShortSmall horizontalAndVertical pointer" style="background-color: ${contact.color};">
            <span class="fontWhite fontSize12 pointer">${contact.nameShort}</span>
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

