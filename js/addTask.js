let taskArray = [];
let contactsInTaskArray = [];
let categoriesInTaskArray = [];
let datePickerExecuted;

async function initAddTask() {
    navPanelsTemplate();
    addTaskTemplate();
    enableCalender();
    await loadContacts();
    await loadCategories();
    checkCategoryEmptyStatus();
    // await loadTask();
}

function enableCalender() {
    datePickerExecuted = false;
    removePikaday();
    datePicker();
}

async function deleteAllTasks() {
    taskArray = [];
    await setItem('contactsArray', JSON.stringify(taskArray));
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

function createTask() {
    taskArray = [];
    let addTaskTitle = document.getElementById('addTaskTitleId').value;
    let addTaskDescription = document.getElementById('addTaskDescriptionId').value;
    let addTaskDate = document.getElementById('datepickerId').value;
    let addTask = {
        "title": addTaskTitle,
        "description": addTaskDescription,
        "date": addTaskDate,
        "urgent": urgentStatus,
        "medium": mediumStatus,
        "low": lowStatus,
        "contacts": contactsInTaskArray,
    }
    taskArray.push(addTask);
    contactsInTaskArray = [];
}

function listContacts() {
    let listContacts = document.getElementById('assignToId');
    contactsArray.sort((a, b) => a.name.localeCompare(b.name));
    listContacts.innerHTML = '';
    for (let i = 0; i < contactsArray.length; i++) {
        let contact = contactsArray[i];
        listContacts.innerHTML += generateListContactsHTML(contact, i);
    }
}

function generateListContactsHTML(contact, i) {
    return /*html*/ `
    <div class="listContacts dFlex alignCenter spaceBetween pointer" onclick="toggleCheckContact('checkContactImgId${i}', ${i})" id="assignedContactId${i}">
        <div class="dFlex alignCenter gap16">
            <div class="nameShortSmall horizontalAndVertical pointer" style="background-color: ${contact.color};">
                <span class="fontWhite fontSize12 pointer mb2">
                ${contact.nameShort}
                </span>
            </div>
            <span class="fontSize20 pointer">
            ${contact.name}
            </span>
        </div>
        <div class="symbol24 pointer" style="background-image: url('../img/uncheck.png');" id="checkContactImgId${i}">
        </div>
    </div>
    `
}

function filterContacts() {
    let searchInput = document.getElementById('searchContactId');
    let contactList = document.getElementById('assignToId');
    let searchText = searchInput.value.toLowerCase();
    let filteredContacts = contactsArray.filter(contact => contact.name.toLowerCase().includes(searchText));
    contactList.innerHTML = '';
    for (let i = 0; i < filteredContacts.length; i++) {
        let contact = filteredContacts[i];
        contactList.innerHTML += generateListContactsHTML(contact, i);
    }
}

// contacts
function contactsDropdown() {
    document.getElementById('searchContactId').placeholder = "Type to search";
    let dropdownContent = document.getElementById('contactsDropdownContentId');
    let dropdownImg = document.getElementById('contactsDropdownImgId');
    if (dropdownContent.classList.contains('dNone')) {
        dropdownImg.src = '../img/arrow_drop_up.svg';
        toggleVisibility('contactsDropdownContentId', true);
    }
}

function toggleContactsDrowdown() {
    document.getElementById('searchContactId').placeholder = "Select contacts to assign2";
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

function generateContactsBelowAssignedTo(contactBelowAssignedTo) {
    return /*html*/ `
        <div class="nameShortSmall horizontalAndVertical" style="background-color: ${contactBelowAssignedTo.color};">
            <span class="fontWhite fontSize12 mb2">
            ${contactBelowAssignedTo.nameShort}
            </span>
        </div>
    `
}

function markAssignedContact(i, img) {
    let allAssignedContactContainers = document.getElementById(`assignedContactId${i}`);
    allAssignedContactContainers.style.backgroundColor = "#2A3647";
    allAssignedContactContainers.style.color = "white";
    allAssignedContactContainers.classList.add('darkHoverListContacts');
    img.style.backgroundImage = "url('../img/checkWhite.png')";
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
    disableInput();
    let dropdownImg = document.getElementById('categoryDropdownImgId');
    dropdownImg.src = '../img/arrow_drop_up.svg';
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
    await setItem('categoriesInTaskArray', JSON.stringify(categoriesInTaskArray));
}

function generateCategoryListHTML(category, i) {
    return /*html*/ `
    <div class="listCategories dFlex alignCenter spaceBetween pointer" onclick="addCategory(${i})">
        <input class="dFlex alignCenter gap16 fontSize20 categoryContent pointer" value="${category}" id="inputFieldCategory${i}" onclick="doNotClose(event)" readonly>
        <div class="alignCenter gap4">
            <div class="symbol24 pointer editCategory" id="editCategoryImgID${i}" style="background-image: url('../img/pencilDark.png');" onclick="editCategory(${i})">
            </div>
            <div class="smallGreyline"></div>
            <div class="symbol24 pointer deleteCategory" style="background-image: url('../img/garbageDark.png');" onclick="deleteCategory(${i})">
            </div>
        </div>
    </div>
    `
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
    enableInput(i);
    let categoryInput = document.getElementById(`inputFieldCategory${i}`);
    let pencilImage = document.getElementById(`editCategoryImgID${i}`);
    changeEditFunction(pencilImage, i);
    pencilImage.style.backgroundImage = 'url("img/confirm.png")';
    categoryInput.removeAttribute('readonly');
    categoryInput.classList.add('editCategoryInput');
    categoryInput.focus();
    categoryInput.selectionStart = categoryInput.value.length;
    categoryInput.selectionEnd = categoryInput.value.length;
    await setItem('categoriesInTaskArray', JSON.stringify(categoriesInTaskArray));
}

async function confirmCategoryRenaming(pencilImage, i) {
    doNotClose(event);
    disableInput();
    pencilImage.style.backgroundImage = 'url("../img/pencilDark.png")';
    originalEditFunction(pencilImage, i);
    let rename = document.getElementById(`inputFieldCategory${i}`);
    categoriesInTaskArray.splice(i, 1);
    categoriesInTaskArray.push(rename.value);
    updateCategoryList();
    contactsInTaskArray.sort((a, b) => a.name.localeCompare(b.name));
    disableInput();
    await setItem('categoriesInTaskArray', JSON.stringify(categoriesInTaskArray));
}

function originalEditFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        editCategory(i);
    };
}

function changeEditFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        confirmCategoryRenaming(pencilImage, i);
    };
}

function enableInput(i) {
    document.getElementById(`inputFieldCategory${i}`).style.pointerEvents = 'auto';
}

function disableInput() {
    document.querySelectorAll('.categoryContent').forEach(function (element) {
        element.style.pointerEvents = 'none';
    });
}

async function deleteCategory(i) {
    doNotClose(event);
    categoriesInTaskArray.splice(i, 1);
    checkCategoryEmptyStatus();
    updateCategoryList();
    disableInput();
    await setItem('categoriesInTaskArray', JSON.stringify(categoriesInTaskArray));
}

function updateCategoryList() {
    let categoryList = document.getElementById('categoryListId');
    categoryList.innerHTML = '';

    for (let i = 0; i < categoriesInTaskArray.length; i++) {
        let category = categoriesInTaskArray[i];
        categoryList.innerHTML += generateCategoryListHTML(category, i);
    }
}