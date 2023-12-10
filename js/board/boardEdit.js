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
let currentTaskIndex;

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

function checkTaskChanges(task, taskIndex) {
    checkOldTaskInputs(task);
    checkBtnPressStatus(task);
    checkSubtaskChange(task);
    checkContactsChange(taskIndex);
}

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

function checkOldTaskInputs(task) {
    document.getElementById('addTaskTextId').innerHTML = 'Edit task';
    document.getElementById('createTaskTextId').innerHTML = 'Save task';
    document.getElementById('addTaskTitleId').value = task.title;
    document.getElementById('addTaskDescriptionId').value = task.description;
    document.getElementById('datepickerId').value = task.date;
    document.getElementById('addCategoryId').value = task.category;
}

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

function checkBtnPressStatus(task) {
    if (task.urgent === true) {
        urgentBtn();
    } else if (task.medium === true) {
        mediumBtn();
    } else if (task.low === true) {
        lowBtn();
    }
}

function checkSubtaskChange(task) {
    for (let i = 0; i < task.subtasks.length; i++) {
        const subtask = task.subtasks[i];
        document.getElementById('subtaskInputId').value = subtask;
        addSubtask();
    }
}

function checkContactsChange(taskIndex) {
    for (let j = 0; j < contactsArray.length; j++) {
        let contact = contactsArray[j];
        let contactsInCurrentTaskArray = taskArray[taskIndex].contacts;
        if (contactsInCurrentTaskArray.some(item => item.name === contact.name)) {
            toggleCheckContact(`checkContactImgId${j}`, j);
        }
    }
}

function checkProgressBarChange() {
    const newSubtasksCount = updatedSubtasksInTaskArray.length - updatedConfirmedSubtasksArray.length;
    for (let i = 0; i < newSubtasksCount; i++) {
        updatedConfirmedSubtasksArray.push(false);
    }
}

function checkSubtaskCompletedColor(j) {
    document.getElementById(`subtaskListElement${j}`).style.color = '#7EE331';
    document.getElementById(`subtaskEditInputId${j}`).style.color = '#7EE331';
}

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

function saveChangeFunction(taskIndex) {
    const saveDestination = document.getElementById('createTaskId');
    saveDestination.onsubmit = function () {
        saveEditedTask(taskIndex);
        return false;
    };
}