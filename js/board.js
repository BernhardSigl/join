let todoArray = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'open',
}, {
    'id': 1,
    'title': 'Kochen',
    'category': 'open',
}, {
    'id': 2,
    'title': 'Einkaufen',
    'category': 'closed',
}];
let progressArray = [];
let feedbackArray = [];
let doneArray = [];

function initBoard() {

    let open = todoArray.filter(t => t['category'] == 'open');

    document.getElementById('open').innerHTML = '';

    for (let index = 0; index < open.length; index++) {
        const element = open[index];
        document.getElementById('open').innerHTML += generateTodoHTML(element);
    }

    let closed = todoArray.filter(t => t['category'] == 'closed');

    document.getElementById('closed').innerHTML = '';

    for (let index = 0; index < closed.length; index++) {
        const element = closed[index];
        document.getElementById('closed').innerHTML += generateTodoHTML(element);
    }

}

function generateTodoHTML(element) {
    return `<div class="task">${element['title']}</div>`;
}