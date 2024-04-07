/**
 * Constant representing the storage token for remote storage.
 * @type {string}
 */
const STORAGE_TOKEN = 'D8ANP2GBA82DL0FF868LNODM60GNQ8NZG25KYGZL';
/**
 * Constant representing the URL of the remote storage item.
 * @type {string}
 */
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Sets the value of an item in the remote storage.
 * @param {string} key - The key of the item to be set.
 * @param {string} value - The value to be set for the item.
 * @returns {Promise} - A promise that resolves to the result of the storage operation.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

/**
 * Retrieves the value of an item from the remote storage.
 * @param {string} key - The key of the item to be retrieved.
 * @returns {Promise} - A promise that resolves to the value of the item.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        }
    });
}

/**
 * Loads the user data from the remote storage into the 'users' array.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch {
        console.warn('Token invalid becauce no user has been created yet');
    }
}

/**
 * Loads the contacts data from the remote storage into the 'contactsArray' array.
 */
async function loadContacts() {
    try {
        contactsArray = JSON.parse(await getItem('contactsArray'));
    } catch {
        console.warn('Token invalid becauce no contact has been created yet');
    }
}

/**
 * Loads the task data from the remote storage into the 'taskArray' array.
 */
async function loadTask() {
    try {
        taskArray = JSON.parse(await getItem('taskArray'));
    } catch {
        console.warn('Token invalid becauce no tasks has been created yet');
    }
}

/**
 * Loads the categories data from the remote storage into the 'categoriesInTaskArray' array.
 */
async function loadCategories() {
    try {
        categoriesInTaskArray = JSON.parse(await getItem('categoriesInTaskArray'));
    } catch {
        console.warn('Token invalid becauce no categories has been created yet');
    }
}

/**
 * Loads the subtasks data from the remote storage into the 'subtasksInTaskArray' array.
 */
async function loadSubtasks() {
    try {
        subtasksInTaskArray = JSON.parse(await getItem('subtasksInTaskArray'));
    } catch {
        console.warn('Token invalid becauce no subtasks has been created yet');
    }
}

/**
 * Loads the category colors data from the remote storage into the 'categoryColorsArray' array.
 */
async function loadCategoryColors() {
    try {
        categoryColorsArray = JSON.parse(await getItem('categoryColorsArray'));
    } catch {
        console.warn('Token invalid becauce no colors has been created yet');
    }
}

/**
 * Loads individually stored contacts data from the remote storage into the 'contactsArray' array.
 */
async function loadIndividuallyContacts() {
    try {
        contactsArray = JSON.parse(await getItem(`individuallyContacts_${userId}`));
    } catch {
        console.warn('Token invalid becauce no contact has been created yet');
    }
}

/**
 * Loads individually stored task data from the remote storage into the 'taskArray' array.
 */
async function loadIndividuallyTasks() {
    try {
        taskArray = JSON.parse(await getItem(`individuallyTasks_${userId}`));
    } catch {
        console.warn('Token invalid becauce no task has been created yet');
    }
}

/**
 * Loads individually stored categories data from the remote storage into the 'categoriesInTaskArray' array.
 */
async function loadIndividuallyCategories() {
    try {
        categoriesInTaskArray = JSON.parse(await getItem(`individuallyCategories_${userId}`));
    } catch {
        console.warn('Token invalid becauce no category has been created yet');
    }
}

/**
 * Saves the 'rememberMe' array to local storage.
 */
async function saveRememberMe() {
    let rememberMeAsText = JSON.stringify(rememberMe);
    localStorage.setItem('rememberMe', rememberMeAsText);
}

/**
 * Loads the 'rememberMe' array from local storage.
 */
async function loadRememberMe() {
    let rememberMeAsText = localStorage.getItem('rememberMe');
    if (rememberMeAsText) {
        rememberMe = JSON.parse(rememberMeAsText);
    }
}

/**
 * Saves the 'loggedInUser' array to local storage.
 */
async function saveLoggedInUser() {
    let loggedInUserAsText = JSON.stringify(loggedInUser);
    localStorage.setItem('loggedInUser', loggedInUserAsText);
}

/**
 * Loads the 'loggedInUser' array from local storage.
 */
async function loadLoggedInUser() {
    let loggedInUserAsText = localStorage.getItem('loggedInUser');
    if (loggedInUserAsText) {
        loggedInUser = JSON.parse(loggedInUserAsText);
        loggedInUser = [loggedInUser.pop()];
    }
}

/**
 * Saves the 'lastOpenedHTML' variable to local storage.
 */
async function saveLastOpenedHTML() {
    let lastOpenedHTMLAsText = JSON.stringify(lastOpenedHTML);
    localStorage.setItem('lastOpenedHTML', lastOpenedHTMLAsText);
}

/**
 * Loads the 'lastOpenedHTML' variable from local storage.
 */
async function loadLastOpenedHTML() {
    let lastOpenedHTMLAsText = localStorage.getItem('lastOpenedHTML');
    if (lastOpenedHTMLAsText) {
        lastOpenedHTML = JSON.parse(lastOpenedHTMLAsText);
    }
}