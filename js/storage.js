// save globally
const STORAGE_TOKEN = 'D8ANP2GBA82DL0FF868LNODM60GNQ8NZG25KYGZL';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        }
    });
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch {
        console.warn('Token invalid becauce no user has been created yet');
    }
}

async function loadContacts() {
    try {
        contactsArray = JSON.parse(await getItem('contactsArray'));
    } catch {
        console.warn('Token invalid becauce no contact has been created yet');
    }
}

async function loadTask() {
    try {
        taskArray = JSON.parse(await getItem('taskArray'));
    } catch {
        console.warn('Token invalid becauce no tasks has been created yet');
    }
}

async function loadCategories() {
    try {
        categoriesInTaskArray = JSON.parse(await getItem('categoriesInTaskArray'));
    } catch {
        console.warn('Token invalid becauce no categories has been created yet');
    }
}

async function loadSubtasks() {
    try {
        subtasksInTaskArray = JSON.parse(await getItem('subtasksInTaskArray'));
    } catch {
        console.warn('Token invalid becauce no subtasks has been created yet');
    }
}

async function loadCategoryColors() {
    try {
        categoryColorsArray = JSON.parse(await getItem('categoryColorsArray'));
    } catch {
        console.warn('Token invalid becauce no colors has been created yet');
    }
}

async function loadIndividuallyContacts() {
    try {
        contactsArray = JSON.parse(await getItem(`individuallyContacts_${userId}`));
    } catch {
        console.warn('Token invalid becauce no contact has been created yet');
    }
}

async function loadIndividuallyTasks() {
    try {
        taskArray = JSON.parse(await getItem(`individuallyTasks_${userId}`));
    } catch {
        console.warn('Token invalid becauce no task has been created yet');
    }
}

async function loadIndividuallyCategories() {
    try {
        categoriesInTaskArray = JSON.parse(await getItem(`individuallyCategories_${userId}`));
    } catch {
        console.warn('Token invalid becauce no category has been created yet');
    }
}

// save locally
async function saveRememberMe() {
    let rememberMeAsText = JSON.stringify(rememberMe);
    localStorage.setItem('rememberMe', rememberMeAsText);
}

async function loadRememberMe() {
    let rememberMeAsText = localStorage.getItem('rememberMe');
    if (rememberMeAsText) {
        rememberMe = JSON.parse(rememberMeAsText);
    }
}

async function saveLoggedInUser() {
    let loggedInUserAsText = JSON.stringify(loggedInUser);
    localStorage.setItem('loggedInUser', loggedInUserAsText);
}

async function loadLoggedInUser() {
    let loggedInUserAsText = localStorage.getItem('loggedInUser');
    if (loggedInUserAsText) {
        loggedInUser = JSON.parse(loggedInUserAsText);
    }
}

async function saveLastOpenedHTML() {
    let lastOpenedHTMLAsText = JSON.stringify(lastOpenedHTML);
    localStorage.setItem('lastOpenedHTML', lastOpenedHTMLAsText);
}

async function loadLastOpenedHTML() {
    let lastOpenedHTMLAsText = localStorage.getItem('lastOpenedHTML');
    if (lastOpenedHTMLAsText) {
        lastOpenedHTML = JSON.parse(lastOpenedHTMLAsText);
    }
}