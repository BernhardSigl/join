function generateAddContactContentHTML() {
    return /*html*/`
            <div class="leftContainerAddContact relative">
                <img src="img/joinLogoBright.svg" class="joinLogoAddTask">
                <div class="titleAddContact column gap8">
                    <span class="fontSize61 bold fontWhite">
                        Add contact
                    </span>
                    <span class="fontSize27 fontWhite">
                        Tasks are better with a team!
                    </span>
                </div>
                <img src="img/blueLine.png" class="bluelineAddContact">
            </div>
            <div class="middleContainerAddContact">
                <div class="circleAddProfile horizontalAndVertical">
                    <object class="personAddContactImage" type="image/svg+xml" data="img/personWhite.svg">
                    </object>
                </div>
            </div>
            <div class="rightContainerAddContact column gap32 justifyCenter">
                <div class="relative inputArea">
                    <input placeholder="Name" type="text" type="myName" class="input1221 fontSize20 inputField pointer"
                        id="regNameId" oninput="validateNameInput(this)" required>
                    <object class="symbol24Input" type="image/svg+xml" data="img/person.svg">
                    </object>
                </div>
                <div class="relative inputArea">
                    <input type="email" placeholder="Email" class="input1221 fontSize20 inputField pointer"
                        id="regEmailId" oninput="validateEmailInput(this)" required>
                    <object class="symbol24Input" type="image/svg+xml" data="img/email.svg">
                    </object>
                </div>
                <div class="relative inputArea">
                    <input type="tel" placeholder="Phone" class="input1221 fontSize20 inputField pointer"
                        id="regPasswordFirstId" oninput="validatePasswordInput(this)" required>
                    <object class="symbol24Input" type="image/svg+xml" data="img/phone.svg">
                    </object>
                </div>
                <div class="addContactBtn dFlex gap16">
                    <button class="btn1616 btnWhite alignCenter dFlex  pointer changeCrossImage">
                        <span class="fontSize20 pointer">
                            Cancel
                        </span>
                        <img src="img/cross.png" class="symbol24">
                    </button>
                    <button class="btn1616 alignCenter dFlex pointer">
                        <span class="fontSize20 fontWhite pointer">
                            Create Contact
                        </span>
                        <img src="img/hookWhiteSmall.png" class="symbol24">
                    </button>
                </div>
                <!-- close popup -->
                <div class="closePopup" onclick="slideOutTwoObjects('addContactAreaId', 'backgroundAddContactId')">
                    <img src="img/cross.png" class="symbol24">
                </div>
    </div>
    `
}