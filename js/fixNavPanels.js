function initJoinProject() {
    loadPage('summary.html');
    updateTitle('summary.html');
}

function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("mainContent").innerHTML = this.responseText;
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
    }
    document.title = title;
}