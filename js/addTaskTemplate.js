function addTaskContent() {
    document.getElementById('addTaskContentId').innerHTML = generateAddTaskContentHTML();
}

function addTaskTemplate() {
    document.getElementById('addTaskTemplateId').innerHTML = generateAddTaskHTML();
}

function generateAddTaskHTML() {
    return /*html*/`
    <section class="alignCenter gap30 title titleAddTask">
        <span class="fontSize61 bold">
        Add task
        </span>
    </section>
    <form onsubmit="createTask(); return false;">
        <div class="dFlex gap48">
            <div class="leftContainer column gap32">
                <!-- title -->
                <section class="column gap8">
                    <span class="fontSize20">
                    Title
                    <span class="red">*</span>
                    </span>
                    <input type="text" class="input1216 inputField fontSize20" placeholder="Enter a title" id="addTaskTitleId">
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
                            <div class="column scrollAddTaskArea" id="assignToId">
                            </div>
                            <div class="addContactBtnArea justifyCenter">
                                <button class="btn1212 horizontalAndVertical gap16 pointer" onclick="openAddContactPopup()">
                                    <span class="fontSize21 bold fontWhite pointer">
                                    Add new contact
                                    </span>
                                    <div class="symbol32 addContactImg"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="assignedContactsId" class="dFlex gap16">
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
                        <input type="text" class="input1216withImg inputField fontSize20" placeholder="dd/mm/yyyy"
                        id="datepickerId">
                        <img src="img/event.png" class="symbol24InputHover pointer">
                    </div>
                </section>
                <!-- prio buttons -->
                <section class="column gap8">
                    <span class="fontSize20 alignCenter">
                        <span>
                        Prio
                        </span>
                    </span>
                    <div class="dFlex gap16">
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
                        <input class="input1216withTwoImg inputField fontSize20 pointer" placeholder="Select task category" id="addCategoryId">
                        <img src="img/cross.png" class="symbol24InputHover pointer crossImg dNone" id="categoryCloseId" onclick="categoryDropup()">
                        <img src="img/plus.png" class="symbol24InputHover pointer crossImg" onclick="listCategories()" id="addCategoryBtnId">
                        <object class="greylineInput" type="image/svg+xml" data="img/greylineInputfield.svg" id="categoryGreylineId">
                        </object>
                        <img src="img/drowndown.png" class="symbol24InputHover pointer" id="categoryDropdownImgId" onclick="categoryDropdown()">
                        <div class="column dropdownContacts dNone" id="categoryDropdownContentId">
                            <div class="column scrollAddTaskArea scrollLimitCategories" id="categoryListId">
                            </div>
                        </div>
                    </div>
                </section>
                <!-- subtasks -->
                <section class="column gap8">
                    <span class="fontSize20">
                    Subtasks
                    </span>
                    <div class="relative">
                        <input class="input1216withImg inputField fontSize20 pointer" placeholder="Add new subtask">
                        <img src="img/plus.png" class="symbol24InputHover pointer">
                    </div>
                </section>
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
                    <button class="btn1616 btnWhite alignCenter dFlex  pointer changeCrossImage">
                        <span class="fontSize20 pointer">
                        Clear
                        </span>
                        <img src="img/cross.png" class="symbol24">
                    </button>
                    <button class="btn1616 alignCenter dFlex pointer" type="submit">
                        <span class="fontSize20 fontWhite pointer">
                        Create Task
                        </span>
                        <img src="img/hookWhiteSmall.png" class="symbol24">
                    </button>
                </div>
            </div>
        </div>
    </form>

    <img src="img/cross.png" class="closePopup dNone" id="closePopupId" onclick="slideOutTwoObjects('addTaskTemplateId', 'backgroundAddTaskPopupId')">`
}