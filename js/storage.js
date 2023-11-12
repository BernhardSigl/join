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

// save locally
function save() {
    let rememberMeAsText = JSON.stringify(rememberMe);
    localStorage.setItem('rememberMe', rememberMeAsText);
}

function load() {
    let rememberMeAsText = localStorage.getItem('rememberMe');
    if (rememberMeAsText) {
        rememberMe = JSON.parse(rememberMeAsText);
    }
}
