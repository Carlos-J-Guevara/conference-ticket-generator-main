"use strict";
// upload avatar
// global state for all the document
let savedAvatarFile = null;
// DOM general
// DOM of upload avatar
const uploadAvatarButton = document.getElementById('uploadButton') || undefined;
const avatarUploadDropArea = document.getElementById('dropArea') || undefined;
const userAvatarUploadIcon = document.getElementById('infoiconupload') || undefined;
const avatarUploadInstruction = document.getElementById('intructionsizeofimage') ||
    undefined;
const avatarUploadGuide = document.getElementById('dragAndDropMessage') ||
    undefined;
// DOM of email address
const emailAvatarUploadInput = document.getElementById('uploademailaddress') || null;
const emailIconAvatarUploadInput = document.getElementById('iconemailaddress') || null;
const emailInstructionAvatarUploadInput = document.getElementById('instrutionsemailaddress') ||
    null;
// Preview function of upload avatar.
function createAvatarPreview(file) {
    const reader = new FileReader();
    reader.onload = e => {
        var _a;
        if (avatarUploadDropArea && ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result)) {
            const preview = document.createElement('img');
            preview.src = e.target.result;
            preview.className = 'avatar-preview';
            // Limpiar y añadir preview
            avatarUploadDropArea.innerHTML = '';
            avatarUploadDropArea.appendChild(preview);
        }
    };
    reader.readAsDataURL(file);
}
// tester of anwers in upload avatar
function validateFile(file) {
    const maxSize = 512000; // 500KB
    const validTypes = ['image/jpeg', 'image/png'];
    if (validTypes.includes(file.type)) {
        if (file.size <= maxSize) {
            return {
                isValid: true,
                message: 'Upload your photo (JPG or PNG, max size: 500KB).'
            };
        }
        else {
            return {
                isValid: false,
                message: 'File too large. Please upload a photo under 500KB.'
            };
        }
    }
    else {
        return {
            isValid: false,
            message: 'Please upload your photo (JPG or PNG, max size: 500KB).'
        };
    }
}
// file managements of upload avatar.
function handleFile(file) {
    const validation = validateFile(file);
    if (userAvatarUploadIcon && avatarUploadInstruction) {
        userAvatarUploadIcon.style.fill = '';
        userAvatarUploadIcon.style.filter = '';
        if (validation.isValid) {
            avatarUploadInstruction.style.color = '#b5b4c5';
            avatarUploadInstruction.textContent = validation.message;
            savedAvatarFile = file;
            createAvatarPreview(file);
        }
        else {
            userAvatarUploadIcon.style.filter =
                'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)';
            avatarUploadInstruction.textContent = validation.message;
            avatarUploadInstruction.style.color = '#ff0000';
        }
    }
}
// Event Listeners of upload avatar.
if (uploadAvatarButton &&
    avatarUploadDropArea &&
    userAvatarUploadIcon &&
    avatarUploadInstruction) {
    // Click en botón
    uploadAvatarButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/jpeg, image/png';
        input.click();
        input.onchange = (e) => {
            var _a;
            const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
            if (file)
                handleFile(file);
        };
    });
    // Drag and Drop of upload avatar.
    uploadAvatarButton.addEventListener('dragover', (e) => {
        e.preventDefault();
        avatarUploadDropArea.classList.add('drag-over');
        avatarUploadGuide.style.display = 'none';
    });
    uploadAvatarButton.addEventListener('dragleave', () => {
        avatarUploadDropArea.classList.remove('drag-over');
        avatarUploadGuide.style.display = '';
    });
    uploadAvatarButton.addEventListener('drop', (e) => {
        var _a;
        e.preventDefault();
        avatarUploadDropArea.classList.remove('drag-over');
        avatarUploadGuide.style.display = '';
        const file = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files[0];
        if (file) {
            handleFile(file);
        }
    });
}
const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
// funtion to validate email
function validateEmail(email) {
    if (!email.includes('@')) {
        return { isValid: false, message: 'Please enter a valid email address.' };
    }
    const [localPart, domain] = email.split('@');
    // Validations
    if (!email.trim() ||
        localPart.length === 0 ||
        localPart.length > 64 ||
        localPart.startsWith('.') ||
        localPart.endsWith('.')) {
        return { isValid: false, message: 'Please enter a valid email address.' };
    }
    if (!emailPattern.test(email)) {
        return { isValid: false, message: 'Please enter a valid email address.' };
    }
    if (domain.includes('..') || domain.endsWith('-')) {
        return { isValid: false, message: 'Please enter a valid email address.' };
    }
    return { isValid: true, message: '' };
}
// Management of UI for email
function handleEmail(email) {
    const validationEmail = validateEmail(email);
    if (emailIconAvatarUploadInput &&
        emailInstructionAvatarUploadInput &&
        emailAvatarUploadInput) {
        if (validationEmail.isValid) {
            emailIconAvatarUploadInput.style.display = 'none';
            emailInstructionAvatarUploadInput.textContent = '';
            emailAvatarUploadInput.style.borderColor = '#4c4b81';
        }
        else {
            emailIconAvatarUploadInput.classList.remove('hidden');
            emailIconAvatarUploadInput.style.display = 'block';
            emailIconAvatarUploadInput.style.display = 'block';
            emailIconAvatarUploadInput.style.filter =
                'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)';
            emailInstructionAvatarUploadInput.classList.remove('hidden');
            emailInstructionAvatarUploadInput.textContent = validationEmail.message;
            emailInstructionAvatarUploadInput.style.color = '#ff0000';
        }
    }
}
// Event Listeners of email
document.addEventListener('DOMContentLoaded', () => {
    if (emailAvatarUploadInput) {
        emailAvatarUploadInput.addEventListener('input', e => {
            const email = e.target.value;
            handleEmail(email);
        });
    }
});
