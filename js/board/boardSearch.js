/**
 * Filters tasks based on the provided search term.
 * If the search term is empty, the function resets the search and displays all tasks.
 * @param {string} searchTerm - The search term to filter tasks.
 */
function filterTasks(searchTerm) {
    if (searchTerm.trim() === '') {
        resetSearch();
        return;
    }
    searchToLowerCase(searchTerm);
    hideNonFilteredTasks();
    showFilteredTasks();
}

/**
 * Converts the search term and filters tasks that match the title, category, or description.
 * @param {string} searchTerm - The search term to filter tasks.
 */
function searchToLowerCase(searchTerm) {
    filteredTasksArray = taskArray.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.category.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase()));
}

/**
 * Hides all tasks in the taskArray and category headers during the search.
 */
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

/**
 * Displays tasks that match the search criteria and shows the corresponding category headers.
 */
function showFilteredTasks() {
    filteredTasksArray.forEach(task => {
        const index = taskArray.indexOf(task);
        const taskElement = document.getElementById(`taskId${index}`);
        const category = task.progressStatus
        taskElement.style.display = 'flex';
        document.getElementById(`${category}SearchId`).style.display = 'flex';
    });
}

/**
 * Resets the search, displaying all tasks and category headers.
 */
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