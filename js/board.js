let taskArrayTest = [
    {
        'id': 0,
        'category': 'toDo',
        'title': 'Putzen',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'subject': 'Sales'
    }, {
        'id': 1,
        'title': 'Kochen',
        'category': 'toDo',
        'description': 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'subject': 'Media'
    }, {
        'id': 2,
        'title': 'Einkaufen',
        'category': 'inProgress',
        'description': 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        'subject': 'Media'
    }, {
        'id': 3,
        'title': 'Schlafen',
        'category': 'awaitFeedback',
        'description': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'subject': 'Technical Task'
    }, {
        'id': 4,
        'title': 'Aufwachen',
        'category': 'awaitFeedback',
        'description': 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'subject': 'Backoffice'
    }
];

let currentDraggedTask;

async function initBoard() {
    navPanelsTemplate();
    addTaskTemplate();
    updateTasks();
    await loadContacts();
}

function updateTasks() {
    toDoFilter();
    inProgressFilter();
    awaitFeedbackFilter();
    doneFilter();
}

function toDoFilter() {
    let toDoFilter = taskArrayTest.filter(t => t['category'] == 'toDo');
    document.getElementById('toDoId').innerHTML = '';
    for (let i = 0; i < toDoFilter.length; i++) {
        const toDoFiltered = toDoFilter[i];
        document.getElementById('toDoId').innerHTML += generateTaskHTML(toDoFiltered);
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
    let inProgressFilter = taskArrayTest.filter(t => t['category'] == 'inProgress');
    document.getElementById('inProgressId').innerHTML = '';
    for (let i = 0; i < inProgressFilter.length; i++) {
        const inProgressFiltered = inProgressFilter[i];
        document.getElementById('inProgressId').innerHTML += generateTaskHTML(inProgressFiltered);
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
    let awaitFeedbackFilter = taskArrayTest.filter(t => t['category'] == 'awaitFeedback');
    document.getElementById('awaitFeedbackId').innerHTML = '';
    for (let i = 0; i < awaitFeedbackFilter.length; i++) {
        const awaitFeedbackFiltered = awaitFeedbackFilter[i];
        document.getElementById('awaitFeedbackId').innerHTML += generateTaskHTML(awaitFeedbackFiltered);
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
    let doneFilter = taskArrayTest.filter(t => t['category'] == 'done');
    document.getElementById('doneId').innerHTML = '';
    for (let i = 0; i < doneFilter.length; i++) {
        const doneFilterFiltered = doneFilter[i];
        document.getElementById('doneId').innerHTML += generateTaskHTML(doneFilterFiltered);
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

function generateTaskHTML(task) {
    return /*html*/ `
    <div class="task grab column gap24 column" draggable="true" ondragstart="startDragging(${task.id})">
        <span class="fontSize16 subjectKanban fontWhite grab">${task['subject']}</span>
        <div class="gap8 column">
            <span class="fontSize16 titleKanban bold grab">${task['title']}</span>
            <span class="fontSize16 descriptionKanban fontGrey grab">${task['description']}</span>
        </div>
    </div>
    `;
}

function startDragging(id) {
    currentDraggedTask = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    taskArrayTest[currentDraggedTask]['category'] = category;
    removeHighlight();
    updateTasks();
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
}

// function addTaskPopup() {
//     document.getElementById('addTaskTemplateId').innerHTML = generateAddTaskContentHTML();
// }
