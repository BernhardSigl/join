/**
 * Updated title of the task being edited.
 * @type {string}
 */
let updatedTitle;
/**
 * Updated description of the task being edited.
 * @type {string}
 */
let updatedDescription;
/**
 * Updated date of the task being edited.
 * @type {string}
 */
let updatedDate;
/**
 * Updated category of the task being edited.
 * @type {string}
 */
let updatedCategory;
/**
 * Updated priority status for low priority of the task being edited.
 * @type {boolean}
 */
let updatedPrioLow;
/**
 * Updated priority status for medium priority of the task being edited.
 * @type {boolean}
 */
let updatedPrioMedium;
/**
 * Updated priority status for urgent priority of the task being edited.
 * @type {boolean}
 */
let updatedPrioUrgent;
/**
 * Interval ID for checking task changes during editing.
 * @type {number}
 */
let intervalId;
/**
 * Updated contacts array for the task being edited.
 * @type {Array}
 */
let updatedContactsInTaskArray;
/**
 * Updated array representing the confirmed status of subtasks for the task being edited.
 * @type {Array}
 */
let updatedConfirmedSubtasksArray;
/**
 * Array to store the initial state of subtasks before any changes during editing.
 * @type {number}
 */
let subtasksAtBeginning;
/**
 * Updated subtasks array for the task being edited.
 * @type {Array}
 */
let updatedSubtasksInTaskArray;
/**
 * Index of the current task being edited.
 * @type {number}
 */
let currentTaskIndex;

/**
 * Opens the task editing popup and initializes the editing environment.
 * @param {number} taskIndex - Index of the task to be edited.
 */
function editTask(taskIndex) {
    let task = taskArray[taskIndex];
    openTaskPopup();
    resetSearch();
    saveChangeFunction(taskIndex);
    toggleVisibility('backgroundBoardPopupId', false);
    checkTaskChanges(task, taskIndex);
    subtasksAtBeginning = subtasksInTaskArray.length;
    checkTaskChangesInterval(task);
    assignedContacts();
    updateSubtaskListInEditMode(taskIndex);
    currentTaskIndex = taskIndex;
}

/**
 * Checks and records the changes made to the task during editing.
 * @param {*} task - Task object being edited.
 * @param {number} taskIndex - Index of the task being edited.
 */
function checkTaskChanges(task, taskIndex) {
    checkOldTaskInputs(task);
    checkBtnPressStatus(task);
    checkSubtaskChange(task);
    checkContactsChange(taskIndex);
}

/**
 * Checks and records task changes at intervals during editing.
 * @param {*} task - Task object being edited.
 */
function checkTaskChangesInterval(task) {
    intervalId = setInterval(() => {
        checkNewTaskInputs(task);
        if (updatedSubtasksInTaskArray.length != updatedConfirmedSubtasksArray.length) {
            checkProgressBarChange();
        }
        for (let j = 0; j < updatedSubtasksInTaskArray.length; j++) {
            const updatetConfirmedSubtask = task.confirmedSubtasks[j];
            if (updatetConfirmedSubtask) {
                checkSubtaskCompletedColor(j);
            }
        }
    }, 250)
}

/**
 * Checks and records the initial state of the task inputs.
 * @param {*} task - Task object being edited.
 */
function checkOldTaskInputs(task) {
    document.getElementById('addTaskTextId').innerHTML = 'Edit task';
    document.getElementById('createTaskTextId').innerHTML = 'Save task';
    document.getElementById('addTaskTitleId').value = task.title;
    document.getElementById('addTaskDescriptionId').value = task.description;
    document.getElementById('datepickerId').value = task.date;
    document.getElementById('addCategoryId').value = task.category;
}

/**
 * Checks and records the updated state of the task inputs.
 * @param {*} task - Task object being edited.
 */
function checkNewTaskInputs(task) {
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
}

/**
 * Checks and sets the priority button status based on the task being edited.
 * @param {*} task - Task object being edited.
 */
function checkBtnPressStatus(task) {
    if (task.urgent === true) {
        urgentBtn();
    } else if (task.medium === true) {
        mediumBtn();
    } else if (task.low === true) {
        lowBtn();
    }
}

/**
 * Checks and records changes to subtasks during editing.
 * @param {*} task - Task object being edited.
 */
function checkSubtaskChange(task) {
    for (let i = 0; i < task.subtasks.length; i++) {
        const subtask = task.subtasks[i];
        document.getElementById('subtaskInputId').value = subtask;
        addSubtask();
    }
}

/**
 * Checks and updates the contacts status during editing.
 * @param {number} taskIndex - Index of the task being edited.
 */
function checkContactsChange(taskIndex) {
    for (let j = 0; j < contactsArray.length; j++) {
        let contact = contactsArray[j];
        let contactsInCurrentTaskArray = taskArray[taskIndex].contacts;
        if (contactsInCurrentTaskArray.some(item => item.name === contact.name)) {
            toggleCheckContact(`checkContactImgId${j}`, j);
        }
    }
}

/**
 * Checks and updates the progress bar when the number of subtasks changes.
 */
function checkProgressBarChange() {
    const newSubtasksCount = updatedSubtasksInTaskArray.length - updatedConfirmedSubtasksArray.length;
    for (let i = 0; i < newSubtasksCount; i++) {
        updatedConfirmedSubtasksArray.push(false);
    }
}

/**
 * Changes the color of completed subtasks during editing.
 * @param {number} j - Index of the subtask in the array.
 */
function checkSubtaskCompletedColor(j) {
    document.getElementById(`subtaskListElement${j}`).style.color = '#7EE331';
    document.getElementById(`subtaskEditInputId${j}`).style.color = '#7EE331';
}

/**
 * Saves the edited task data and clear inputs and the interval.
 * @param {number} taskIndex - Index of the task being edited.
 */
async function saveEditedTask(taskIndex) {
    await new Promise(resolve => setTimeout(resolve, 175));
    saveEditedTaskData(taskIndex);
    slideOutTwoObjects('addTaskTemplateId', 'backgroundAddTaskPopupId');
    clearTask();
    clearInterval(intervalId);
    updateTasks();
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
    createdItemBtn('Task successfully saved');
}

/**
 * Saves the edited task data into the task array.
 * @param {number} taskIndex - Index of the task being edited.
 */
function saveEditedTaskData(taskIndex) {
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
}

/**
 * Sets up the event handler for adding subtasks during editing.
 * @param {number} taskIndex - Index of the task being edited.
 */
function addSubtaskChangeFunction(taskIndex) {
    const addSubtaskEdit = document.getElementById('addSubtaskImgId');
    addSubtaskEdit.onclick = function () {
        addSubtaskInEditMode(taskIndex);
        return false;
    };
}

/**
 * Adds a subtask during editing.
 * @param {number} taskIndex - Index of the task being edited.
 */
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

/**
 * Updates the subtask list during editing.
 * @param {number} taskIndex - Index of the task being edited.
 */
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

/**
 * Sets up the event handler for saving changes during editing.
 * @param {number} taskIndex - Index of the task being edited.
 */
function saveChangeFunction(taskIndex) {
    const saveDestination = document.getElementById('createTaskId');
    saveDestination.onsubmit = function () {
        saveEditedTask(taskIndex);
        return false;
    };
}