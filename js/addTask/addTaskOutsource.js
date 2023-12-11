/**
 * Sets up the add task template for addTask.html and board.html.
 */
function addTaskTemplate() {
    document.getElementById('addTaskTemplateId').innerHTML = generateAddTaskHTML();
}

/**
 * Generates the HTML content for the add task template.
 * @returns {string} - The HTML content for the add task template.
 */
function generateAddTaskHTML() {
    return /*html*/`
    <section class="alignCenter gap30 title titleAddTask">
        <span class="fontSize61 bold" id="addTaskTextId">
        Add task
        </span>
    </section>
    <form onsubmit="onClickToDo(); return false;" id="createTaskId">
        <div class="dFlex gap48 leftAndRightContainerMobile">
            <div class="leftContainer column gap32">
                <!-- title -->
                <section class="column gap8">
                    <span class="fontSize20">
                    Title
                    <span class="red">*</span>
                    </span>
                    <input type="text" class="input1216 inputField fontSize20" placeholder="Enter a title" id="addTaskTitleId" required>
                </section>
                <!-- description -->
                <section class="column gap8">
                    <span class="fontSize20">
                    Description
                    </span>
                    <textarea type="text" class="input1216 inputField inputDescription fontSize20"
                    placeholder="Enter a description" id="addTaskDescriptionId"></textarea>
                </section>
                <!-- assigned to -->
                <section class="column gap8">
                    <span class="fontSize20">
                        Assigned to
                    </span>
                    <div class="relative">
                        <input class="input1216withImg inputField fontSize20" placeholder="Select contacts to assign" onclick="contactsDropdown()" oninput="filterContacts()" id="searchContactId">
                        <img src="img/drowndown.png" class="symbol24InputHover pointer" id="contactsDropdownImgId" onclick="toggleContactsDrowdown()">
                        <div class="column dropdownContacts dNone" id="contactsDropdownContentId">
                            <div class="column scrollAddTaskArea gap2" id="assignToId">
                            </div>
                            <div class="addContactBtnArea justifyCenter">
                                <button class="btn1212 horizontalAndVertical gap16 pointer" onclick="openAddContactPopup()" type="button">
                                    <span class="fontSize21 bold fontWhite pointer">
                                    Add new contact
                                    </span>
                                    <div class="symbol32 addContactImg"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="assignedContactsId" class="dFlex assignedToAreaMobile">
                    </div>
                </section>
            </div>

            <div class="greyline">
            </div>

            <div class="rightContainer column gap32">
                <!-- due date -->
                <section class="column gap8">
                    <span class="fontSize20">
                    Due date
                        <span class="red">*</span>
                    </span>
                    <div class="relative" onclick="datePicker()">
                        <input type="text" class="input1216withImg inputField fontSize20" placeholder="dd/mm/yyyy" id="datepickerId"  oninput="validateDateInput(this)" required>
                        <img src="img/event.png" class="symbol24InputHover dateImg">
                    </div>
                </section>
                <!-- prio buttons -->
                <section class="column gap8">
                    <span class="fontSize20 alignCenter">
                        <span>
                        Prio
                        </span>
                    </span>
                    <div class="dFlex gap16 prioBtnsMobile">
                        <button type="button" class="prioBtn horizontalAndVertical" id="addUrgentId" onclick="urgentBtn()">
                            <span class="fontSize20 pointer" id="urgentTextId">
                            Urgent
                            </span>
                            <img class="symbol20" src="img/urgentRed.png" id="urgentImgId">
                        </button>
                        <button type="button" class="prioBtn horizontalAndVertical" id="addMediumId" onclick="mediumBtn()">
                            <span class="fontSize20 pointer" id="mediumTextId">
                                Medium
                            </span>
                            <img class="symbol20" src="img/mediumOrange.png" id="mediumImgId">
                        </button>
                        <button type="button" class="prioBtn horizontalAndVertical" id="addLowId" onclick="lowBtn()">
                            <span class="fontSize20 pointer" id="lowTextId">
                                Low
                            </span>
                            <img class="symbol20" src="img/lowGreen.png" id="lowImgId">
                        </button>
                    </div>
                </section>
                <!-- category -->
                <section class="column gap8">
                    <span class="fontSize20">
                    Category
                        <span class="red">*</span>
                    </span>
                    <div class="relative">
                        <input class="input1216withTwoImg inputField fontSize20 pointer" placeholder="Select task category" id="addCategoryId" onkeypress="handleEnterKey(event)" required>
                        <img src="img/cross.png" class="symbol24InputHover pointer crossImg dNone" id="categoryCloseId" onclick="categoryDropup()">
                        <img src="img/plus.png" class="symbol24InputHover pointer crossImg" onclick="listCategories()" id="addCategoryBtnId">
                        <object class="greylineInputAddTask" type="image/svg+xml" data="img/greylineInputfield.svg" id="categoryGreylineId">
                        </object>
                        <img src="img/drowndown.png" class="symbol24InputHover pointer" id="categoryDropdownImgId" onclick="categoryDropdown()">
                        <div class="column dropdownContacts dNone" id="categoryDropdownContentId">
                            <div class="column scrollAddTaskArea scrollLimitAddTaskCategory" id="categoryListId">
                            </div>
                        </div>
                    </div>
                </section>
                <!-- subtasks -->
                <section class="column gap8 relative">
                    <span class="fontSize20">
                    Subtasks
                    </span>
                    <div class="relative column">
                        <input class="input1216withTwoImg inputField fontSize20 pointer" placeholder="Add new subtask" id="subtaskInputId" onkeypress="handleEnterKey(event)">
                        <img src="img/plus.png" class="symbol24InputHover pointer" id="addSubtaskImgId" onclick="addSubtask()">
                    </div>
                    <div id="subtaskListId" class="gap8 column scrollAddTaskArea scrollLimitAddTask">
                    </div>
                </section>
            
            </div>
            
        </div>
        <!-- footer -->
        <div class="footer spaceBetween">
        <div class="leftFooter">
            <span class="fontSize20">
                <span class="redFooter">*</span>
                This field is required
            </span>
        </div>
        <div class="rightFooter dFlex gap16">
            <button class="btn1616 btnWhite alignCenter dFlex  pointer changeCrossImage" onclick="clearTask()" type="button">
                <span class="fontSize20 pointer">
                Clear
                </span>
                <img src="img/cross.png" class="symbol24">
            </button>
            <button class="btn1616 alignCenter dFlex pointer" type="submit">
                <span class="fontSize20 fontWhite pointer" id="createTaskTextId">
                Create Task
                </span>
                <img src="img/hookWhiteSmall.png" class="symbol24">
            </button>
        </div>
    </div>
    </form>

    <img src="img/cross.png" class="closePopup dNone" id="closePopupId" onclick="slideOutTwoObjects('addTaskTemplateId', 'backgroundAddTaskPopupId'), clearTask()">`
}

/**
 * Generates the HTML content for a contact in the contacts list.
 * @param {Object} contact - The contact object.
 * @param {number} i - The index of the contact in the contacts array.
 * @returns {string} - The HTML content for the contact in the contacts list.
 */
function generateListContactsHTML(contact, i) {
    return /*html*/ `
    <div class="listContacts dFlex alignCenter spaceBetween pointer" onclick="toggleCheckContact('checkContactImgId${i}', ${i})" id="assignedContactId${i}">
        <div class="dFlex alignCenter gap16">
            <div class="nameShortSmall horizontalAndVertical pointer" style="background-color: ${contact.color};">
                <span class="fontWhite fontSize12 pointer mb2">
                ${contact.nameShort}
                </span>
            </div>
            <span class="fontSize20 pointer">
            ${contact.name}
            </span>
        </div>
        <div class="symbol24 pointer" style="background-image: url('./img/uncheck.png');" id="checkContactImgId${i}">
        </div>
    </div>
    `
}

/**
 * Generates the HTML content for a contact in the assigned contacts area.
 * @param {Object} contactBelowAssignedTo - The contact object.
 * @returns {string} - The HTML content for the contact in the assigned contacts area.
 */
function generateContactsBelowAssignedTo(contactBelowAssignedTo) {
    return /*html*/ `
        <div class="nameShortSmall horizontalAndVertical" style="background-color: ${contactBelowAssignedTo.color};">
            <span class="fontWhite fontSize12 mb2">
            ${contactBelowAssignedTo.nameShort}
            </span>
        </div>
    `
}

/**
 * Generates the HTML content for a category in the categories list.
 * @param {string} category - The category name.
 * @param {number} i - The index of the category in the categories array.
 * @returns {string} - The HTML content for the category in the categories list.
 */
function generateCategoryListHTML(category, i) {
    return /*html*/ `
    <div class="listCategories dFlex alignCenter spaceBetween pointer" onclick="addCategory(${i})">
        <input class="dFlex alignCenter gap16 fontSize20 categoryContent pointer" value="${category}" id="inputFieldCategory${i}" onclick="doNotClose(event)" readonly>
        <div class="alignCenter gap4">
            <div class="symbol24 pointer editCategory" id="editCategoryImgID${i}" style="background-image: url('./img/pencilDark.png');" onclick="editCategory(${i})">
            </div>
            <div class="smallGreyline"></div>
            <div class="symbol24 pointer deleteCategory" style="background-image: url('./img/garbageDark.png');" onclick="deleteCategory(${i})">
            </div>
        </div>
    </div>
    `
}

/**
 * Generates the HTML content for a subtask in the subtasks list.
 * @param {string} subtask - The subtask content.
 * @param {number} i - The index of the subtask in the subtasks array.
 * @returns {string} - The HTML content for the subtask in the subtasks list.
 */
function generateSubtaskListHTML(subtask, i) {
    return /*html*/ `
    <div class="listSubtask listSubtaskHover default" id="subtaskListElement${i}">
        <ul class="alignCenter spaceBetween default">
            <li><input class="alignCenter gap16 fontSize20 subtaskContent default" value="${subtask}" id="subtaskEditInputId${i}" readonly></li>
            <div class="alignCenter gap4">
            <div class="symbol24 pointer editSubtask" id="pencilEditSubtaskImgId${i}" style="background-image: url('./img/pencilDark.png');" onclick="editSubtask(${i})">
            </div>
            <div class="smallGreylineSubtask"></div>
            <div class="symbol24 pointer deleteSubtask" style="background-image: url('./img/garbageDark.png');" onclick="deleteSubtask(${i})">
            </div>
        </div>
        </ul>
    </div>
    `
}