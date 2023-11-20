let toDoCounter = 0;
let inProgressCounter = 0;
let awaitingFeedbackCounter = 0;
let doneCounter = 0;
let urgentCounter = 0;
let mediumCounter = 0;
let lowCounter = 0;
let mostUrgentTask;
let sortedArray = [];

async function initSummary() {
    updateGreeting();
    navPanelsTemplate();
    await loadTask();
    sortTaskArray();
    taskArrayCounter();
    updateCounter();
}

function sortTaskArray() {
    sortedArray = [...taskArray].sort(sortBoard);
    mostUrgentTask = sortedArray.find(task => task.urgent === true);
    if (mostUrgentTask) {
        // console.log(mostUrgentTask);
    }
}

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
    });
}

function updateCounter() {
    document.getElementById('toDoNumberId').innerHTML = toDoCounter;
    document.getElementById('doneNumberId').innerHTML = doneCounter;
    document.getElementById('dateFrontPageId').innerHTML = formatDate(sortedArray[0].date);
    document.getElementById('allTaskNumberId').innerHTML = taskArray.length;
    document.getElementById('progressTaskNumberId').innerHTML = inProgressCounter;
    document.getElementById('awaitingFeedbackNumberId').innerHTML = awaitingFeedbackCounter;
    if (sortedArray[0].urgent) {
        document.getElementById('prioNumberId').innerHTML = urgentCounter;
        document.getElementById('prioFrontPageImgId').src = "img/urgent.png";
        document.getElementById('prioFrontPageTextId').textContent = "Urgent";
    } else if (sortedArray[0].medium) {
        document.getElementById('prioNumberId').innerHTML = mediumCounter;
        document.getElementById('prioFrontPageImgId').src = "img/medium.png";
        document.getElementById('prioFrontPageTextId').textContent = "Medium";
    } else if (sortedArray[0].low) {
        document.getElementById('prioNumberId').innerHTML = lowCounter;
        document.getElementById('prioFrontPageImgId').src = "img/low.png";
        document.getElementById('prioFrontPageTextId').textContent = "Low";
    }
}

function formatDate(dateString) {
    const [day, month, year] = dateString.split('/');
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = months[parseInt(month, 10) - 1];
    return `${monthName} ${day}, ${year}`;
}

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