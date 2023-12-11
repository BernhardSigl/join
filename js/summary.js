/**
 * Counter for tasks in 'To do' progress status.
 * @type {number}
 */
let toDoCounter = 0;
/**
 * Counter for tasks in 'In progress' progress status.
 * @type {number}
 */
let inProgressCounter = 0;
/**
 * Counter for tasks in 'Awaiting feedback' progress status.
 * @type {number}
 */
let awaitingFeedbackCounter = 0;
/**
 * Counter for tasks in 'Done' progress status.
 * @type {number}
 */
let doneCounter = 0;
/**
 * Counter for tasks with 'Urgent' priority.
 * @type {number}
 */
let urgentCounter = 0;
/**
 * Counter for tasks with 'Medium' priority.
 * @type {number}
 */
let mediumCounter = 0;
/**
 * Counter for tasks with 'Low' priority.
 * @type {number}
 */
let lowCounter = 0;
/**
 * Object representing the most urgent task.
 * @type {Object}
 */
let mostUrgentTask;
/**
 * An array used for sorting tasks based on priority and it is a copy of the original task array.
 * @type {Array}
 */
let sortedArray = [];

/**
 * Initializes the summary page by executing various setup tasks.
 */
async function initSummary() {
    toggleVisibility('navPanelsTemplateId', false);
    navPanelsTemplate();
    navPanelPopupTemplate();
    await loadGlobalData();
    guestDeleteArrays();
    guestCreateTaskArray();
    updateGreeting();
    updateName();
    sortTaskArray();
    taskArrayCounter();
    updateCounter();
    toggleVisibility('hiddenSummaryId', true);
    welcomeMessageMobile();
    toggleVisibility('navPanelsTemplateId', true);
    toggleVisibility('loaderContainerId', false);
}

/**
 * Loads global data required for the summary page.
 */
async function loadGlobalData() {
    await loadLoggedInUser();
    await loadUsers();
    await createIndividuallyTaskArray();
    await loadIndividuallyTasks();
}

/**
 * Sorting tasks and it is a copy of the original task array.
 */
function sortTaskArray() {
    sortedArray = [...taskArray].sort(sortBoard);
}

/**
 * Counts the number of tasks in each progress status and priority level.
 */
function taskArrayCounter() {
    taskArray.forEach(task => {
        let progressStatus = task.progressStatus;
        if (progressStatus === 'toDo') {
            toDoCounter += 1;
        } else if (progressStatus === 'inProgress') {
            inProgressCounter += 1;
        } else if (progressStatus === 'awaitFeedback') {
            awaitingFeedbackCounter += 1;
        } else if (progressStatus === 'done') {
            doneCounter += 1;
        }
        displayProgressStatus(task);
    });
}

/**
 * Displays progress status for a given task.
 * @param {Object} task - The task object.
 */
function displayProgressStatus(task) {
    let urgentStatus = task.urgent;
    let mediumStatus = task.medium;
    let lowStatus = task.low;
    if (urgentStatus) {
        urgentCounter += 1;
    }
    if (mediumStatus) {
        mediumCounter += 1;
    }
    if (lowStatus) {
        lowCounter += 1;
    }
}

/**
 * Updates counters and displays information based on the sorted task array.
 */
function updateCounter() {
    if (taskArray.length > 0) {
        pullProgressStatusValues();
        if (sortedArray[0].urgent) {
            updateUrgent();
        } else if (sortedArray[0].medium) {
            updateMedium();
        } else if (sortedArray[0].low) {
            updateLow();
        }
    }
}

/**
 * Updates HTML elements with values representing various task progress statuses.
 */
function pullProgressStatusValues() {
    document.getElementById('toDoNumberId').innerHTML = toDoCounter;
    document.getElementById('doneNumberId').innerHTML = doneCounter;
    document.getElementById('dateFrontPageId').innerHTML = formatDate(sortedArray[0].date);
    document.getElementById('allTaskNumberId').innerHTML = taskArray.length;
    document.getElementById('progressTaskNumberId').innerHTML = inProgressCounter;
    document.getElementById('awaitingFeedbackNumberId').innerHTML = awaitingFeedbackCounter;
}

/**
 * Updates the displayed counter and information for 'Urgent' priority.
 */
function updateUrgent() {
    document.getElementById('prioNumberId').innerHTML = urgentCounter;
    document.getElementById('prioFrontPageImgId').src = "img/urgent.png";
    document.getElementById('prioFrontPageTextId').textContent = "Urgent";
}

/**
 * Updates the displayed counter and information for 'Medium' priority.
 */
function updateMedium() {
    document.getElementById('prioNumberId').innerHTML = mediumCounter;
    document.getElementById('prioFrontPageImgId').src = "img/medium.png";
    document.getElementById('prioFrontPageTextId').textContent = "Medium";
}

/**
 * Updates the displayed counter and information for 'Low' priority.
 */
function updateLow() {
    document.getElementById('prioNumberId').innerHTML = lowCounter;
    document.getElementById('prioFrontPageImgId').src = "img/low.png";
    document.getElementById('prioFrontPageTextId').textContent = "Low";
}

/**
 * Updates the displayed name of the logged-in user.
 */
function updateName() {
    document.getElementById('currentUserId').innerHTML = loggedInUser[0].name;
}

/**
 * Formats a date string into a differant format.
 * @param {string} dateString - The date string in the format 'dd/mm/yyyy'.
 * @returns {string} - Formatted date string.
 */
function formatDate(dateString) {
    const [day, month, year] = dateString.split('/');
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = months[parseInt(month, 10) - 1];
    return `${monthName} ${day}, ${year}`;
}

/**
 * Updates the greeting message based on the current time.
 */
function updateGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let greeting;
    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    document.getElementById('dayTimeId').innerHTML = greeting;
}

/**
 * Displays a welcome message animation on mobile devices.
 */
function welcomeMessageMobile() {
    if (window.innerWidth <= 1400) {
        let isFromIndexPage = document.referrer.endsWith("index.html");
        if (isFromIndexPage) {
            lastPageWasIndexHTML();
        } else {
            lastPageWasNotIndexHTML();
        }
    }
}

/**
 * Displays a welcome message only when the last visited page was the index.html page.
 */
function lastPageWasIndexHTML() {
    toggleVisibility('whiteBackgroundId', true);
    toggleVisibility('welcomeMessageTextId', true);
    setTimeout(() => {
        toggleVisibility('whiteBackgroundId', false);
        toggleVisibility('welcomeMessageTextId', false);
    }, 3000);
}

/**
 * Prevent displays a welcome message when the last visited page was not the index.html page.
 */
function lastPageWasNotIndexHTML() {
    toggleVisibility('whiteBackgroundId', false);
    toggleVisibility('welcomeMessageTextId', false);
}