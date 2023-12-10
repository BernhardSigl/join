let contactsInTaskArray = [];
let subtasksInTaskArray = [];
let confirmedSubtasksArray = [];
let datePickerExecuted;
let currentId;
let taskArray;
let categoriesInTaskArray;

async function initAddTask() {
    navPanelsTemplate();
    navPanelPopupTemplate();
    addTaskTemplate();
    enableCalender();
    await loadLoggedInUser();
    await initContactsInAddTask();
    await initCategoriesArray();
    await createIndividuallyTaskArray();
    await loadIndividuallyTasks();
    checkCurrentId();
    toggleVisibility('loaderContainerId', false);
}

async function initContactsInAddTask() {
    await loadUsers();
    await createIndividuallyContactsArray();
    await loadIndividuallyContacts();
    await createLoggedInUser();
    guestCreateContactArray();
    listContacts();
}

async function initCategoriesArray() {
    await createIndividuallyCategories();
    await loadIndividuallyCategories();
    checkGuestCategory();
    updateCategoryList();
    checkCategoryEmptyStatus();
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

function checkCurrentId() {
    if (taskArray.length > 0) {
        currentId = taskArray.reduce((maxId, task) => Math.max(maxId, task.id), -1) + 1;
    } else {
        currentId = 0;
    }
}

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

function enableCalender() {
    datePickerExecuted = false;
    removePikaday();
    datePicker();
}

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

function removePikaday() {
    let pikadayElements = document.querySelectorAll('.pika-single');
    pikadayElements.forEach(function (element) {
        element.parentNode.removeChild(element);
    });
}

function onClickToDo() {
    createTask(`toDo`);
}

function onClickInProgress() {
    createTask(`inProgress`);
}

function onClickAwaitFeedback() {
    createTask(`awaitFeedback`);
}

async function createTask(moveTo) {
    createTaskData(moveTo);
    contactsInTaskArray = [];
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
    clearTask();
    createTaskBoardBehavior();
    createdItemBtn('Task successfully created');
}

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

function createTaskBoardBehavior() {
    if (window.location.href.endsWith("board.html")) {
        updateTasks();
        slideOutTwoObjects('addTaskTemplateId', 'backgroundAddTaskPopupId');
    }
}

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