/**
 * Array to store filtered tasks.
 */
let filteredTasksArray = [];
/**
 * Array to store category colors.
 */
let categoryColorsArray = [];
/**
 * Variable to store the currently dragged task id.
 * @type {number}
 */
let currentDraggedTask;

/**
 * Initializes the board by setting up templates, loading user information and initializing arrays.
 */
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
    createGuestTemplates();
    updateTasks();
    checkCurrentId();
    disableLoadingScreenBoard();
}

/**
 * Initializes the contacts array in the board.
 */
async function initContactsArrayInBoard() {
    await createIndividuallyContactsArray();
    await loadIndividuallyContacts();
}

/**
 * Initializes the task array in the board.
 */
async function initTaskArrayInBoard() {
    await createIndividuallyTaskArray();
    await loadIndividuallyTasks();
}

/**
 * Initializes the categories array in the board.
 */
async function initCategoriesArrayInBoard() {
    await createIndividuallyCategories();
    await loadIndividuallyCategories();
}

/**
 * Creates guest templates by initializing guest tasks, contacts and categories.
 */
function createGuestTemplates() {
    guestCreateTaskArray();
    guestCreateContactArray();
    checkGuestCategory();
}

/**
 * Disables the loading screen and makes the board page visible.
 */
function disableLoadingScreenBoard() {
    toggleVisibility('boardTemplateId', true);
    toggleVisibility('loaderContainerId', false);
}

/**
 * Updates the tasks on the board by applying various filters.
 */
function updateTasks() {
    toDoFilter();
    inProgressFilter();
    awaitFeedbackFilter();
    doneFilter();
    subtasksExistingBoardSmall();
    categoryColor();
}

/**
 * Adds default categories for guest users.
 */
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

/**
 * Sorts tasks based on priority and date.
 * @param {*} a - First task object.
 * @param {*} b - Second task object.
 * @returns {number} - Comparison result.
 */
function sortBoard(a, b) {
    const priorityComparison = (b.urgent - a.urgent) || (b.medium - a.medium) || (b.low - a.low);
    const [dayA, monthA, yearA] = a.date.split('/');
    const [dayB, monthB, yearB] = b.date.split('/');
    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
    const dateComparison = dateA - dateB;
    return priorityComparison || dateComparison;
}

/**
 * Update the progress of subtasks for a given task.
 * @param {*} task - Task object.
 */
function checkSubtaskProgress(task) {
    const subtasksLimit = task.confirmedSubtasks.length;
    const completedSubtasks = task.confirmedSubtasks.filter(subtask => subtask === true).length;
    const progressPercentage = subtasksLimit > 0 ? (completedSubtasks / subtasksLimit) * 100 : 0;
    const progressBar = document.getElementById(`progressBarId${task.id}`);
    progressBar.style.width = `${progressPercentage}%`;
    const progressText = document.getElementById(`progressId${task.id}`);
    progressText.textContent = `${completedSubtasks}/${subtasksLimit}`;
}

/**
 * Initiates the dragging of a task.
 * @param {*} id - Task ID.
 */
function startDragging(id) {
    currentDraggedTask = id;
    document.getElementById(`taskId${id}`).classList.add('rotated');
}

/**
 * Allows dropping when dragging over a drop zone.
 * @param {*} ev - Drag event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Moves the currently dragged task to the specified category.
 * @param {string} category - Category to move the task to.
 */
async function moveTo(category) {
    taskArray[currentDraggedTask]['progressStatus'] = category;
    removeHighlight();
    updateTasks();
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
}

/**
 * Highlights the drop zone when dragging over it.
 * @param {string} id - Id of the drop zone.
 */
function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');

    let removeClass = document.querySelectorAll('.dragPlaceholder');
    removeClass.forEach(function (element) {
        element.classList.remove('dNone');
    });
}

/**
 * Removes the highlight from drop zones.
 */
function removeHighlight() {
    document.getElementById('toDoId').classList.remove('dragAreaHighlight');
    document.getElementById('inProgressId').classList.remove('dragAreaHighlight');
    document.getElementById('awaitFeedbackId').classList.remove('dragAreaHighlight');
    document.getElementById('doneId').classList.remove('dragAreaHighlight');
}

/**
 * Opens the task popup for creating a new task.
 */
function openTaskPopup() {
    addTaskTemplate();
    slideTwoObjects('addTaskTemplateId', 'backgroundAddTaskPopupId'); toggleVisibility('closePopupId', true);
    enableCalender();
    listContacts();
    updateCategoryList();
    mediumBtn();
}

/**
 * Checks the priority of a task and returns corresponding values.
 * @param {*} task - Task object.
 * @returns {{prioImg: string, prioText: string, dNone: string}} - Priority information.
 */
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

/**
 * Checks the amount of contacts for a task.
 * @param {Array} contacts - Array of contacts.
 * @param {string} id - Task Id.
 */
function checkAmountContactsBoardSmall(contacts, id) {
    const contactsInBoardSmallId = document.getElementById(`contactsInBoardSmallId${id}`);
    contactsInBoardSmallId.innerHTML = '';
    const maxContactsToShow = 6;
    for (let i = 0; i < contacts.length; i++) {
        let contactBoard = contacts[i];
        if (i < maxContactsToShow) {
            contactsInBoardSmallId.innerHTML += generateContactsBoardSmallHTML(contactBoard);
        } else if (i === maxContactsToShow) {
            contactsInBoardSmallId.innerHTML += generateMoreContactsBoardSmallHTML(contacts.length, maxContactsToShow);

        }
    }
}

/**
 * Opens the board for a specific task, displaying detailed information.
 * @param {number} taskIndex - Index of the task in the array.
 */
function openBoard(taskIndex) {
    let task = taskArray[taskIndex];
    slideTwoObjects('boardAreaId', 'backgroundBoardPopupId');
    checkPrio(task);
    document.getElementById('boardAreaId').innerHTML = generateBoardHTML(task, taskIndex);
    checkOpenBoardBehaviour(task, taskIndex);
    checkSubtaskConfirmed(task.confirmedSubtasks);
    categoryColor();
}

/**
 * Update the behavior of the opened board for a task.
 * @param {*} task - Task object.
 * @param {number} taskIndex - Index of the task in the array.
 */
function checkOpenBoardBehaviour(task, taskIndex) {
    if (task.contacts.length != 0) {
        checkAmountContactsBoardBig(task.contacts, taskIndex);
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

/**
 * Checks the amount of contacts in the big board view.
 * @param {Array} contacts - Array of contacts.
 * @param {number} taskIndex - Index of the task in the array.
 */
function checkAmountContactsBoardBig(contacts, taskIndex) {
    const contactsBoardBig = document.getElementById(`contactsInBoardBigId${taskIndex}`);
    contactsBoardBig.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        contactsBoardBig.innerHTML += generateContactsBoardBigHTML(contact);
    }
}

/**
 * Checks the amount of subtasks in the big board view.
 * @param {Array} subtasks - Array of subtasks.
 * @param {number} taskIndex - Index of the task in the array.
 */
function checkAmountSubtasksBoardBig(subtasks, taskIndex) {
    let subtasksBoardBig = document.getElementById(`subtasksInBoardBigId${taskIndex}`);
    subtasksBoardBig.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        subtasksBoardBig.innerHTML += gernerateSubtasksBoardBigHTML(subtask, i, taskIndex);
    }
}

/**
 * Toggles the completion status of a subtask.
 * @param {number} subtaskIndex - Index of the subtask in the task's subtasks array.
 * @param {number} taskIndex - Index of the task in the array.
 */
function toggleSubtask(subtaskIndex, taskIndex) {
    let task = taskArray[taskIndex];
    let subtaskStatus = task.confirmedSubtasks[subtaskIndex];
    task.confirmedSubtasks[subtaskIndex] = !subtaskStatus;
    checkSubtaskConfirmed(taskArray[taskIndex].confirmedSubtasks);
    updateTasks();
}

/**
 * Update the completion status of subtasks.
 * @param {Array} confirmedSubtasks - Array of confirmed subtasks.
 * @returns {Promise<void>}
 */
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

/**
 * Update the visibility of progress bars for tasks with existing subtasks.
 */
function subtasksExistingBoardSmall() {
    for (let i = 0; i < taskArray.length; i++) {
        let task = taskArray[i];
        if (task.subtasks.length != 0) {
            toggleVisibility(`progressBarAreaId${i}`, true);
        }
    }
}

/**
 * Sets up event handling for the 'To do' task creation form.
 */
function toDoChangeFunction() {
    const toDo = document.getElementById('createTaskId');
    toDo.onsubmit = function () {
        onClickToDo();
        return false;
    };
}

/**
 * Sets up event handling for the 'In progress' task creation form.
 */
function inProgressChangeFunction() {
    const inProgress = document.getElementById('createTaskId');
    inProgress.onsubmit = function () {
        onClickInProgress();
        return false;
    };
}

/**
 * Sets up event handling for the 'Await feedback' task creation form.
 */
function awaitFeedbackChangeFunction() {
    const awaitFeedback = document.getElementById('createTaskId');
    awaitFeedback.onsubmit = function () {
        onClickAwaitFeedback();
        return false;
    };
}

/**
 * Generates a dark color based on a string.
 * @param {string} str - Input string.
 */
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

/**
 * Manages the behavior of category colors for tasks.
 * @param {HTMLElement} smallCategoryElement - Small category element.
 * @param {HTMLElement} bigCategoryElement - Big category element.
 * @param {string} categoryName - Category name.
 * @param {*} colorObject - Object containing category color information.
 * @param {*} task - Task object.
 */
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

/**
 * Updates the category colors for tasks on the board.
 */
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

/**
 * Sets the background color of a task's category.
 * @param {*} task - Task object.
 */
function setCategoryBackgroundColor(task) {
    const smallCategoryElement = document.getElementById(`subjectKanbanSmallId${task.id}`);
    const bigCategoryElement = document.getElementById(`subjectKanbanBigId${task.id}`);
    const categoryName = task.category;
    let colorObject = categoryColorsArray.find(obj => obj.categoryName === task.category);
    categoryColorBehavior(smallCategoryElement, bigCategoryElement, categoryName, colorObject, task);
}

/**
 * Updates the colors of contacts in the task array.
 */
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

/**
 * Manages the behavior of contact colors for tasks.
 * @param {number} contactIndex - Index of the contact in the contacts array.
 * @param {number} i - Index of the task in the task array.
 * @param {number} j - Index of the contact in the task's contacts array.
 */
function contactsColorBehavior(contactIndex, i, j) {
    if (contactIndex !== -1) {
        taskArray[i].contacts[j].color = contactsArray[contactIndex].color;
    } else {
        taskArray[i].contacts.splice(j, 1);
        j--;
    }
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