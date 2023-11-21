let filteredTasksArray = [];

let currentDraggedTask;

async function initBoard() {
    navPanelsTemplate();
    addTaskTemplate();
    await loadTask();
    await loadContacts();
    // await loadLoggedInUser();
    await loadCategories();
    await loadSubtasks();
    await loadCategoryColors();
    updateContactColors();
    updateTasks();
    checkCurrentId();
}

function updateTasks() {
    toDoFilter();
    inProgressFilter();
    awaitFeedbackFilter();
    doneFilter();
    subtasksExistingBoardSmall();
    categoryColor();
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
    } else if (task.contacts.length !== 0) {
        return prioImg = 'placeholder', dNone = '';
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
    categoryColor();
}

function checkAmountContactsBoardBig(contacts, taskIndex) {
    const contactsBoardBig = document.getElementById(`contactsInBoardBigId${taskIndex}`);
    contactsBoardBig.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        contactsBoardBig.innerHTML += generateContactsBoardBigHTML(contact);
    }
}

function checkAmountSubtasksBoardBig(subtasks, taskIndex) {
    let subtasksBoardBig = document.getElementById(`subtasksInBoardBigId${taskIndex}`);
    subtasksBoardBig.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        subtasksBoardBig.innerHTML += gernerateSubtasksBoardBigHTML(subtask, i, taskIndex);
    }
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
        saveEditedTask(taskIndex);
        return false;
    };
}

let updatedTitle;
let updatedDescription;
let updatedDate;
let updatedCategory;
let updatedPrioLow;
let updatedPrioMedium;
let updatedPrioUrgent;
let intervalId;
let updatedContactsInTaskArray;
let updatedConfirmedSubtasksArray;
let subtasksAtBeginning;
let updatedSubtasksInTaskArray;

function editTask(taskIndex) {
    let task = taskArray[taskIndex];
    openTaskPopup();
    resetSearch();
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
    for (let j = 0; j < contactsArray.length; j++) {
        let contact = contactsArray[j];
        let contactsInCurrentTaskArray = taskArray[taskIndex].contacts;
        console.log(contactsInCurrentTaskArray);
        if (contactsInCurrentTaskArray.some(item => item.name === contact.name)) {
            toggleCheckContact(`checkContactImgId${j}`, j);
        }
    }

    subtasksAtBeginning = subtasksInTaskArray.length;

    intervalId = setInterval(() => {
        updatedDescription = document.getElementById('addTaskDescriptionId').value;
        updatedTitle = document.getElementById('addTaskTitleId').value;
        updatedDate = document.getElementById('datepickerId').value;
        updatedCategory = document.getElementById('addCategoryId').value;
        updatedPrioLow = lowStatus;
        updatedPrioMedium = mediumStatus;
        updatedPrioUrgent = urgentStatus;
        updatedContactsInTaskArray = contactsInTaskArray;

        updatedSubtasksInTaskArray = subtasksInTaskArray;
        updatedConfirmedSubtasksArray = task.confirmedSubtasks;
        if (updatedSubtasksInTaskArray.length != updatedConfirmedSubtasksArray.length) {
            const newSubtasksCount = updatedSubtasksInTaskArray.length - updatedConfirmedSubtasksArray.length;
            for (let i = 0; i < newSubtasksCount; i++) {
                updatedConfirmedSubtasksArray.push(false);
            }
        }

        for (let j = 0; j < updatedSubtasksInTaskArray.length; j++) {
            const updatetConfirmedSubtask = task.confirmedSubtasks[j];
            if (updatetConfirmedSubtask) {
                document.getElementById(`subtaskListElement${j}`).style.color = '#7EE331';
                document.getElementById(`subtaskEditInputId${j}`).style.color = '#7EE331';
            }
        }
    }, 250);

    assignedContacts();
    updateSubtaskListInEditMode(taskIndex);
}

function isEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}

async function saveEditedTask(taskIndex) {
    await new Promise(resolve => setTimeout(resolve, 175));
    let task = taskArray[taskIndex];
    task.title = updatedTitle;
    task.description = updatedDescription;
    task.date = updatedDate;
    task.category = updatedCategory;
    task.low = updatedPrioLow;
    task.medium = updatedPrioMedium;
    task.urgent = updatedPrioUrgent;
    task.contacts = updatedContactsInTaskArray;
    task.subtasks = updatedSubtasksInTaskArray;
    task.confirmedSubtasks = updatedConfirmedSubtasksArray;
    slideOutTwoObjects('addTaskTemplateId', 'backgroundAddTaskPopupId');
    clearTask();
    clearInterval(intervalId);
    updateTasks();
    await setItem('taskArray', JSON.stringify(taskArray));
}

function filterTasks(searchTerm) {
    if (searchTerm.trim() === '') {
        resetSearch();
        return;
    }
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

function addSubtaskChangeFunction(taskIndex) {
    const addSubtaskEdit = document.getElementById('addSubtaskImgId');
    addSubtaskEdit.onclick = function () {
        addSubtaskInEditMode(taskIndex);
        return false;
    };
}

function addSubtaskInEditMode(taskIndex) {
    let task = taskArray[taskIndex];
    let subtasks = task.subtasks;
    let subtaskInput = document.getElementById('subtaskInputId');
    let subtaskList = document.getElementById('subtaskListId');
    subtasks.push(subtaskInput.value);
    subtasksInTaskArray.push(subtaskInput.value);
    task.confirmedSubtasks.push(false);
    subtaskList.innerHTML = '';
    subtaskInput.value = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        subtaskList.innerHTML += generateSubtaskListHTML(subtask, i);
    }
    disableSubtaskInput();
    updateSubtaskListInEditMode(taskIndex);
}

function updateSubtaskListInEditMode(taskIndex) {
    let task = taskArray[taskIndex];
    let subtasks = task.subtasks;
    let subtaskList = document.getElementById('subtaskListId');
    subtaskList.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        const confirmedSubtask = task.confirmedSubtasks[i];
        subtaskList.innerHTML += generateSubtaskListHTML(subtask, i);
        if (confirmedSubtask) {
            document.getElementById(`subtaskListElement${i}`).style.color = '#7EE331';
            document.getElementById(`subtaskEditInputId${i}`).style.color = '#7EE331';
        }
    }
}


let categoryColorsArray = [];

function generateDarkColorFromString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.floor(Math.random() * 361);
    const saturation = Math.floor(Math.random() * 51) + 50;
    const lightness = Math.floor(Math.random() * 31) + 20;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function setCategoryBackgroundColor(task) {
    const smallCategoryElement = document.getElementById(`subjectKanbanSmallId${task.id}`);
    const bigCategoryElement = document.getElementById(`subjectKanbanBigId${task.id}`);
    const categoryName = task.category;

    let colorObject = categoryColorsArray.find(obj => obj.categoryName === task.category);

    if (!colorObject) {
        const colorValue = generateDarkColorFromString(task.category);
        colorObject = { categoryName: categoryName, color: colorValue };
        categoryColorsArray.push(colorObject);
    }
    smallCategoryElement.style.backgroundColor = colorObject.color;
    if (bigCategoryElement) {
        bigCategoryElement.style.backgroundColor = colorObject.color;
    }
}

async function categoryColor() {
    taskArray.forEach(task => {
        setCategoryBackgroundColor(task);
    });
    const existingCategories = new Set(taskArray.map(task => task.category));
    categoryColorsArray = categoryColorsArray.filter(obj => existingCategories.has(obj.categoryName));

    taskArray.forEach(task => {
        setCategoryBackgroundColor(task);
    });
    await setItem('categoryColorsArray', JSON.stringify(categoryColorsArray));
}

function updateContactColors() {
    for (let i = 0; i < taskArray.length; i++) {
        const task = taskArray[i];

        for (let j = 0; j < task.contacts.length; j++) {
            const taskContact = task.contacts[j];

            const contactIndex = contactsArray.findIndex(contact => contact.name === taskContact.name);

            if (contactIndex !== -1) {
                taskArray[i].contacts[j].color = contactsArray[contactIndex].color;
            } else {
                // Remove contact from task.contacts if not found in contactsArray
                taskArray[i].contacts.splice(j, 1);
                j--;  // Adjust index after removing element
            }
        }
    }
}
