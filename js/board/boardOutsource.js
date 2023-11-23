function generateTaskHTML(task) {
    checkPrio(task);
    return /*html*/ `
    <div class="task pointer column gap24" draggable="true" id="taskId${task.id}" ondragstart="startDragging(${task.id})" onclick="openBoard(${task.id})">
        <span class="fontSize16 subjectKanbanSmall fontWhite pointer" id="subjectKanbanSmallId${task.id}">${task.category}</span>
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
                <span class="fontSize12" id="progressId${task.id}">
                </span>
                <span class="fontSize12">Subtasks</span>
            </div>
        </div>
        <div class="w100 h32 spaceBetween alignCenter ${dNone}">
            <div id="contactsInBoardSmallId${task.id}" class="alignCenter">
            </div>
            <img src="../img/${prioImg}.png" class="symbol20">
        </div>
    </div>
    `;
}

function generateBoardHTML(task, id) {
    return /*html*/ `
    <div class="dFlex relative spaceBetween">
        <span class="fontSize23 subjectKanbanBig fontWhite" id="subjectKanbanBigId${task.id}">
        ${task.category}
        </span>
        <img src="img/cross.png" class="closePopup" onclick="closeBoard()">
    </div>
    <span class="fontSize61 bold">
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
            <img src="../img/${prioImg}.png" class="symbol20">
        </div>
    </div>
    <div class="column gap8 dNone" id="assignedToAreaBoardBigId${id}">
        <span class="fontSize20 fontBlue">Assigned to:</span>
        <div id="contactsInBoardBigId${id}"></div>
    </div>
    <div class="column gap8 dNone" id="subtaskBoardBigAreaId${id}">
        <span class="fontBlue fontSize20">Subtasks</span>
        <div id="subtasksInBoardBigId${id}" class="pointer"></div>
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

function gernerateSubtasksBoardBigHTML(subtask, subtaskIndex, taskIndex) {
    return /*html*/ `
    <div class="alignCenter subtaskBigBoard gap16"
    onclick="toggleSubtask(${subtaskIndex}, ${taskIndex})">
        <img src="../img/uncheck.png" class="symbol24" id="subtaskImgId${subtaskIndex}">
        <span class="fontSize16 pointer" id="subtaskTextId${subtaskIndex}">
        ${subtask}
        </span>
    </div>
    `
}

async function closeBoard() {
    slideOutTwoObjects('boardAreaId', 'backgroundBoardPopupId')
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
}