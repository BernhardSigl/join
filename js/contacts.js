function openAddTaskPopup() {
    addContactPopupContent();
    slideTwoObjects('addContactAreaId', 'backgroundAddContactId');
}

function addContactPopupContent() {
    document.getElementById('addContactAreaId').innerHTML = generateAddContactContentHTML();
}

function openEditTaskPopup() {
    editContactPopupContent();
    slideTwoObjects('editContactAreaId', 'backgroundEditContactId');
}

function editContactPopupContent() {
    document.getElementById('editContactAreaId').innerHTML = generateEditContactContentHTML();
}