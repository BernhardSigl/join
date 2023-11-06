function toggleVisibility(id, show) {
    const showHide = document.getElementById(id);
    showHide.classList.toggle('dNone', !show);
}

function toggleRequiredAttribute(elementId, required) {
    const element = document.getElementById(elementId);
    element.required = required;
}

function toggleCheckboxDisabled(elementId, disabled) {
    const checkbox = document.getElementById(elementId);
    checkbox.disabled = disabled;
}

function validateNameInput(input) {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(input.value);

    if (!isValid) {
        input.setCustomValidity('Only letters are allowed.');
    } else {
        input.setCustomValidity('');
    }
}

function validateEmailInput(input) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid = regex.test(input.value);

    if (!isValid) {
        input.setCustomValidity('Please enter a valid email address.');
    } else {
        input.setCustomValidity('');
    }
}

function validatePasswordInput(input) {
    const regex = /^(?=.*[A-Za-z])(?=.*[@#$%^&+=]).{6,}$/;
    const isValid = regex.test(input.value);

    if (!isValid) {
        input.setCustomValidity('Password must contain at least 6 characters including letters and may include at least one special character.');
    } else {
        input.setCustomValidity('');
    }
}

function markCategory(linkId) {
    let categoryLinks = document.getElementsByClassName('categoryLink');
    let selectedLink = document.getElementById(linkId);
    let privacyPolicyLink = document.getElementById('privacyPoliciyLinkId');
    let legalNoticeLink = document.getElementById('legalNoticeLinkId');
    deleteMark(categoryLinks, privacyPolicyLink, legalNoticeLink);
    markBackground(selectedLink);
}

function deleteMark(categoryLinks, privacyPolicyLink, legalNoticeLink) {
    for (i = 0; i < categoryLinks.length; i++) {
        categoryLinks[i].style.backgroundColor = 'transparent';
        categoryLinks[i].style.pointerEvents = 'auto';
    }
    privacyPolicyLink.style.backgroundColor = 'transparent';
    privacyPolicyLink.style.pointerEvents = 'auto';
    legalNoticeLink.style.backgroundColor = 'transparent';
    legalNoticeLink.style.pointerEvents = 'auto';
}

function markBackground(selectedLink) {
    if (selectedLink) {
        selectedLink.style.backgroundColor = '#091931';
        selectedLink.style.pointerEvents = 'none';
    }
}

// function markQuicklinks(linkId) {
//     let links = document.getElementsByClassName('categoryLink');
//     let selectedQuicklink = document.getElementById(linkId);
//     for (i = 0; i < links.length; i++) {
//         links[i].style.backgroundColor = 'transparent';
//         links[i].style.pointerEvents = 'auto';
//     }
//     if (selectedQuicklink) {
//         selectedQuicklink.style.backgroundColor = '#091931';
//         selectedQuicklink.style.pointerEvents = 'none';
//     }
// }

function slideOneObject(frontId) {
    toggleVisibility(frontId, true);
    slideInAnimation = document.getElementById(frontId);
    slideInAnimation.classList.remove('slide-out', 'slide-in');
    slideInAnimation.classList.add('slide-in');
}

function slideOutOneObject(frontId) {
    slideInAnimation = document.getElementById(frontId);
    slideInAnimation.classList.remove('slide-out');
    slideInAnimation.classList.add('slide-out');
}

function slideTwoObjects(frontId, backgroundId) {
    document.body.classList.add('disable-scroll');
    slideInAnimation = document.getElementById(frontId);
    toggleVisibility(frontId, true);
    toggleVisibility(backgroundId, true);
    slideInAnimation.classList.add('slide-in');
    setTimeout(function () {
        slideInAnimation.classList.remove('slide-in');
        document.body.classList.remove('disable-scroll');
    }, 500);
}

function slideOutTwoObjects(frontId, backgroundId) {
    document.body.classList.add('disable-scroll');
    slideInAnimation = document.getElementById(frontId);
    slideInAnimation.classList.add('slide-out');
    setTimeout(function () {
        toggleVisibility(backgroundId, false);
        toggleVisibility(frontId, false);
        slideInAnimation.classList.remove('slide-out');
        document.body.classList.remove('disable-scroll');
    }, 200);
}

function doNotClose(event) {
    event.stopPropagation();
}