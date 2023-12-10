// category
function categoryDropdown() {
    disableCategoryInput();
    let dropdownImg = document.getElementById('categoryDropdownImgId');
    dropdownImg.src = './img/arrow_drop_up.svg';
    toggleVisibility('categoryDropdownContentId', true);
    changeDropdownFunction();
}

function categoryDropup() {
    let dropupImg = document.getElementById('categoryDropdownImgId');
    toggleVisibility('categoryDropdownContentId', false);
    dropupImg.src = 'img/drowndown.png';
    originalDropdownFunction();
}

function changeDropdownFunction() {
    let dropdownBtn = document.getElementById('categoryDropdownImgId');
    dropdownBtn.onclick = function () {
        categoryDropup();
    };
}

function originalDropdownFunction() {
    let addCategoryBtn = document.getElementById('categoryDropdownImgId');
    addCategoryBtn.onclick = function () {
        categoryDropdown();
    };
}

async function listCategories() {
    let categoryInput = document.getElementById('addCategoryId');
    let categoryList = document.getElementById('categoryListId');
    if (categoryInput.value.trim() === '') {
        invalidCategoryInput(categoryInput);
    } else {
        await validCategoryInput(categoryInput, categoryList);
    }
}

function invalidCategoryInput(categoryInput) {
    categoryInput.setCustomValidity('Please enter at least one character.');
    categoryInput.reportValidity();
}

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

function checkCategoryEmptyStatus() {
    let addCategoryImg = document.getElementById('addCategoryBtnId');
    if (categoriesInTaskArray.length == 0) {
        withoutCategories(addCategoryImg);
    } else if (categoriesInTaskArray.length != 0) {
        withCategoriesStorage(addCategoryImg);
    }
}

function withoutCategoriesStorage(addCategoryImg) {
    addCategoryImg.style.setProperty('right', '0', 'important');
    toggleVisibility('categoryDropdownImgId', false);
    toggleVisibility('categoryGreylineId', false);
    categoryDropup();
}

function withCategoriesStorage(addCategoryImg) {
    addCategoryImg.style.setProperty('right', '50px', 'important');
    toggleVisibility('categoryDropdownImgId', true);
    toggleVisibility('categoryGreylineId', true);
}

function addCategory(i) {
    let category = categoriesInTaskArray[i];
    let categoryInput = document.getElementById('addCategoryId');
    categoryInput.value = category;
    categoryDropup();
}

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

function originalEditCategoryFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        editCategory(i);
    };
}

function changeEditCategoryFunction(pencilImage, i) {
    pencilImage.onclick = function () {
        confirmCategoryRenaming(pencilImage, i);
    };
}

function enableCategoryInput(i) {
    document.getElementById(`inputFieldCategory${i}`).style.pointerEvents = 'auto';
}

function disableCategoryInput() {
    document.querySelectorAll('.categoryContent').forEach(function (element) {
        element.style.pointerEvents = 'none';
    });
}

async function deleteCategory(i) {
    doNotClose(event);
    categoriesInTaskArray.splice(i, 1);
    checkCategoryEmptyStatus();
    updateCategoryList();
    disableCategoryInput();
    await setItem(`individuallyCategories_${userId}`, JSON.stringify(categoriesInTaskArray));
}

function updateCategoryList() {
    let categoryList = document.getElementById('categoryListId');
    categoryList.innerHTML = '';
    for (let i = 0; i < categoriesInTaskArray.length; i++) {
        let category = categoriesInTaskArray[i];
        categoryList.innerHTML += generateCategoryListHTML(category, i);
    }
}