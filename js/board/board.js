let filteredTasksArray = [];
let categoryColorsArray = [];
let currentDraggedTask;

async function initBoard() {
    navPanelsTemplate();
    navPanelPopupTemplate();
    addTaskTemplate();
    await loadLoggedInUser();
    await loadUsers();
    await initContactsArrayInBoard();
    await createLoggedInUser();
    await initTaskArrayInBoard();
    await initCategoriesArrayInBoard();
    await loadSubtasks();
    await loadCategoryColors();
    updateContactColors();
    guestCreateTaskArray();
    guestCreateContactArray();
    checkGuestCategory();
    updateTasks();
    checkCurrentId();
    toggleVisibility('loaderContainerId', false);
}

async function initContactsArrayInBoard() {
    await createIndividuallyContactsArray();
    await loadIndividuallyContacts();
}

async function initTaskArrayInBoard() {
    await createIndividuallyTaskArray();
    await loadIndividuallyTasks();
}

async function initCategoriesArrayInBoard() {
    await createIndividuallyCategories();
    await loadIndividuallyCategories();
}

function updateTasks() {
    toDoFilter();
    inProgressFilter();
    awaitFeedbackFilter();
    doneFilter();
    subtasksExistingBoardSmall();
    categoryColor();
}

function checkGuestCategory() {
    if (loggedInUser[0].email === 'guest@guest.com') {
        if (!categoriesInTaskArray.includes('Design')) {
            categoriesInTaskArray.push('Design');
        }
        if (!categoriesInTaskArray.includes('Technical Task')) {
            categoriesInTaskArray.push('Technical Task');
        }
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
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
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

function openBoard(taskIndex) {
    let task = taskArray[taskIndex];
    slideTwoObjects('boardAreaId', 'backgroundBoardPopupId');
    checkPrio(task);
    document.getElementById('boardAreaId').innerHTML = generateBoardHTML(task, taskIndex);
    checkOpenBoardBehaviour(task, taskIndex);
    checkSubtaskConfirmed(task.confirmedSubtasks);
    categoryColor();
}

function checkOpenBoardBehaviour(task, taskIndex) {
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
            subtaskImg.src = './img/check.png';
            subtaskText.classList.add('completed');
        } else if (confirmedSubtask === false) {
            subtaskImg.src = './img/uncheck.png';
            subtaskText.classList.remove('completed');
        }
        await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
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
    categoryColorBehavior(smallCategoryElement, bigCategoryElement, categoryName, colorObject, task);
}

function categoryColorBehavior(smallCategoryElement, bigCategoryElement, categoryName, colorObject, task) {
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
    if (taskArray.length > 0) {
        for (let i = 0; i < taskArray.length; i++) {
            const task = taskArray[i];

            for (let j = 0; j < task.contacts.length; j++) {
                const taskContact = task.contacts[j];

                const contactIndex = contactsArray.findIndex(contact => contact.name === taskContact.name);

                contactsColorBehavior(contactIndex, i, j);
            }
        }
    }
}

function contactsColorBehavior(contactIndex, i, j) {
    if (contactIndex !== -1) {
        taskArray[i].contacts[j].color = contactsArray[contactIndex].color;
    } else {

        taskArray[i].contacts.splice(j, 1);
        j--;
    }
}