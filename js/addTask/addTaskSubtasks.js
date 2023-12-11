/**
 * Adds a subtask to the task's subtask list.
 */
function addSubtask() {
    let subtaskInput = document.getElementById('subtaskInputId');
    let subtaskList = document.getElementById('subtaskListId');
    if (subtaskInput.value.trim() === '') {
        invalidSubtaskInput(subtaskInput);
    } else {
        validSubtaskInput(subtaskInput, subtaskList);
    }
}

/**
 * Displays a validation message for an invalid subtask input.
 * @param {HTMLInputElement} subtaskInput - The subtask input element.
 */
function invalidSubtaskInput(subtaskInput) {
    subtaskInput.setCustomValidity('Please enter at least one character.');
    subtaskInput.reportValidity();
}

/**
 * Handles a valid subtask input by updating the subtask list and disabling the input.
 * @param {HTMLInputElement} subtaskInput - The subtask input element.
 * @param {HTMLUListElement} subtaskList - The subtask list element.
 */
function validSubtaskInput(subtaskInput, subtaskList) {
    subtaskInput.setCustomValidity('');
    subtasksInTaskArray.push(subtaskInput.value);
    subtaskList.innerHTML = '';
    subtaskInput.value = '';
    for (let i = 0; i < subtasksInTaskArray.length; i++) {
        const subtask = subtasksInTaskArray[i];
        subtaskList.innerHTML += generateSubtaskListHTML(subtask, i);
    }
    disableSubtaskInput();
}

/**
 * Clears the subtask input field.
 */
function clearSubtaskInput() {
    let subtaskInput = document.getElementById('subtaskInputId');
    subtaskInput.value = '';
}

/**
 * Enables the subtask input for editing.
 * @param {number} i - The index of the subtask in the subtasks array.
 */
function enableSubtaskInput(i) {
    document.getElementById(`subtaskEditInputId${i}`).style.pointerEvents = 'auto';
}

/**
 * Disables the subtask input for editing.
 */
function disableSubtaskInput() {
    document.querySelectorAll('.subtaskContent').forEach(function (element) {
        element.style.pointerEvents = 'none';
    });
}

/**
 * Initiates the editing of a subtask.
 * @param {number} i - The index of the subtask in the subtasks array.
 */
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
    pencilImage.style.backgroundImage = 'url("./img/confirm.png")';
}

/**
 * Confirms the renaming of a subtask and updates the subtasks array.
 * @param {HTMLImageElement} pencilImage - The pencil image element.
 * @param {number} i - The index of the subtask in the subtasks array.
 */
function confirmSubtaskRenaming(pencilImage, i) {
    let subtaskListElement = document.getElementById(`subtaskListElement${i}`);
    let rename = document.getElementById(`subtaskEditInputId${i}`);
    document.getElementById(`subtaskEditInputId${i}`).classList.remove('text');
    pencilImage.style.backgroundImage = 'url("./img/pencilDark.png")';
    subtasksInTaskArray[i] = rename.value;
    subtaskListElement.style.backgroundColor = 'transparent';
    subtaskListElement.style.borderBottom = 'none'
    subtaskListElement.classList.add('listSubtaskHover');
    originalEditSubtaskFunction(pencilImage, i);
}

/**
 * Deletes a subtask from the subtasks array.
 * @param {number} i - The index of the subtask in the subtasks array.
 */
function deleteSubtask(i) {
    if (window.location.pathname.includes('board.html') || window.location.pathname.includes('/board')) {
        if (Array.isArray(updatedConfirmedSubtasksArray)) {
            updatedConfirmedSubtasksArray.splice(i, 1);
        }
    }
    subtasksInTaskArray.splice(i, 1);
    updateSubtaskList();
}

/**
 * Updates the subtask list.
 */
function updateSubtaskList() {
    let subtaskList = document.getElementById('subtaskListId');
    subtaskList.innerHTML = '';
    for (let i = 0; i < subtasksInTaskArray.length; i++) {
        let subtask = subtasksInTaskArray[i];
        subtaskList.innerHTML += generateSubtaskListHTML(subtask, i);
    }
}

/**
 * Assigns the original edit subtask function to the pencil image.
 * @param {HTMLImageElement} pencilImage - The pencil image element.
 * @param {number} i - The index of the subtask in the subtasks array.
 */
function originalEditSubtaskFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        editSubtask(i);
    };
}

/**
 * Changes the edit subtask function to confirm subtask renaming.
 * @param {HTMLImageElement} pencilImage - The pencil image element.
 * @param {number} i - The index of the subtask in the subtasks array.
 */
function changeEditSubtaskFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        confirmSubtaskRenaming(pencilImage, i);
    };
}