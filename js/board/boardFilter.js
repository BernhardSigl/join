/**
 * Filters tasks with 'toDo' progress status, sorts them and checks for an empty list.
 */
function toDoFilter() {
    let toDoFilter = taskArray.filter(t => t['progressStatus'] == 'toDo');
    toDoFilter.sort(sortBoard);
    document.getElementById('toDoId').innerHTML = '';
    for (let i = 0; i < toDoFilter.length; i++) {
        const toDoFiltered = toDoFilter[i];
        document.getElementById('toDoId').innerHTML += generateTaskHTML(toDoFiltered);
        checkAmountContactsBoardSmall(toDoFiltered.contacts, toDoFiltered.id);
        checkSubtaskProgress(toDoFiltered);
    }
    noToDo(toDoFilter);
    document.getElementById('toDoId').innerHTML += generateTaskPlaceholderHTML();
}

/**
 * Shows or hides the 'no to-do tasks' message based on the presence of tasks in the 'toDo' filter.
 * @param {Array} toDoFilter - Array of tasks filtered with 'toDo' progress status.
 */
function noToDo(toDoFilter) {
    if (toDoFilter.length == 0) {
        toggleVisibility('noToDoId', true);
    } else {
        toggleVisibility('noToDoId', false);
    }
}

/**
 * Filters tasks with 'inProgress' progress status, sorts them and checks for an empty list.
 */
function inProgressFilter() {
    let inProgressFilter = taskArray.filter(t => t['progressStatus'] == 'inProgress');
    inProgressFilter.sort(sortBoard);
    document.getElementById('inProgressId').innerHTML = '';
    for (let i = 0; i < inProgressFilter.length; i++) {
        const inProgressFiltered = inProgressFilter[i];
        document.getElementById('inProgressId').innerHTML += generateTaskHTML(inProgressFiltered);
        checkAmountContactsBoardSmall(inProgressFiltered.contacts, inProgressFiltered.id);
        checkSubtaskProgress(inProgressFiltered);
    }
    noInProgress(inProgressFilter);
    document.getElementById('inProgressId').innerHTML += generateTaskPlaceholderHTML();
}

/**
 * Shows or hides the 'no in-progress tasks' message based on the presence of tasks in the 'inProgress' filter.
 * @param {Array} inProgressFilter - Array of tasks filtered with 'inProgress' progress status.
 */
function noInProgress(inProgressFilter) {
    if (inProgressFilter.length == 0) {
        toggleVisibility('noInProgressId', true);
    } else {
        toggleVisibility('noInProgressId', false);
    }
}

/**
 * Filters tasks with 'awaitFeedback' progress status, sorts them and checks for an empty list.
 */
function awaitFeedbackFilter() {
    let awaitFeedbackFilter = taskArray.filter(t => t['progressStatus'] == 'awaitFeedback');
    awaitFeedbackFilter.sort(sortBoard);
    document.getElementById('awaitFeedbackId').innerHTML = '';
    for (let i = 0; i < awaitFeedbackFilter.length; i++) {
        const awaitFeedbackFiltered = awaitFeedbackFilter[i];
        document.getElementById('awaitFeedbackId').innerHTML += generateTaskHTML(awaitFeedbackFiltered);
        checkAmountContactsBoardSmall(awaitFeedbackFiltered.contacts, awaitFeedbackFiltered.id);
        checkSubtaskProgress(awaitFeedbackFiltered);
    }
    noAwaitFeedback(awaitFeedbackFilter);
    document.getElementById('awaitFeedbackId').innerHTML += generateTaskPlaceholderHTML();
}

/**
 * Shows or hides the 'no tasks awaiting feedback' message based on the presence of tasks in the 'awaitFeedback' filter.
 * @param {Array} awaitFeedbackFilter - Array of tasks filtered with 'awaitFeedback' progress status.
 */
function noAwaitFeedback(awaitFeedbackFilter) {
    if (awaitFeedbackFilter.length == 0) {
        toggleVisibility('noAwaitFeedbackId', true);
    } else {
        toggleVisibility('noAwaitFeedbackId', false);
    }
}

/**
 * Filters tasks with 'done' progress status, sorts them and checks for an empty list.
 */
function doneFilter() {
    let doneFilter = taskArray.filter(t => t['progressStatus'] == 'done');
    doneFilter.sort(sortBoard);
    document.getElementById('doneId').innerHTML = '';
    for (let i = 0; i < doneFilter.length; i++) {
        const doneFilterFiltered = doneFilter[i];
        document.getElementById('doneId').innerHTML += generateTaskHTML(doneFilterFiltered);
        checkAmountContactsBoardSmall(doneFilterFiltered.contacts, doneFilterFiltered.id);
        checkSubtaskProgress(doneFilterFiltered);
    }
    noDone(doneFilter);
    document.getElementById('doneId').innerHTML += generateTaskPlaceholderHTML();
}

/**
 * Shows or hides the 'no completed tasks' message based on the presence of tasks in the 'done' filter.
 * @param {Array} doneFilter - Array of tasks filtered with 'done' progress status.
 */
function noDone(doneFilter) {
    if (doneFilter.length == 0) {
        toggleVisibility('noDoneId', true);
    } else {
        toggleVisibility('noDoneId', false);
    }
}