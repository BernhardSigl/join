// subtasks
function addSubtask() {
    let subtaskInput = document.getElementById('subtaskInputId');
    let subtaskList = document.getElementById('subtaskListId');
    if (subtaskInput.value.trim() === '') {
        invalidSubtaskInput(subtaskInput);
    } else {
        validSubtaskInput(subtaskInput, subtaskList);
    }
}

function invalidSubtaskInput(subtaskInput) {
    subtaskInput.setCustomValidity('Please enter at least one character.');
    subtaskInput.reportValidity();
}

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

function clearSubtaskInput() {
    let subtaskInput = document.getElementById('subtaskInputId');
    subtaskInput.value = '';
}

function enableSubtaskInput(i) {
    document.getElementById(`subtaskEditInputId${i}`).style.pointerEvents = 'auto';
}

function disableSubtaskInput() {
    document.querySelectorAll('.subtaskContent').forEach(function (element) {
        element.style.pointerEvents = 'none';
    });
}

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
    pencilImage.style.backgroundImage = 'url("../img/confirm.png")';
}

function confirmSubtaskRenaming(pencilImage, i) {
    let subtaskListElement = document.getElementById(`subtaskListElement${i}`);
    let rename = document.getElementById(`subtaskEditInputId${i}`);
    document.getElementById(`subtaskEditInputId${i}`).classList.remove('text');
    pencilImage.style.backgroundImage = 'url("../img/pencilDark.png")';
    subtasksInTaskArray[i] = rename.value;
    subtaskListElement.style.backgroundColor = 'transparent';
    subtaskListElement.style.borderBottom = 'none'
    subtaskListElement.classList.add('listSubtaskHover');
    originalEditSubtaskFunction(pencilImage, i);
}

function deleteSubtask(i) {
    if (Array.isArray(updatedConfirmedSubtasksArray)) {
        updatedConfirmedSubtasksArray.splice(i, 1);
    }
    subtasksInTaskArray.splice(i, 1);
    updateSubtaskList();
}

function updateSubtaskList() {
    let subtaskList = document.getElementById('subtaskListId');
    subtaskList.innerHTML = '';
    for (let i = 0; i < subtasksInTaskArray.length; i++) {
        let subtask = subtasksInTaskArray[i];
        subtaskList.innerHTML += generateSubtaskListHTML(subtask, i);
    }
}

function originalEditSubtaskFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        editSubtask(i);
    };
}

function changeEditSubtaskFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        confirmSubtaskRenaming(pencilImage, i);
    };
}