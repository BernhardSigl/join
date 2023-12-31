/**
 * Opens the add contact popup, displaying the necessary content.
 */
function openAddContactPopup() {
    addContactPopupContent();
    slideTwoObjects('addContactAreaId', 'backgroundAddContactId');
}

/**
 * Populates the content of the add contact popup.
 */
function addContactPopupContent() {
    document.getElementById('addContactAreaId').innerHTML = generateAddContactContentHTML();
}

/**
 * Generates HTML content for the add contact popup.
 * @returns {string} - The HTML content for the add contact popup.
 */
function generateAddContactContentHTML() {
    return /*html*/`
            <div class="leftContainerAddContact relative">
                <!-- close popup mobile -->
                <div class="closePopup dNone" onclick="slideOutTwoObjects('addContactAreaId', 'backgroundAddContactId');">
                    <img src="img/crossWhite.png" class="symbol24 changeCrossToWhite">
                </div>
                <img src="img/joinLogoBright.svg" class="joinLogoAddTask">
                <div class="titleAddContact column gap8">
                    <span class="fontSize61 bold fontWhite addContactTextMobile">
                        Add contact
                    </span>
                    <span class="fontSize27 fontWhite addContactSubTextMobile">
                        Tasks are better with a team!
                    </span>
                </div>
                <img src="img/blueLine.png" class="bluelineAddContact">
            </div>
            <div class="middleContainerAddContact">
                <div class="circleAddProfile horizontalAndVertical" id="chooseColorId">
                    <img src="img/personWhite.png" class="personAddContactImage">
                    <input type="color" id="colorPickerId" class="colorPicker pointer">
                </div>
            </div>
            <form onsubmit="createContact(); return false;" class="rightContainerAddContactArea">
                <div class="rightContainerAddContact column gap32 justifyCenter">
                    <div class="relative inputArea">
                        <input placeholder="Name (required)" type="text" type="myName" class="input1221 fontSize20 inputField pointer"
                        id="addNameId" oninput="validateNameInput(this)" required>
                        <object class="symbol24Input" type="image/svg+xml" data="img/person.svg">
                        </object>
                    </div>
                    <div class="relative inputArea">
                        <input type="email" placeholder="Email" class="input1221 fontSize20 inputField pointer"
                        id="addEmailId" oninput="validateEmailInput(this)">
                        <object class="symbol24Input" type="image/svg+xml" data="img/email.svg">
                        </object>
                    </div>
                    <div class="relative inputArea">
                        <input type="tel" placeholder="Phone" class="input1221 fontSize20 inputField pointer" oninput="validatePhoneInput(this)" id="addPhoneId">
                        <object class="symbol24Input" type="image/svg+xml" data="img/phone.svg">
                        </object>
                    </div>
                    <div class="addContactBtn dFlex gap16">
                        <button class="btn1616 btnWhite alignCenter dFlex pointer changeCrossImage" id="cancelBtn">
                            <span class="fontSize20 pointer">
                            Cancel
                            </span>
                            <img src="img/cross.png" class="symbol24">
                        </button>
                        <button class="btn1616 alignCenter dFlex pointer" type="submit">
                            <span class="fontSize20 fontWhite pointer">
                            Create Contact
                            </span>
                            <img src="img/hookWhiteSmall.png" class="symbol24">
                        </button>
                    </div>

                    <!-- close popup desktop -->
                    <div class="closePopup crossDesktopContacts" onclick="slideOutTwoObjects('addContactAreaId', 'backgroundAddContactId');">
                        <img src="img/cross.png" class="symbol24">
                    </div>
                </div>
            </form>
    `
}