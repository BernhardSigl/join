// let taskArray = [];
let contactsInTaskArray = [];
// let categoriesInTaskArray = [];
let subtasksInTaskArray = [];
let confirmedSubtasksArray = [];
let datePickerExecuted;
let currentId;
let taskArray;
let categoriesInTaskArray;//

async function initAddTask() {
    navPanelsTemplate();
    navPanelPopupTemplate();
    addTaskTemplate();
    enableCalender();
    // await loadContacts();
    await loadLoggedInUser();
    await initContactsInAddTask();
    await createIndividuallyCategories();//
    await loadIndividuallyCategories();//
    // await loadCategories();
    checkGuestCategory();
    updateCategoryList();
    checkCategoryEmptyStatus();
    await createIndividuallyTaskArray();
    await loadIndividuallyTasks();
    // await loadTask();
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

async function deleteAllTasks() {
    taskArray = [];
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
    // await setItem('taskArray', JSON.stringify(taskArray));
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
    // await setItem('taskArray', JSON.stringify(taskArray));
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
    updateTasks();
    slideOutTwoObjects('boardAreaId', 'backgroundBoardPopupId');
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
    contactsInTaskArray = [];
    await setItem(`individuallyTasks_${userId}`, JSON.stringify(taskArray));
    // await setItem('taskArray', JSON.stringify(taskArray));
    clearTask();

    if (window.location.href.endsWith("board.html")) {
        updateTasks();
        slideOutTwoObjects('addTaskTemplateId', 'backgroundAddTaskPopupId');
    }
}

// function createTaskContent() {
//     let confirmedSubtasksArray = Array(subtasksInTaskArray.length).fill(false);
//     return {
//         'title': document.getElementById('addTaskTitleId').value,
//         'description': document.getElementById('addTaskDescriptionId').value,
//         'date': document.getElementById('datepickerId').value,
//         'category': document.getElementById('addCategoryId').value,
//         'urgent': urgentStatus,
//         'medium': mediumStatus,
//         'low': lowStatus,
//         'contacts': contactsInTaskArray,
//         'subtasks': subtasksInTaskArray,
//         'progressStatus': 'toDo',
//         'id': currentId,
//         'confirmedSubtasks': confirmedSubtasksArray,
//     };
// }

// contacts
function listContacts() {
    let listContacts = document.getElementById('assignToId');
    contactsArray.sort((a, b) => {
        if (a.email === loggedInUser[0].email) return -1;
        if (b.email === loggedInUser[0].email) return 1;
        return 0;
    });
    listContacts.innerHTML = '';
    for (let i = 0; i < contactsArray.length; i++) {
        let contact = contactsArray[i];
        listContacts.innerHTML += generateListContactsHTML(contact, i);
    }
}

function filterContacts() {
    let searchInput = document.getElementById('searchContactId');
    let searchText = searchInput.value.toLowerCase();
    for (let i = 0; i < contactsArray.length; i++) {
        let contact = contactsArray[i];
        let selectedContact = document.getElementById(`assignedContactId${i}`);
        if (contact.name.toLowerCase().includes(searchText)) {
            selectedContact.style.display = 'flex';
        } else {
            selectedContact.style.display = 'none';
        }
    }
}

function contactsDropdown() {
    document.getElementById('searchContactId').placeholder = "Type to search";
    let dropdownContent = document.getElementById('contactsDropdownContentId');
    let dropdownImg = document.getElementById('contactsDropdownImgId');
    if (dropdownContent.classList.contains('dNone')) {
        dropdownImg.src = './img/arrow_drop_up.svg';
        toggleVisibility('contactsDropdownContentId', true);
    }
}

function toggleContactsDrowdown() {
    document.getElementById('searchContactId').placeholder = "Select contacts to assign";
    let dropdownContent = document.getElementById('contactsDropdownContentId');
    let dropdownImg = document.getElementById('contactsDropdownImgId');
    if (!dropdownContent.classList.contains('dNone')) {
        dropdownImg.src = 'img/drowndown.png';
        toggleVisibility('contactsDropdownContentId', false);
        assignedContacts();
    } else {
        contactsDropdown();
    }
}

function toggleCheckContact(id, i) {
    contact = contactsArray[i];
    let img = document.getElementById(id);
    if (img.style.backgroundImage.includes("uncheck.png")) {
        markAssignedContact(i, img);
        contactsInTaskArray.push(contact);
    } else {
        unmarkAssignedContact(contact, img, i);
    }
}

function assignedContacts() {
    let assignedContacts = document.getElementById('assignedContactsId');
    contactsInTaskArray.sort((a, b) => a.name.localeCompare(b.name));
    assignedContacts.innerHTML = '';
    for (let i = 0; i < contactsInTaskArray.length; i++) {
        let contactBelowAssignedTo = contactsInTaskArray[i];
        assignedContacts.innerHTML += generateContactsBelowAssignedTo(contactBelowAssignedTo);
    }
}

function markAssignedContact(i, img) {
    let allAssignedContactContainers = document.getElementById(`assignedContactId${i}`);
    allAssignedContactContainers.style.backgroundColor = "#2A3647";
    allAssignedContactContainers.style.color = "white";
    allAssignedContactContainers.classList.add('darkHoverListContacts');
    img.style.backgroundImage = "url('./img/checkWhite.png')";
}

function unmarkAssignedContact(contact, img, i) {
    let allAssignedContactContainers = document.getElementById(`assignedContactId${i}`);
    img.style.backgroundImage = "url('../img/uncheck.png')";
    allAssignedContactContainers.style.backgroundColor = "white";
    allAssignedContactContainers.style.color = "black";
    allAssignedContactContainers.classList.remove('darkHoverListContacts');
    contactsInTaskArray = contactsInTaskArray.filter((c) => c !== contact);
}

// category
function categoryDropdown() {
    disableCategoryInput();
    let dropdownImg = document.getElementById('categoryDropdownImgId');
    dropdownImg.src = './img/arrow_drop_up.svg';
    toggleVisibility('categoryDropdownContentId', true);
    changeDropdownFunction();
}

function categoryDropup() {
    let dropupImg = document.getElementById('categoryDropdownImgId');
    toggleVisibility('categoryDropdownContentId', false);
    dropupImg.src = 'img/drowndown.png';
    originalDropdownFunction();
}

function changeDropdownFunction() {
    let dropdownBtn = document.getElementById('categoryDropdownImgId');
    dropdownBtn.onclick = function () {
        categoryDropup();
    };
}

function originalDropdownFunction() {
    let addCategoryBtn = document.getElementById('categoryDropdownImgId');
    addCategoryBtn.onclick = function () {
        categoryDropdown();
    };
}

async function listCategories() {
    let categoryInput = document.getElementById('addCategoryId');
    let categoryList = document.getElementById('categoryListId');
    categoriesInTaskArray.push(categoryInput.value);
    categoriesInTaskArray.sort();
    checkCategoryEmptyStatus();
    categoryList.innerHTML = '';
    for (let i = 0; i < categoriesInTaskArray.length; i++) {
        let category = categoriesInTaskArray[i];
        categoryList.innerHTML += generateCategoryListHTML(category, i);
    }
    await setItem(`individuallyCategories_${userId}`, JSON.stringify(categoriesInTaskArray));
    // await setItem('categoriesInTaskArray', JSON.stringify(categoriesInTaskArray));
}

function checkCategoryEmptyStatus() {
    let addCategoryImg = document.getElementById('addCategoryBtnId');
    if (categoriesInTaskArray.length == 0) {
        addCategoryImg.style.setProperty('right', '0', 'important');
        toggleVisibility('categoryDropdownImgId', false);
        toggleVisibility('categoryGreylineId', false);
        categoryDropup();
    } else if (categoriesInTaskArray.length != 0) {
        addCategoryImg.style.setProperty('right', '50px', 'important');
        toggleVisibility('categoryDropdownImgId', true);
        toggleVisibility('categoryGreylineId', true);
    }
}

function addCategory(i) {
    let category = categoriesInTaskArray[i];
    let categoryInput = document.getElementById('addCategoryId');
    categoryInput.value = category;
    categoryDropup();
}

async function editCategory(i) {
    doNotClose(event);
    enableCategoryInput(i);
    let categoryInput = document.getElementById(`inputFieldCategory${i}`);
    let pencilImage = document.getElementById(`editCategoryImgID${i}`);
    changeEditCategoryFunction(pencilImage, i);
    pencilImage.style.backgroundImage = 'url("img/confirm.png")';
    categoryInput.removeAttribute('readonly');
    categoryInput.classList.add('editCategoryInput');
    categoryInput.focus();
    categoryInput.selectionStart = categoryInput.value.length;
    categoryInput.selectionEnd = categoryInput.value.length;
    await setItem(`individuallyCategories_${userId}`, JSON.stringify(categoriesInTaskArray));
    // await setItem('categoriesInTaskArray', JSON.stringify(categoriesInTaskArray));
}

async function confirmCategoryRenaming(pencilImage, i) {
    doNotClose(event);
    pencilImage.style.backgroundImage = 'url("../img/pencilDark.png")';
    originalEditCategoryFunction(pencilImage, i);
    let rename = document.getElementById(`inputFieldCategory${i}`);
    categoriesInTaskArray.splice(i, 1);
    categoriesInTaskArray.push(rename.value);
    categoriesInTaskArray.sort();
    updateCategoryList();
    disableCategoryInput();
    await setItem(`individuallyCategories_${userId}`, JSON.stringify(categoriesInTaskArray));
    // await setItem('categoriesInTaskArray', JSON.stringify(categoriesInTaskArray));
}

function originalEditCategoryFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        editCategory(i);
    };
}

function changeEditCategoryFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        confirmCategoryRenaming(pencilImage, i);
    };
}

function enableCategoryInput(i) {
    document.getElementById(`inputFieldCategory${i}`).style.pointerEvents = 'auto';
}

function disableCategoryInput() {
    document.querySelectorAll('.categoryContent').forEach(function (element) {
        element.style.pointerEvents = 'none';
    });
}

async function deleteCategory(i) {
    doNotClose(event);
    categoriesInTaskArray.splice(i, 1);
    checkCategoryEmptyStatus();
    updateCategoryList();
    disableCategoryInput();
    await setItem(`individuallyCategories_${userId}`, JSON.stringify(categoriesInTaskArray));
    // await setItem('categoriesInTaskArray', JSON.stringify(categoriesInTaskArray));
}

function updateCategoryList() {
    let categoryList = document.getElementById('categoryListId');
    categoryList.innerHTML = '';
    for (let i = 0; i < categoriesInTaskArray.length; i++) {
        let category = categoriesInTaskArray[i];
        categoryList.innerHTML += generateCategoryListHTML(category, i);
    }
}

// subtasks
function addSubtask() {
    let subtaskInput = document.getElementById('subtaskInputId');
    let subtaskList = document.getElementById('subtaskListId');
    subtasksInTaskArray.push(subtaskInput.value);
    subtaskList.innerHTML = '';
    subtaskInput.value = '';
    for (let i = 0; i < subtasksInTaskArray.length; i++) {
        const subtask = subtasksInTaskArray[i];
        subtaskList.innerHTML += generateSubtaskListHTML(subtask, i);
    }
    disableSubtaskInput();
}

function clearSubtaskInput() {
    let subtaskInput = document.getElementById('subtaskInputId');
    subtaskInput.value = '';
}

function enableSubtaskInput(i) {
    document.getElementById(`subtaskEditInputId${i}`).style.pointerEvents = 'auto';
}

function disableSubtaskInput() {
    document.querySelectorAll('.subtaskContent').forEach(function (element) {
        element.style.pointerEvents = 'none';
    });
}

function editSubtask(i) {
    enableSubtaskInput(i);
    let subtaskInput = document.getElementById(`subtaskEditInputId${i}`);
    let subtaskListElement = document.getElementById(`subtaskListElement${i}`);
    let pencilImage = document.getElementById(`pencilEditSubtaskImgId${i}`);
    document.getElementById(`subtaskEditInputId${i}`).classList.add('text');
    changeEditSubtaskFunction(pencilImage, i);
    subtaskInput.removeAttribute('readonly');
    subtaskListElement.style.backgroundColor = 'white';
    subtaskListElement.style.borderBottom = '1px solid #29ABE2'
    subtaskListElement.classList.remove('listSubtaskHover');
    subtaskInput.focus();
    subtaskInput.selectionStart = subtaskInput.value.length;
    pencilImage.style.backgroundImage = 'url("../img/confirm.png")';
}

function confirmSubtaskRenaming(pencilImage, i) {
    let subtaskListElement = document.getElementById(`subtaskListElement${i}`);
    let rename = document.getElementById(`subtaskEditInputId${i}`);
    document.getElementById(`subtaskEditInputId${i}`).classList.remove('text');
    pencilImage.style.backgroundImage = 'url("../img/pencilDark.png")';
    subtasksInTaskArray[i] = rename.value;
    subtaskListElement.style.backgroundColor = 'transparent';
    subtaskListElement.style.borderBottom = 'none'
    subtaskListElement.classList.add('listSubtaskHover');
    originalEditSubtaskFunction(pencilImage, i);
}

function deleteSubtask(i) {
    if (Array.isArray(updatedConfirmedSubtasksArray)) {
        updatedConfirmedSubtasksArray.splice(i, 1);
    }
    subtasksInTaskArray.splice(i, 1);
    updateSubtaskList();
}

function updateSubtaskList() {
    let subtaskList = document.getElementById('subtaskListId');
    subtaskList.innerHTML = '';
    for (let i = 0; i < subtasksInTaskArray.length; i++) {
        let subtask = subtasksInTaskArray[i];
        subtaskList.innerHTML += generateSubtaskListHTML(subtask, i);
    }
}

function originalEditSubtaskFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        editSubtask(i);
    };
}

function changeEditSubtaskFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        confirmSubtaskRenaming(pencilImage, i);
    };
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
        img.style.backgroundImage = "url('../img/uncheck.png')";
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