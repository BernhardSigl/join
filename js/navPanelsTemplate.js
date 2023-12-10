function navPanelsTemplate() {
    loadLoggedInUser();
    let initials = extractInitials(loggedInUser[0].name);
    document.getElementById('navPanelsTemplateId').innerHTML = generateNavPanelsHTML(initials);
    setActiveLink();
}

function navPanelPopupTemplate() {
    document.getElementById('navPanelsPopupId').innerHTML = generateNavPanelsPopupHTML();
}

function generateNavPanelsHTML(initials) {
    return /*html*/ `
    <header class="alignCenter spaceBetween">
        <div class="fontSize20 headerTitle">
            Kanban Project Management Tool
        </div>
        <img src="img/joinLogoLogin.png" class="joinLogoHeader notVisible">
        <div class="headerRight alignCenter gap16" id="headerRightId">
            <a href="help.html" class="dFlex">
                <img src="img/help.png" class="questionMarket">
            </a>
            <div onclick="openNavPopup()" class="headerCircle relative">
                <img src="img/circle.png" class="pointer circleHeader">
                <span class="fontSize20 bold absoluteMiddle pointer nameInHeaderCircle">${initials}</span>
            </div>
        </div>
    </header>

    <!-- category bar -->
    <section class="categoryBar alignCenter column spaceBetween">
        <!-- logo -->
        <object class="bigJoinLogo" type="image/svg+xml" data="img/joinLogoBright.svg">
        </object>
        <!-- category links -->
        <div class="categoryLinks column gap15" id="categoryLinksId">
            <a href="summary.html" class="categoryLink alignCenter gap8 pointer" id="summaryLinkId">
                <img href="summary.html" class="categoryImage" src="img/summary.png">
                <span class="fontWhite fontSize16 pointer categoryLinkText">
                    Summary
                </span>
            </a>
            <a href="addTask.html" class="categoryLink alignCenter gap8 pointer" id="addTaskLinkId">
            <img href="addTask.html" class="categoryImage" src="img/addTask.png">
                <span class="fontWhite fontSize16 pointer categoryLinkText">
                    Add Task
                </span>
            </a>
            <a href="board.html" class="categoryLink alignCenter gap8 pointer" id="boardLinkId">
            <img href="board.html" class="categoryImage" src="img/board.png">
                <span class="fontWhite fontSize16 pointer categoryLinkText">
                    Board
                </span>
            </a>
            <a href="contacts.html" class="categoryLink alignCenter gap8 pointer"
                id="contactsLinkId">
                <img href="contacts.html" class="categoryImage" src="img/contacts.png">
                <span class="fontWhite fontSize16 pointer categoryLinkText">
                    Contacts
                </span>
            </a>
        </div>
        <!-- quick links -->
        <div class="quicklinks column gap4">
            <a href="privacyPolicy.html" class="fontSize16 pointer" id="privacyPolicyLinkId">
                Privacy policy
            </a>
            <a href="legalNotice.html" class="fontSize16 pointer" id="legalNoticeLinkId">
                Legal notice
            </a>
        </div>
    </section>
    `
}

function generateNavPanelsPopupHTML() {
    return /*html*/ `
    <a class="fontSize16 pointer" href="legalNotice.html">Legal notice</a>
    <a class="fontSize16 pointer" href="privacyPolicy.html">Privacy policy</a>
    <a class="fontSize16 pointer" href="index.html">Log out</a>
    `
}
let isNavPopupVisible = false;
function openNavPopup() {
    isNavPopupVisible = !isNavPopupVisible;
    toggleVisibility('navPanelsPopupId', isNavPopupVisible);
}

function extractInitials(names) {
    const nameParts = names.split(' ');
    let initials = nameParts[0].charAt(0).toUpperCase();
    if (nameParts.length > 1) {
        initials += nameParts[1].charAt(0).toUpperCase();
    }
    return initials;
}