function openEditTaskPopup(i) {
    editContactPopupContent(i);
    slideTwoObjects('editContactAreaId', 'backgroundEditContactId');
    editContact(i);
}

function editContactPopupContent(i) {
    document.getElementById('editContactAreaId').innerHTML = generateEditContactContentHTML(i);
}

function closeEditContactPopup() {
    slideOutTwoObjects('editContactAreaId', 'backgroundEditContactId');
}

function generateEditContactContentHTML(i) {
    return /*html*/`
            <div class="leftContainerAddContact relative">
                <img src="img/joinLogoBright.svg" class="joinLogoAddTask">
                <div class="titleAddContact column gap8">
                    <span class="fontSize61 bold fontWhite">
                        Edit Contact
                    </span>
                </div>
                <img src="img/blueLine.png" class="bluelineEditContact">
            </div>
            <div class="middleContainerAddContact">
                <div class="circleAddProfile horizontalAndVertical" id="profileColorId">
                    <img src="img/personWhite.png" class="personAddContactImage">
                    <input type="color" id="editColorPickerId" class="colorPicker pointer">
                </div>
            </div>
            <form onsubmit="saveContact(${i}); return false;">
                <div class="rightContainerAddContact column gap32 justifyCenter">
                    <div class="relative inputArea">
                        <input placeholder="Name" type="text" type="myName" class="input1221 fontSize20 inputField pointer"
                        id="editNameId" oninput="validateNameInput(this)" required>
                        <object class="symbol24Input" type="image/svg+xml" data="img/person.svg">
                        </object>
                    </div>
                    <div class="relative inputArea">
                        <input type="email" placeholder="Email" class="input1221 fontSize20 inputField pointer" oninput="validateEmailInput(this)" id="editEmailId">
                        <object class="symbol24Input" type="image/svg+xml" data="img/email.svg">
                        </object>
                    </div>
                    <div class="relative inputArea">
                        <input type="tel" placeholder="Phone" class="input1221 fontSize20 inputField pointer" oninput="validatePhoneInput(this)" id="editPhoneId">
                        <object class="symbol24Input" type="image/svg+xml" data="img/phone.svg">
                        </object>
                    </div>
                    <div class="addContactBtn dFlex gap16">
                        <button class="btn1616 btnWhite alignCenter dFlex  pointer changeCrossImage" onclick="deleteContact(${i})" id="deleteBtnId">
                            <span class="fontSize20 pointer">
                            Delete
                            </span>
                            <img src="img/cross.png" class="symbol24">
                        </button>
                        <button class="btn1616 alignCenter dFlex pointer" type="submit">
                            <span class="fontSize20 fontWhite pointer">
                            Save
                            </span>
                            <img src="img/hookWhiteSmall.png" class="symbol24">
                        </button>
                    </div>

                    <!-- close popup -->
                    <div class="closePopup" onclick="closeEditContactPopup()">
                        <img src="img/cross.png" class="symbol24">
                    </div>
                </div>
            </form>
    `
}