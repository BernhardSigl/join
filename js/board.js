let currentDraggedTask;

async function initBoard() {
    navPanelsTemplate();
    addTaskTemplate();
    await loadTask();
    await loadContacts();
    await loadCategories();
    await loadSubtasks();
    updateTasks();
}

function updateTasks() {
    toDoFilter();
    inProgressFilter();
    awaitFeedbackFilter();
    doneFilter();
}

function toDoFilter() {
    let toDoFilter = taskArray.filter(t => t['progressStatus'] == 'toDo');
    document.getElementById('toDoId').innerHTML = '';
    for (let i = 0; i < toDoFilter.length; i++) {
        const toDoFiltered = toDoFilter[i];
        document.getElementById('toDoId').innerHTML += generateTaskHTML(toDoFiltered);
        checkAmountContactsBoardSmall(toDoFiltered.contacts, toDoFiltered.id);
    }
    noToDo(toDoFilter);
    document.getElementById('toDoId').innerHTML += generateTaskPlaceholderHTML();
}

function noToDo(toDoFilter) {
    if (toDoFilter.length == 0) {
        toggleVisibility('noToDoId', true);
    } else {
        toggleVisibility('noToDoId', false);
    }
}

function inProgressFilter() {
    let inProgressFilter = taskArray.filter(t => t['progressStatus'] == 'inProgress');
    document.getElementById('inProgressId').innerHTML = '';
    for (let i = 0; i < inProgressFilter.length; i++) {
        const inProgressFiltered = inProgressFilter[i];
        document.getElementById('inProgressId').innerHTML += generateTaskHTML(inProgressFiltered);
        checkAmountContactsBoardSmall(inProgressFiltered.contacts, inProgressFiltered.id);
    }
    noInProgress(inProgressFilter);
    document.getElementById('inProgressId').innerHTML += generateTaskPlaceholderHTML();
}

function noInProgress(inProgressFilter) {
    if (inProgressFilter.length == 0) {
        toggleVisibility('noInProgressId', true);
    } else {
        toggleVisibility('noInProgressId', false);
    }
}

function awaitFeedbackFilter() {
    let awaitFeedbackFilter = taskArray.filter(t => t['progressStatus'] == 'awaitFeedback');
    document.getElementById('awaitFeedbackId').innerHTML = '';
    for (let i = 0; i < awaitFeedbackFilter.length; i++) {
        const awaitFeedbackFiltered = awaitFeedbackFilter[i];
        document.getElementById('awaitFeedbackId').innerHTML += generateTaskHTML(awaitFeedbackFiltered);
        checkAmountContactsBoardSmall(awaitFeedbackFiltered.contacts, awaitFeedbackFiltered.id);
    }
    noAwaitFeedback(awaitFeedbackFilter);
    document.getElementById('awaitFeedbackId').innerHTML += generateTaskPlaceholderHTML();
}

function noAwaitFeedback(awaitFeedbackFilter) {
    if (awaitFeedbackFilter.length == 0) {
        toggleVisibility('noAwaitFeedbackId', true);
    } else {
        toggleVisibility('noAwaitFeedbackId', false);
    }
}

function doneFilter() {
    let doneFilter = taskArray.filter(t => t['progressStatus'] == 'done');
    document.getElementById('doneId').innerHTML = '';
    for (let i = 0; i < doneFilter.length; i++) {
        const doneFilterFiltered = doneFilter[i];
        document.getElementById('doneId').innerHTML += generateTaskHTML(doneFilterFiltered);
        checkAmountContactsBoardSmall(doneFilterFiltered.contacts, doneFilterFiltered.id);
    }
    noDone(doneFilter);
    document.getElementById('doneId').innerHTML += generateTaskPlaceholderHTML();
}

function noDone(doneFilter) {
    if (doneFilter.length == 0) {
        toggleVisibility('noDoneId', true);
    } else {
        toggleVisibility('noDoneId', false);
    }
}

function generateTaskHTML(task) {
    checkPrio(task);

    const subtasksLimit = task.confirmedSubtasks.length;
    const completedSubtasks = task.confirmedSubtasks.filter(subtask => subtask === true).length;
    const progressPercentage = subtasksLimit > 0 ? (completedSubtasks / subtasksLimit) * 100 : 0;

    return /*html*/ `
    <div class="task pointer column gap24" draggable="true" ondragstart="startDragging(${task.id})" onclick="openBoard(${task.id})">
        <span class="fontSize16 subjectKanbanSmall fontWhite pointer">${task.category}</span>
        <div class="gap8 column">
            <span class="fontSize16 titleKanban bold pointer">${task.title}</span>
            <span class="fontSize16 descriptionKanbanSmall fontGrey pointer">${task.description}</span>
        </div>
        <div class="w100 alignCenter gap11">
            <div class="progressBarArea relative">
                <div id="progressBarId${task.id}" class="progressBarFilled" style="width: ${progressPercentage}%">
                </div>
            </div>

            <div class="alignCenter gap2">
                <span class="fontSize12" id="progressId${task.id}">
                ${completedSubtasks}/${subtasksLimit}
                </span>
                <span class="fontSize12">Subtasks</span>
            </div>
        </div>
        <div class="w100 spaceBetween alignCenter">
            <div id="contactsInBoardSmallId${task.id}" class="alignCenter">
            </div>
            <img src="../img/${prioImg}.png" class="symbol20">
        </div>
    </div>
    `;
}

function startDragging(id) {
    currentDraggedTask = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    taskArray[currentDraggedTask]['progressStatus'] = category;
    console.log(category);
    removeHighlight();
    updateTasks();
}

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');

    let removeClass = document.querySelectorAll('.dragPlaceholder');
    removeClass.forEach(function (element) {
        element.classList.remove('dNone');
    });
}

function removeHighlight() {
    document.getElementById('toDoId').classList.remove('dragAreaHighlight');
    document.getElementById('inProgressId').classList.remove('dragAreaHighlight');
    document.getElementById('awaitFeedbackId').classList.remove('dragAreaHighlight');
    document.getElementById('doneId').classList.remove('dragAreaHighlight');
}

function generateTaskPlaceholderHTML() {
    return /*html*/ `
    <div class="dragPlaceholder dNone" id="dragPlaceholderId"></div>`;
}

function openTaskPopup() {
    addTaskTemplate();
    slideTwoObjects('addTaskTemplateId', 'backgroundAddTaskPopupId'); toggleVisibility('closePopupId', true);
    enableCalender();
    listContacts();
    updateCategoryList();
}

function checkPrio(task) {
    if (task.low === true) {
        return prioImg = 'lowGreen', prioText = "Low";
    } else if (task.medium === true) {
        return prioImg = 'mediumOrange', prioText = "Medium";
    } else if (task.urgent === true) {
        return prioImg = 'urgentRed', prioText = "Urgent";
    } else {
        return '';
    }
}

function checkAmountContactsBoardSmall(contacts, id) {
    const contactsInBoardSmallId = document.getElementById(`contactsInBoardSmallId${id}`);
    contactsInBoardSmallId.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contactBoard = contacts[i];
        contactsInBoardSmallId.innerHTML += generateContactsBoardSmallHTML(contactBoard);
    }
}

function generateContactsBoardSmallHTML(contactsBoard) {
    return /*html*/ `
    <div class="nameShortBoardSmall horizontalAndVertical pointer" style="background-color: ${contactsBoard.color};">
        <span class="fontWhite fontSize12 pointer mb2">
        ${contactsBoard.nameShort}
        </span>
    </div>
    `
}

function openBoard(id) {
    let task = taskArray[id];
    slideTwoObjects('boardAreaId', 'backgroundBoardPopupId');
    checkPrio(task);
    document.getElementById('boardAreaId').innerHTML = generateBoardHTML(task, id);
    checkAmountContactsBoardBig(task.contacts, task.id);
    checkAmountSubtasksBoardBig(task.subtasks, task.id);
}

function generateBoardHTML(task, id) {
    return /*html*/ `
    <div class="dFlex">
        <span class="fontSize23 subjectKanbanBig fontWhite">
        ${task.category}
        </span>
    </div>
    <span class="fontSize61 bold">
    ${task.title}
    </span>
    <span class="fontSize20 descriptionKanbanBig">
    ${task.description}
    </span>
    <div class="dFlex gap28">
        <span class="fontSize20 fontBlue">Due date:</span>
        <span class="fontSize20">${task.date}</span>
    </div>
    <div class="dFlex gap48">
        <span class="fontSize20 fontBlue">Priority:</span>
        <div class="dFlex gap10 alignCenter">
            <span class="fontSize20">${prioText}</span>
            <img src="../img/${prioImg}.png" class="symbol20">
        </div>
    </div>
    <div class="column gap8">
        <span class="fontSize20 fontBlue">Assigned to:</span>
        <div id="contactsInBoardBigId${id}"></div>
    </div>
    <div class="column gap8">
        <span class="fontBlue fontSize20">Subtasks</span>
        <div id="subtasksInBoardBigId${id}" class="pointer"></div>
    </div>
    <div class="footerBoardBig gap8">
        <div class="alignCenter gap8 pointer deleteBoardArea" onclick="deleteTask(${id})">
            <img class="symbol24" src="img/garbageDark.png">
            <span class="fontSize16 pointer">Delete</span>
        </div>
        <img class="greyline" src="img/greyLine.png">
        <div class="alignCenter gap8 pointer editBoardArea">
            <img class="symbol24" src="img/pencilDark.png">
            <span class="fontSize16 pointer">Edit</span>
        </div>
    </div>
    `;
}

function checkAmountContactsBoardBig(contacts, id) {
    const contactsBoardBig = document.getElementById(`contactsInBoardBigId${id}`);
    contactsBoardBig.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        contactsBoardBig.innerHTML += generateContactsBoardBigHTML(contact);
    }
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

function checkAmountSubtasksBoardBig(subtasks, indexTask) {
    let subtasksBoardBig = document.getElementById(`subtasksInBoardBigId${indexTask}`);
    subtasksBoardBig.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        subtasksBoardBig.innerHTML += gernerateSubtasksBoardBigHTML(subtask, i, indexTask);
    }
    checkSubtaskConfirmed();
}

function gernerateSubtasksBoardBigHTML(subtask, indexSubtask, indexTask) {
    return /*html*/ `
    <div class="alignCenter subtaskBigBoard gap16"
    onclick="toggleSubtask(${indexSubtask}, ${indexTask})">
        <img src="../img/uncheck.png" class="symbol24" id="subtaskImgId${indexSubtask}">
        <span class="fontSize16 pointer" id="subtaskTextId${indexSubtask}">
        ${subtask}
        </span>
    </div>
    `
}

function toggleSubtask(indexSubtask, indexTask) {
    let task = taskArray[indexTask];
    let subtaskStatus = task.confirmedSubtasks[indexSubtask];
    task.confirmedSubtasks[indexSubtask] = !subtaskStatus;
    checkSubtaskConfirmed();
    updateTasks();
}

async function checkSubtaskConfirmed() {
    for (let i = 0; i < taskArray.length; i++) {
        const task = taskArray[i];
        for (let j = 0; j < task.confirmedSubtasks.length; j++) {
            const confirmedSubtask = task.confirmedSubtasks[j];
            let subtaskImg = document.getElementById(`subtaskImgId${j}`);
            let subtaskText = document.getElementById(`subtaskTextId${j}`);
            if (confirmedSubtask === true) {
                subtaskImg.src = '../img/check.png';
                subtaskText.classList.add('completed');
            } else if (confirmedSubtask === false) {
                subtaskImg.src = '../img/uncheck.png';
                subtaskText.classList.remove('completed');
            }
        }
    }
    await setItem('taskArray', JSON.stringify(taskArray));
}
