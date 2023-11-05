function initJoinProject() {
    loadSummary();
}

function loadSummary() {
    loadPage('summary.html', function () {
        updateTitle('summary.html');
        markCategory('summaryLinkId');

    });
}

function loadAddTask() {
    loadPage('addTask.html', function () {
        updateTitle('addTask.html');
        markCategory('addTaskLinkId');

    });
}

function loadBoard() {
    loadPage('board.html', function () {
        updateTitle('board.html');
        markCategory('boardLinkId');
        initBoard();
    });
}

function loadContacts() {
    loadPage('contacts.html', function () {
        updateTitle('contacts.html');
        markCategory('contactsLinkId');

    });
}

function loadPage(page, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("mainContent").innerHTML = this.responseText;
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    };
    xhttp.open("GET", page, true);
    xhttp.send();
}

function updateTitle(page) {
    var title = "Kanban Project Management Tool";
    if (page === "summary.html") {
        title = "Summary";
    } else if (page === "addTask.html") {
        title = "Add Task";
    } else if (page === "board.html") {
        title = "Board";
    } else if (page === "contacts.html") {
        title = "Contacts";
    }
    document.title = title;
}