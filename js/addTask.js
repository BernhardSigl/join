let taskArray = [];
let datePickerExecuted;

function initAddTask() {
    navPanelsTemplate();
    addTaskTemplate();
    enableCalender();
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
    let addTaskTitle = document.getElementById('addTaskTitleId').value;
    let addTaskDescription = document.getElementById('addTaskDescriptionId').value;
    let addTaskDate = document.getElementById('datepickerId').value;
    let addUrgent = document.getElementById('addUrgentId').innerHTML;
    let addMedium = document.getElementById('addMediumId').innerHTML;
    let addLow = document.getElementById('addLowId').innerHTML;
    let addTask = {
        "title": addTaskTitle,
        "description": addTaskDescription,
        "date": addTaskDate,
        // "urgent": addUrgent,
        // "medium": addMedium,
        // "low": addLow,
    }
    taskArray.push(addTask);
}

