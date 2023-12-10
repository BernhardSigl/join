function filterTasks(searchTerm) {
    if (searchTerm.trim() === '') {
        resetSearch();
        return;
    }
    searchToLowerCase(searchTerm);
    hideNonFilteredTasks();
    showFilteredTasks();
}

function searchToLowerCase(searchTerm) {
    filteredTasksArray = taskArray.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.category.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase()));
}

function hideNonFilteredTasks() {
    taskArray.forEach((_, index) => {
        const taskElement = document.getElementById(`taskId${index}`);
        taskElement.style.display = 'none';
    });
    document.getElementById('toDoSearchId').style.display = 'none';
    document.getElementById('inProgressSearchId').style.display = 'none';
    document.getElementById('awaitFeedbackSearchId').style.display = 'none';
    document.getElementById('doneSearchId').style.display = 'none';
}

function showFilteredTasks() {
    filteredTasksArray.forEach(task => {
        const index = taskArray.indexOf(task);
        const taskElement = document.getElementById(`taskId${index}`);
        const category = task.progressStatus
        taskElement.style.display = 'flex';
        document.getElementById(`${category}SearchId`).style.display = 'flex';
    });
}

function resetSearch() {
    document.getElementById('searchFieldTasksId').value = '';
    taskArray.forEach((_, index) => {
        const taskElement = document.getElementById(`taskId${index}`);
        taskElement.style.display = 'flex';
    });
    document.getElementById('toDoSearchId').style.display = 'flex';
    document.getElementById('inProgressSearchId').style.display = 'flex';
    document.getElementById('awaitFeedbackSearchId').style.display = 'flex';
    document.getElementById('doneSearchId').style.display = 'flex';
    filteredTasksArray = [];
}