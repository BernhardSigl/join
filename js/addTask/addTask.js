/**
 * Array to store contacts in a task.
 */
let contactsInTaskArray = [];
/**
 * Array to store subtasks in a task.
 */
let subtasksInTaskArray = [];
/**
 * Array to store confirmed subtasks in a task.
 */
let confirmedSubtasksArray = [];
/**
 * Flag to check if date picker has been executed.
 * @type {boolean}
 */
let datePickerExecuted;
/**
 * Current ID for task creation.
 * @type {number}
 */
let currentId;
/**
 * Array to store tasks.
 */
let taskArray;

/**
 * Array to store categories related to tasks.
 * @type {Array}
 */
let categoriesInTaskArray;

/**
 * Initializes the add task functionality.
 */
async function initAddTask() {
    navPanelsTemplate();
    navPanelPopupTemplate();
    addTaskTemplate();
    enableCalender();
    await loadLoggedInUser();
    await loadUsers();
    await initContactsInAddTask();
    await initCategoriesArrayInAddTask();
    await createIndividuallyTaskArray();
    await loadIndividuallyTasks();
    checkCurrentId();
    toggleVisibility('loaderContainerId', false);
}

/**
 * Initializes contacts array.
 */
async function initContactsInAddTask() {
    await createIndividuallyContactsArray();
    await loadIndividuallyContacts();
    await createLoggedInUser();
    guestCreateContactArray();
    listContacts();
}

/**
 * Initializes the categories array.
 */
async function initCategoriesArrayInAddTask() {
    await createIndividuallyCategories();
    await loadIndividuallyCategories();
    checkGuestCategory();
    updateCategoryList();
    checkCategoryEmptyStatus();
}

/**
 * Adds guest categories if the logged-in user is a guest.
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
 * Creates an individual task array.
 */
async function createIndividuallyTaskArray() {//
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        userId = user.id;
        if (loggedInUser[0].email === user.email) {
            taskArray = user[`individuallyTasks_${userId}`] = [];
            return userId, taskArray;
        }
    }
}

/**
 * Creates an individual categories array.
 */
async function createIndividuallyCategories() {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        userId = user.id;
        if (loggedInUser[0].email === user.email) {
            categoriesInTaskArray = user[`individuallyCategories_${userId}`] = [];
            return userId, categoriesInTaskArray;
        }
    }
}

/**
 * Sets the current ID for task creation.
 */
function checkCurrentId() {
    if (taskArray.length > 0) {
        currentId = taskArray.reduce((maxId, task) => Math.max(maxId, task.id), -1) + 1;
    } else {
        currentId = 0;
    }
}

/**
 * Deletes a task from the task array.
 * @param {number} taskId - The ID of the task to delete.
 */
async function deleteTask(taskId) {
    taskArray = taskArray.filter(task => task.id !== taskId);
    taskArray.forEach((task, index) => {
        task.id = index;
    });
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
    updateTasks();
    slideOutTwoObjects('boardAreaId', 'backgroundBoardPopupId');
    createdItemBtn('Task successfully deleted');
}

/**
 * Enables the date picker for task creation.
 */
function enableCalender() {
    datePickerExecuted = false;
    removePikaday();
    datePicker();
}

/**
 * Initializes the pikaday date picker.
 */
function datePicker() {
    if (!datePickerExecuted) {
        let dateInput = document.getElementById('datepickerId');
        new Pikaday({
            field: dateInput,
            position: 'top right',
            format: 'DD/MM/YYYY',
            onSelect: function (date) {
                const formattedDate = [
                    date.getDate().toString().padStart(2, '0'),
                    (date.getMonth() + 1).toString().padStart(2, '0'),
                    date.getFullYear()
                ].join('/');
                dateInput.value = formattedDate;
            }
        });
        datePickerExecuted = true;
    }
}

/**
 * Remove pikaday.
 */
function removePikaday() {
    let pikadayElements = document.querySelectorAll('.pika-single');
    pikadayElements.forEach(function (element) {
        element.parentNode.removeChild(element);
    });
}

/**
 * Handles the creation of a task in the 'To do' progress status.
 */
function onClickToDo() {
    createTask(`toDo`);
}

/**
 * Handles the creation of a task in the 'In progress' progress status.
 */
function onClickInProgress() {
    createTask(`inProgress`);
}

/**
 * Handles the creation of a task in the 'Await feedback' progress status.
 */
function onClickAwaitFeedback() {
    createTask(`awaitFeedback`);
}

/**
 * Creates a task and adds it to the task array.
 * @param {string} moveTo - Move the task to a specific category.
 */
async function createTask(moveTo) {
    createTaskData(moveTo);
    contactsInTaskArray = [];
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
    clearTask();
    createTaskBoardBehavior();
    createdItemBtn('Task successfully created');
}

/**
 * Gathers data and creates a task object.
 * @param {string} moveTo - Move the task to a specific category.
 */
function createTaskData(moveTo) {
    while (taskArray.some(task => task.id === currentId)) {
        currentId++;
    }
    let confirmedSubtasksArray = Array(subtasksInTaskArray.length).fill(false);
    const addTask = {
        'title': document.getElementById('addTaskTitleId').value,
        'description': document.getElementById('addTaskDescriptionId').value,
        'date': document.getElementById('datepickerId').value,
        'category': document.getElementById('addCategoryId').value,
        'urgent': urgentStatus,
        'medium': mediumStatus,
        'low': lowStatus,
        'contacts': contactsInTaskArray,
        'subtasks': subtasksInTaskArray,
        'progressStatus': moveTo,
        'id': currentId,
        'confirmedSubtasks': confirmedSubtasksArray,
    };
    taskArray.push(addTask);
}

/**
 * Executes specific behavior after creating a task, specific to the task board.
 */
function createTaskBoardBehavior() {
    if (window.location.href.endsWith("board.html")) {
        updateTasks();
        slideOutTwoObjects('addTaskTemplateId', 'backgroundAddTaskPopupId');
    }
}

/**
 * Clears the task input fields and resets related variables.
 */
function clearTask() {
    clearButtons();
    document.getElementById('addTaskTitleId').value = '';
    document.getElementById('addTaskDescriptionId').value = '';
    document.getElementById('datepickerId').value = '';
    document.getElementById('addCategoryId').value = '';
    document.getElementById('subtaskInputId').value = '';
    document.getElementById('searchContactId').value = '';
    document.getElementById('subtaskListId').innerHTML = '';
    subtasksInTaskArray = [];
    clearAssignedContacts();
}

/**
 * Clears the assigned contacts in the task creation.
 */
function clearAssignedContacts() {
    contactsInTaskArray = [];
    for (let i = 0; i < contactsArray.length; i++) {
        let img = document.getElementById(`checkContactImgId${i}`);
        let selectedContact = document.getElementById(`assignedContactId${i}`);
        img.style.backgroundImage = "url('./img/uncheck.png')";
        selectedContact.style.backgroundColor = "white";
        selectedContact.style.color = "black";
        selectedContact.classList.remove('darkHoverListContacts');
    }
    assignedContacts();
}

/**
 * Closes the dropdown menus if the click is outside of them.
 * @param {Event} event - The click event.
 */
function closeDropdown(event) {
    const excludedContainerIds = ['searchContactId', 'contactsDropdownImgId', 'contactsDropdownContentId', 'addCategoryId', 'categoryDropdownImgId', 'categoryDropdownContentId'];
    for (const excludedContainerId of excludedContainerIds) {
        const excludedContainer = document.getElementById(excludedContainerId);
        if (excludedContainer && (event.target === excludedContainer || excludedContainer.contains(event.target))) {
            return;
        }
    }
    contactsDropdown();
    toggleContactsDrowdown();
    categoryDropup();
}

/**
 * Handles the behavior when the Enter key is pressed.
 * @param {Event} event - The key press event.
 */
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const activeElementId = document.activeElement.id;
        if (activeElementId === 'subtaskInputId') {
            addSubtask();
        } else if (activeElementId === 'addCategoryId') {
            listCategories();
        }
    }
}