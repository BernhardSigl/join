function navPanelsTemplate() {
    document.getElementById('navPanelsTemplateId').innerHTML = generateNavPanelsHTML();
    setActiveLink();
}

function generateNavPanelsHTML() {
    return /*html*/ `
    <header class="alignCenter spaceBetween">
        <div class="fontSize20 headerTitle">
            Kanban Project Management Tool
        </div>
        <div class="headerRight alignCenter gap16">
            <button onclick="toggleFullscreen()">Toggle Fullscreen</button>
            <object class="questionMarket" type="image/svg+xml" data="img/questionmarket.svg">
            </object>
            <img src="img/circle.png" class="headerCircle pointer">
        </div>
    </header>

    <!-- category bar -->
    <section class="categoryBar alignCenter column spaceBetween">
        <!-- logo -->
        <object class="bigJoinLogo" type="image/svg+xml" data="img/joinLogoBright.svg">
        </object>
        <!-- category links -->
        <div class="categoryLinks column gap15">
            <a href="summary.html" class="categoryLink alignCenter gap8 pointer" id="summaryLinkId">
                <object class="categoryImage" type="image/svg+xml" data="img/summary.svg">
                </object>
                <span class="fontWhite fontSize16 pointer">
                    Summary
                </span>
            </a>
            <a href="addTask.html" class="categoryLink alignCenter gap8 pointer" id="addTaskLinkId">
                <object class="categoryImage" type="image/svg+xml" data="img/addTask.svg">
                </object>
                <span class="fontWhite fontSize16 pointer">
                    Add Task
                </span>
            </a>
            <a href="board.html" class="categoryLink alignCenter gap8 pointer" id="boardLinkId">
                <object class="categoryImage" type="image/svg+xml" data="img/board.svg">
                </object>
                <span class="fontWhite fontSize16 pointer">
                    Board
                </span>
            </a>
            <a href="contacts.html" class="categoryLink alignCenter gap8 pointer"
                id="contactsLinkId">
                <object class="categoryImage" type="image/svg+xml" data="img/contacts.svg">
                </object>
                <span class="fontWhite fontSize16 pointer">
                    Contacts
                </span>
            </a>
        </div>
        <!-- quick links -->
        <div class="quicklinks column gap4">
            <a href="privacyPolicy.html" class="fontSize16 pointer" id="privacyPoliciyLinkId">
                Privacy policy
            </a>
            <a href="legalNotice.html" class="fontSize16 pointer" id="legalNoticeLinkId">
                Legal notice
            </a>
        </div>
    </section>
    `
}