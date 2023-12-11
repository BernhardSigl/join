/**
 * Object used to keep track of the visibility state of move dropdowns for tasks.
 * @type {number}
 */
let moveDropdown = {};

/**
 * Generates HTML for displaying a task in the kanban board.
 * @param {Object} task - Task object containing information like title, description, category, etc.
 * @returns {string} - HTML string representing the task in the kanban board.
 */
function generateTaskHTML(task) {
    checkPrio(task);
    return /*html*/ `
    <div class="task pointer column gap24" draggable="true" id="taskId${task.id}" ondragstart="startDragging(${task.id})" onclick="openBoard(${task.id})">
        <div class="alignCenter spaceBetween w100 gap4 relative">
            <span class="fontSize16 subjectKanbanSmall textLimit fontWhite pointer" id="subjectKanbanSmallId${task.id}">
                ${task.category}
            </span>
            <div class="fontSize16 subjectKanbanSmall moveText fontWhite pointer" onclick="showMoveDropdown(${task.id}, event)">
                Move
            </div>
            <div class="moveDropdown column dNone" id="moveDropdown(${task.id})">
            <span class="fontSize16 moveToContent" onclick="moveToMobile('toDo', ${task.id}, event)">To do</span>
            <span class="fontSize16 moveToContent" onclick="moveToMobile('inProgress', ${task.id}, event)">In progress</span>
            <span class="fontSize16 moveToContent" onclick="moveToMobile('awaitFeedback', ${task.id}, event)">Await feedback</span>
            <span class="fontSize16 moveToContent" onclick="moveToMobile('done', ${task.id}, event)">Done</span>
        </div>
        </div>
        <div class="gap8 column">
            <span class="fontSize16 titleKanban bold pointer">${task.title}</span>
            <span class="fontSize16 descriptionKanbanSmall fontGrey pointer">${task.description}</span>
        </div>
        <div class="w100 alignCenter gap11 dNone" id="progressBarAreaId${task.id}">
            <div class="progressBarArea relative">
                <div id="progressBarId${task.id}" class="progressBarFilled">
                </div>
            </div>

            <div class="alignCenter gap2">
                <span class="fontSize12 pointer" id="progressId${task.id}">
                </span>
                <span class="fontSize12 pointer">Subtasks</span>
            </div>
        </div>
        <div class="w100 h32 spaceBetween alignCenter ${dNone}">
            <div id="contactsInBoardSmallId${task.id}" class="alignCenter">
            </div>
            <img src="./img/${prioImg}.png" class="symbol20">
        </div>
    </div>
    `;
}

/**
 * Moves a task to a new progress status on mobile devices.
 * @param {string} newProgressStatus - The new progress status for the task.
 * @param {number} id - The Id of the task.
 * @param {Event} event - The event object.
 */
async function moveToMobile(newProgressStatus, id, event) {
    event.stopPropagation();
    taskArray[id].progressStatus = newProgressStatus;
    closeAllMoveDropdowns();
    updateTasks();
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
}

/**
 * Shows the move dropdown for a task.
 * @param {number} id - The Id of the task.
 * @param {Event} event - The event object.
 */
function showMoveDropdown(id, event) {
    event.stopPropagation();
    closeAllMoveDropdownsExcept(id);
    if (!moveDropdown[id]) {
        toggleVisibility(`moveDropdown(${id})`, true);
        moveDropdown[id] = true;
    } else {
        toggleVisibility(`moveDropdown(${id})`, false);
        moveDropdown[id] = false;
    }
}

/**
 * Closes all move dropdowns except the one specified.
 * @param {number} exceptId - The Id of the dropdown to keep open.
 */
function closeAllMoveDropdownsExcept(exceptId) {
    for (const id in moveDropdown) {
        if (id !== exceptId && moveDropdown[id]) {
            toggleVisibility(`moveDropdown(${id})`, false);
            moveDropdown[id] = false;
        }
    }
}

/**
 * Closes all move dropdowns.
 */
function closeAllMoveDropdowns() {
    for (const id in moveDropdown) {
        toggleVisibility(`moveDropdown(${id})`, false);
        moveDropdown[id] = false;
    }
}

/**
 * Generates HTML for displaying detailed information about a task in the board view.
 * @param {Object} task - Task object containing information like title, description, category, etc.
 * @param {number} id - The Id of the task.
 * @returns {string} - HTML string representing detailed task information in the board view.
 */
function generateBoardHTML(task, id) {
    return /*html*/ `
    <div class="dFlex relative spaceBetween">
        <span class="fontSize23 subjectKanbanBig fontWhite" id="subjectKanbanBigId${task.id}">
        ${task.category}
        </span>
        <img src="img/cross.png" class="closePopup" onclick="closeBoard()">
    </div>
    <span class="fontSize61 bold titleKanbanBigView">
    ${task.title}
    </span>
    <span class="fontSize20 descriptionKanbanBig" id="descriptionBoardBigId${id}">
    ${task.description}
    </span>
    <div class="dFlex gap28">
        <span class="fontSize20 fontBlue">Due date:</span>
        <span class="fontSize20">${task.date}</span>
    </div>
    <div class="dFlex gap48" id="prioAreaBoardBigId${id}">
        <span class="fontSize20 fontBlue">Priority:</span>
        <div class="dFlex gap10 alignCenter">
            <span class="fontSize20">${prioText}</span>
            <img src="./img/${prioImg}.png" class="symbol20">
        </div>
    </div>
    <div class="column gap8 dNone" id="assignedToAreaBoardBigId${id}">
        <span class="fontSize20 fontBlue">Assigned to:</span>
        <div id="contactsInBoardBigId${id}" class="contactsInBoardBig"></div>
    </div>
    <div class="column gap8 dNone" id="subtaskBoardBigAreaId${id}">
        <span class="fontBlue fontSize20">Subtasks</span>
        <div id="subtasksInBoardBigId${id}" class="pointer subtasksInBoardBig"></div>
    </div>
    <div class="footerBoardBig gap8">
        <div class="alignCenter gap8 pointer deleteBoardArea" onclick="deleteTask(${id})">
            <img class="symbol24" src="img/garbageDark.png">
            <span class="fontSize16 pointer">Delete</span>
        </div>
        <img class="greylineSmall" src="img/greyLine.png">
        <div class="alignCenter gap8 pointer editBoardArea" onclick="editTask(${id})">
            <img class="symbol24" src="img/pencilDark.png">
            <span class="fontSize16 pointer">Edit</span>
        </div>
    </div>
    `;
}

/**
 * Generates HTML for displaying a contact in the board view.
 * @param {Object} contact - Contact object containing information like name and color.
 * @returns {string} - HTML string representing a contact in the board view.
 */
function generateContactsBoardBigHTML(contact) {
    return /*html*/ `
    <div class="dFlex alignCenter gap16 contactBigBoard">
        <div class="nameShortSmall horizontalAndVertical" style="background-color: ${contact.color};">
            <span class="fontWhite fontSize12 mb2">
            ${contact.nameShort}
            </span>
        </div>
        <span class="fontSize20">
        ${contact.name}
        </span>
    </div>
    `
}

/**
 * Generates HTML for displaying a placeholder in the task list.
 * @returns {string} - HTML string representing a task placeholder.
 */
function generateTaskPlaceholderHTML() {
    return /*html*/ `
    <div class="dragPlaceholder dNone" id="dragPlaceholderId"></div>`;
}

/**
 * Generates HTML for displaying a contact in the small board view.
 * @param {Object} contactsBoard - Contact object containing information like name and color.
 * @returns {string} - HTML string representing a contact in the small board view.
 */
function generateContactsBoardSmallHTML(contactsBoard) {
    return /*html*/ `
    <div class="nameShortBoardSmall horizontalAndVertical pointer" style="background-color: ${contactsBoard.color};">
        <span class="fontWhite fontSize12 pointer mb2">
        ${contactsBoard.nameShort}
        </span>
    </div>
    `
}

/**
 * Generates HTML for displaying a subtask in the big board view.
 * @param {string} subtask - Subtask text.
 * @param {number} subtaskIndex - Index of the subtask.
 * @param {number} taskIndex - Index of the task.
 * @returns {string} - HTML string representing a subtask in the big board view.
 */
function gernerateSubtasksBoardBigHTML(subtask, subtaskIndex, taskIndex) {
    return /*html*/ `
    <div class="alignCenter subtaskBigBoard gap16"
    onclick="toggleSubtask(${subtaskIndex}, ${taskIndex})">
        <img src="./img/uncheck.png" class="symbol24" id="subtaskImgId${subtaskIndex}">
        <span class="fontSize16 pointer" id="subtaskTextId${subtaskIndex}">
        ${subtask}
        </span>
    </div>
    `
}

/**
 * Closes the board view.
 */
async function closeBoard() {
    slideOutTwoObjects('boardAreaId', 'backgroundBoardPopupId')
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
}