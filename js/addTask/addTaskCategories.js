/**
 * Handles the dropdown functionality for task categories.
 */
function categoryDropdown() {
    disableCategoryInput();
    let dropdownImg = document.getElementById('categoryDropdownImgId');
    dropdownImg.src = './img/arrow_drop_up.svg';
    toggleVisibility('categoryDropdownContentId', true);
    changeDropdownFunction();
}

/**
 * Handles the dropup functionality for task categories.
 */
function categoryDropup() {
    let dropupImg = document.getElementById('categoryDropdownImgId');
    toggleVisibility('categoryDropdownContentId', false);
    dropupImg.src = 'img/drowndown.png';
    originalDropdownFunction();
}

/**
 * Changes the click event for the category dropdown button to dropup.
 */
function changeDropdownFunction() {
    let dropdownBtn = document.getElementById('categoryDropdownImgId');
    dropdownBtn.onclick = function () {
        categoryDropup();
    };
}

/**
 * Changes the click event for the category dropdown button to dropdown.
 */
function originalDropdownFunction() {
    let addCategoryBtn = document.getElementById('categoryDropdownImgId');
    addCategoryBtn.onclick = function () {
        categoryDropdown();
    };
}

/**
 * Lists task categories and updates the category list.
 */
async function listCategories() {
    let categoryInput = document.getElementById('addCategoryId');
    let categoryList = document.getElementById('categoryListId');
    if (categoryInput.value.trim() === '') {
        invalidCategoryInput(categoryInput);
    } else {
        await validCategoryInput(categoryInput, categoryList);
    }
}

/**
 * Displays an error message for invalid category input.
 * @param {HTMLInputElement} categoryInput - The category input element.
 */
function invalidCategoryInput(categoryInput) {
    categoryInput.setCustomValidity('Please enter at least one character.');
    categoryInput.reportValidity();
}

/**
 * Processes valid category input and updates the category list.
 * @param {HTMLInputElement} categoryInput - The category input element.
 * @param {HTMLElement} categoryList - The category list element.
 */
async function validCategoryInput(categoryInput, categoryList) {
    categoryInput.setCustomValidity('');
    categoriesInTaskArray.push(categoryInput.value);
    categoriesInTaskArray.sort();
    checkCategoryEmptyStatus();
    categoryList.innerHTML = '';
    for (let i = 0; i < categoriesInTaskArray.length; i++) {
        let category = categoriesInTaskArray[i];
        categoryList.innerHTML += generateCategoryListHTML(category, i);
    }
    await setItem(`individuallyCategories_${userId}`, JSON.stringify(categoriesInTaskArray));
}

/**
 * Checks the empty status of the category list and adjusts visibility.
 */
function checkCategoryEmptyStatus() {
    let addCategoryImg = document.getElementById('addCategoryBtnId');
    if (categoriesInTaskArray.length == 0) {
        withoutCategoriesStorage(addCategoryImg);
    } else if (categoriesInTaskArray.length != 0) {
        withCategoriesStorage(addCategoryImg);
    }
}

/**
 * Adjusts styling and visibility when there are no categories stored.
 * @param {HTMLElement} addCategoryImg - The "add category" button image.
 */
function withoutCategoriesStorage(addCategoryImg) {
    addCategoryImg.style.setProperty('right', '0', 'important');
    toggleVisibility('categoryDropdownImgId', false);
    toggleVisibility('categoryGreylineId', false);
    categoryDropup();
}

/**
 * Adjusts styling and visibility when there are categories stored.
 * @param {HTMLElement} addCategoryImg - The "add category" button image.
 */
function withCategoriesStorage(addCategoryImg) {
    addCategoryImg.style.setProperty('right', '50px', 'important');
    toggleVisibility('categoryDropdownImgId', true);
    toggleVisibility('categoryGreylineId', true);
}

/**
 * Sets the selected category in the input field when a category is clicked.
 * @param {number} i - The index of the selected category.
 */
function addCategory(i) {
    let category = categoriesInTaskArray[i];
    let categoryInput = document.getElementById('addCategoryId');
    categoryInput.value = category;
    categoryDropup();
}

/**
 * Edits a task category, allowing renaming.
 * @param {number} i - The index of the category to edit.
 */
async function editCategory(i) {
    let categoryInput = document.getElementById(`inputFieldCategory${i}`);
    let pencilImage = document.getElementById(`editCategoryImgID${i}`);
    doNotClose(event);
    enableCategoryInput(i);
    changeEditCategoryFunction(pencilImage, i);
    pencilImage.style.backgroundImage = 'url("img/confirm.png")';
    categoryInput.removeAttribute('readonly');
    categoryInput.classList.add('editCategoryInput');
    categoryInput.focus();
    categoryInput.selectionStart = categoryInput.value.length;
    categoryInput.selectionEnd = categoryInput.value.length;
    await setItem(`individuallyCategories_${userId}`, JSON.stringify(categoriesInTaskArray));
}

/**
 * Confirms the renaming of a task category.
 * @param {HTMLElement} pencilImage - The pencil icon image element.
 * @param {number} i - The index of the category to confirm renaming.
 */
async function confirmCategoryRenaming(pencilImage, i) {
    doNotClose(event);
    pencilImage.style.backgroundImage = 'url("../img/pencilDark.png")';
    originalEditCategoryFunction(pencilImage, i);
    let rename = document.getElementById(`inputFieldCategory${i}`);
    categoriesInTaskArray.splice(i, 1);
    categoriesInTaskArray.push(rename.value);
    categoriesInTaskArray.sort();
    updateCategoryList();
    disableCategoryInput();
    await setItem(`individuallyCategories_${userId}`, JSON.stringify(categoriesInTaskArray));
}

/**
 * Reverts the category editing functionality to the original state.
 * @param {HTMLElement} pencilImage - The pencil icon image element.
 * @param {number} i - The index of the category being edited.
 */
function originalEditCategoryFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        editCategory(i);
    };
}

/**
 * Changes the edit category functionality to confirm renaming.
 * @param {HTMLElement} pencilImage - The pencil icon image element.
 * @param {number} i - The index of the category being edited.
 */
function changeEditCategoryFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        confirmCategoryRenaming(pencilImage, i);
    };
}

/**
 * Enables input for editing a category.
 * @param {number} i - The index of the category input to enable.
 */
function enableCategoryInput(i) {
    document.getElementById(`inputFieldCategory${i}`).style.pointerEvents = 'auto';
}

/**
 * Disables input for editing a category.
 */
function disableCategoryInput() {
    document.querySelectorAll('.categoryContent').forEach(function (element) {
        element.style.pointerEvents = 'none';
    });
}

/**
 * Deletes a task category.
 * @param {number} i - The index of the category to delete.
 */
async function deleteCategory(i) {
    doNotClose(event);
    categoriesInTaskArray.splice(i, 1);
    checkCategoryEmptyStatus();
    updateCategoryList();
    disableCategoryInput();
    await setItem(`individuallyCategories_${userId}`, JSON.stringify(categoriesInTaskArray));
}

/**
 * Updates the displayed task category list.
 */
function updateCategoryList() {
    let categoryList = document.getElementById('categoryListId');
    categoryList.innerHTML = '';
    for (let i = 0; i < categoriesInTaskArray.length; i++) {
        let category = categoriesInTaskArray[i];
        categoryList.innerHTML += generateCategoryListHTML(category, i);
    }
}