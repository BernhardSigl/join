let currentDraggedTask;

async function initBoard() {
    navPanelsTemplate();
    addTaskTemplate();
    await loadTask();
    await loadContacts();
    await loadCategories();
    await loadSubtasks();
    updateTasks();
    checkCurrentId();
}

function updateTasks() {
    toDoFilter();
    inProgressFilter();
    awaitFeedbackFilter();
    doneFilter();
    subtasksExistingBoardSmall();
}

function toDoFilter() {
    let toDoFilter = taskArray.filter(t => t['progressStatus'] == 'toDo');
    toDoFilter.sort(sortBoard);
    document.getElementById('toDoId').innerHTML = '';
    for (let i = 0; i < toDoFilter.length; i++) {
        const toDoFiltered = toDoFilter[i];
        document.getElementById('toDoId').innerHTML += generateTaskHTML(toDoFiltered);
        checkAmountContactsBoardSmall(toDoFiltered.contacts, toDoFiltered.id);
        checkSubtaskProgress(toDoFiltered);
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
    inProgressFilter.sort(sortBoard);
    document.getElementById('inProgressId').innerHTML = '';
    for (let i = 0; i < inProgressFilter.length; i++) {
        const inProgressFiltered = inProgressFilter[i];
        document.getElementById('inProgressId').innerHTML += generateTaskHTML(inProgressFiltered);
        checkAmountContactsBoardSmall(inProgressFiltered.contacts, inProgressFiltered.id);
        checkSubtaskProgress(inProgressFiltered);
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
    awaitFeedbackFilter.sort(sortBoard);
    document.getElementById('awaitFeedbackId').innerHTML = '';
    for (let i = 0; i < awaitFeedbackFilter.length; i++) {
        const awaitFeedbackFiltered = awaitFeedbackFilter[i];
        document.getElementById('awaitFeedbackId').innerHTML += generateTaskHTML(awaitFeedbackFiltered);
        checkAmountContactsBoardSmall(awaitFeedbackFiltered.contacts, awaitFeedbackFiltered.id);
        checkSubtaskProgress(awaitFeedbackFiltered);
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
    doneFilter.sort(sortBoard);
    document.getElementById('doneId').innerHTML = '';
    for (let i = 0; i < doneFilter.length; i++) {
        const doneFilterFiltered = doneFilter[i];
        document.getElementById('doneId').innerHTML += generateTaskHTML(doneFilterFiltered);
        checkAmountContactsBoardSmall(doneFilterFiltered.contacts, doneFilterFiltered.id);
        checkSubtaskProgress(doneFilterFiltered);
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

function sortBoard(a, b) {
    const priorityComparison = (b.urgent - a.urgent) || (b.medium - a.medium) || (b.low - a.low);
    const [dayA, monthA, yearA] = a.date.split('/');
    const [dayB, monthB, yearB] = b.date.split('/');
    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
    const dateComparison = dateA - dateB;
    return priorityComparison || dateComparison;
}

function generateTaskHTML(task) {
    checkPrio(task);
    return /*html*/ `
    <div class="task pointer column gap24" draggable="true" id="taskId${task.id}" ondragstart="startDragging(${task.id})" onclick="openBoard(${task.id})">
        <span class="fontSize16 subjectKanbanSmall fontWhite pointer">${task.category}</span>
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
        <div class="w100 spaceBetween alignCenter ${dNone}">
            <div id="contactsInBoardSmallId${task.id}" class="alignCenter">
            </div>
            <img src="../img/${prioImg}.png" class="symbol20">
        </div>
    </div>
    `;
}

function checkSubtaskProgress(task) {
    const subtasksLimit = task.confirmedSubtasks.length;
    const completedSubtasks = task.confirmedSubtasks.filter(subtask => subtask === true).length;
    const progressPercentage = subtasksLimit > 0 ? (completedSubtasks / subtasksLimit) * 100 : 0;
    const progressBar = document.getElementById(`progressBarId${task.id}`);
    progressBar.style.width = `${progressPercentage}%`;
    const progressText = document.getElementById(`progressId${task.id}`);
    progressText.textContent = `${completedSubtasks}/${subtasksLimit}`;
}

function startDragging(id) {
    currentDraggedTask = id;
    document.getElementById(`taskId${id}`).classList.add('rotated');
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(category) {
    taskArray[currentDraggedTask]['progressStatus'] = category;
    removeHighlight();
    updateTasks();
    await setItem('taskArray', JSON.stringify(taskArray));
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
        return prioImg = 'lowGreen', prioText = "Low", dNone = '';
    } else if (task.medium === true) {
        return prioImg = 'mediumOrange', prioText = "Medium", dNone = '';
    } else if (task.urgent === true) {
        return prioImg = 'urgentRed', prioText = "Urgent", dNone = '';
    } else {
        return prioImg = 'urgentRed', prioText = "", dNone = 'dNone';
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

function openBoard(taskIndex) {
    let task = taskArray[taskIndex];
    slideTwoObjects('boardAreaId', 'backgroundBoardPopupId');
    checkPrio(task);
    document.getElementById('boardAreaId').innerHTML = generateBoardHTML(task, taskIndex);
    checkAmountContactsBoardBig(task.contacts, taskIndex);
    if (task.contacts.length != 0) {
        toggleVisibility(`assignedToAreaBoardBigId${taskIndex}`, true);
    }
    if (task.subtasks.length != 0) {
        checkAmountSubtasksBoardBig(task.subtasks, taskIndex);
        toggleVisibility(`subtaskBoardBigAreaId${taskIndex}`, true);
    }
    if (task.low === false && task.medium === false && task.urgent === false) {
        toggleVisibility(`prioAreaBoardBigId${taskIndex}`, false);
    }
    if (task.description === '') {
        toggleVisibility(`descriptionBoardBigId${taskIndex}`, false);
    }
    checkSubtaskConfirmed(task.confirmedSubtasks);
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

function checkAmountContactsBoardBig(contacts, taskIndex) {
    const contactsBoardBig = document.getElementById(`contactsInBoardBigId${taskIndex}`);
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

function checkAmountSubtasksBoardBig(subtasks, taskIndex) {
    let subtasksBoardBig = document.getElementById(`subtasksInBoardBigId${taskIndex}`);
    subtasksBoardBig.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        subtasksBoardBig.innerHTML += gernerateSubtasksBoardBigHTML(subtask, i, taskIndex);
    }
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

function toggleSubtask(subtaskIndex, taskIndex) {
    let task = taskArray[taskIndex];
    let subtaskStatus = task.confirmedSubtasks[subtaskIndex];
    task.confirmedSubtasks[subtaskIndex] = !subtaskStatus;
    checkSubtaskConfirmed(taskArray[taskIndex].confirmedSubtasks);
    updateTasks();
}

async function checkSubtaskConfirmed(confirmedSubtasks) {
    for (let i = 0; i < confirmedSubtasks.length; i++) {
        const confirmedSubtask = confirmedSubtasks[i];
        let subtaskImg = document.getElementById(`subtaskImgId${i}`);
        let subtaskText = document.getElementById(`subtaskTextId${i}`);
        if (confirmedSubtask === true) {
            subtaskImg.src = '../img/check.png';
            subtaskText.classList.add('completed');
        } else if (confirmedSubtask === false) {
            subtaskImg.src = '../img/uncheck.png';
            subtaskText.classList.remove('completed');
        }
        await setItem('taskArray', JSON.stringify(taskArray));
    }
}

function subtasksExistingBoardSmall() {
    for (let i = 0; i < taskArray.length; i++) {
        let task = taskArray[i];
        if (task.subtasks.length != 0) {
            toggleVisibility(`progressBarAreaId${i}`, true);
        }
    }
}

function toDoChangeFunction() {
    const toDo = document.getElementById('createTaskId');
    toDo.onsubmit = function () {
        onClickToDo();
        return false;
    };
}

function inProgressChangeFunction() {
    const inProgress = document.getElementById('createTaskId');
    inProgress.onsubmit = function () {
        onClickInProgress();
        return false;
    };
}

function awaitFeedbackChangeFunction() {
    const awaitFeedback = document.getElementById('createTaskId');
    awaitFeedback.onsubmit = function () {
        onClickAwaitFeedback();
        return false;
    };
}

function saveChangeFunction(taskIndex) {
    const saveDestination = document.getElementById('createTaskId');
    saveDestination.onsubmit = function () {
        saveTask(taskIndex);
        return false;
    };
}

function editTask(taskIndex) {
    let task = taskArray[taskIndex];
    openTaskPopup();
    resetSearch()
    saveChangeFunction(taskIndex);
    toggleVisibility('backgroundBoardPopupId', false);
    document.getElementById('addTaskTextId').innerHTML = 'Edit task';
    document.getElementById('createTaskTextId').innerHTML = 'Save task';
    document.getElementById('addTaskTitleId').value = task.title;
    document.getElementById('addTaskDescriptionId').value = task.description;
    document.getElementById('datepickerId').value = task.date;
    document.getElementById('addCategoryId').value = task.category;
    if (task.urgent === true) {
        urgentBtn();
    } else if (task.medium === true) {
        mediumBtn();
    } else if (task.low === true) {
        lowBtn();
    }
    for (let i = 0; i < task.subtasks.length; i++) {
        const subtask = task.subtasks[i];
        document.getElementById('subtaskInputId').value = subtask;
        addSubtask();
    }
    for (let j = 0; j < task.contacts.length; j++) {
        toggleCheckContact(`checkContactImgId${j}`, j);
    }
    assignedContacts();
}

function saveTask(taskIndex) {
    let saveDestination = taskArray[taskIndex].progressStatus;
    createTask(`${saveDestination}`);
    setTimeout(() => {
        deleteTask(taskIndex);
    }, 500);
}
let filteredTasksArray = [];

function filterTasks(searchTerm) {
    filteredTasksArray = taskArray.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.category.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    taskArray.forEach((_, index) => {
        const taskElement = document.getElementById(`taskId${index}`);
        taskElement.style.display = 'none';
    });
    document.getElementById('toDoSearchId').style.display = 'none';
    document.getElementById('inProgressSearchId').style.display = 'none';
    document.getElementById('awaitFeedbackSearchId').style.display = 'none';
    document.getElementById('doneSearchId').style.display = 'none';
    filteredTasksArray.forEach(task => {
        const index = taskArray.indexOf(task);
        const taskElement = document.getElementById(`taskId${index}`);
        const category = task.progressStatus;

        taskElement.style.display = 'flex';
        document.getElementById(`${category}SearchId`).style.display = 'flex';
    });
}

function resetSearch() {
    document.getElementById('searchFieldTasksId').value = '';
    taskArray.forEach((_, index) => {
        const taskElement = document.getElementById(`taskId${index}`);
        taskElement.style.display = 'flex';
    });
    document.getElementById('toDoSearchId').style.display = 'flex';
    document.getElementById('inProgressSearchId').style.display = 'flex';
    document.getElementById('awaitFeedbackSearchId').style.display = 'flex';
    document.getElementById('doneSearchId').style.display = 'flex';
    filteredTasksArray = [];
}