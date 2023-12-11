/**
 * Generates HTML for a category in the contacts list based on the first letter.
 * @param {string} firstLetter - The first letter for the category.
 * @returns {string} - The generated HTML.
 */
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

/**
 * Generates HTML for a contact in the contacts list.
 * @param {Object} contact - The contact information.
 * @param {number} i - The index of the contact.
 * @returns {string} - The generated HTML.
 */
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

/**
 * Generates HTML for the edit and delete options in the mobile contact popup.
 * @param {number} i - The index of the contact.
 * @returns {string} - The generated HTML.
 */
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

/**
 * Generates HTML for the contact information in the big view.
 * @param {Object} onClickedContact - The clicked contact information.
 * @param {number} i - The index of the contact.
 * @returns {string} - The generated HTML.
 */
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