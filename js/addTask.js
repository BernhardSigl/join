let taskArray = [];
let contactsInTaskArray = [];
let datePickerExecuted;

async function initAddTask() {
    navPanelsTemplate();
    addTaskTemplate();
    enableCalender();
    await loadContacts();
    listContacts();
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
            <span class="fontSize20 pointer pointer">
            ${contact.name}
            </span>
        </div>
        <div class="symbol24 pointer" style="background-image: url('../img/uncheck.png');" id="checkContactImgId${i}">
        </div>
    </div>
    `
}

function contactsDropdown() {
    let dropdownContent = document.getElementById('contactsDropdownContentId');
    let dropdownImg = document.getElementById('contactsDropdownImgId');
    if (dropdownContent.classList.contains('dNone')) {
        dropdownImg.src = '../img/arrow_drop_up.svg';
        toggleVisibility('contactsDropdownContentId', true);
    }
}

function toggleContactsDrowdown() {
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
    assignedContacts.innerHTML = '';
    for (let i = 0; i < contactsInTaskArray.length; i++) {
        let contactBelowAssignedTo = contactsInTaskArray[i];
        assignedContacts.innerHTML += generateContactsBelowAssignedTo(contactBelowAssignedTo);
    }
}

function generateContactsBelowAssignedTo(contactBelowAssignedTo) {
    return /*html*/ `
        <div class="nameShortSmall horizontalAndVertical pointer" style="background-color: ${contactBelowAssignedTo.color};">
            <span class="fontWhite fontSize12 pointer mb2">
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
// listContacts