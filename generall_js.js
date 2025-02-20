"use strict";
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
const emailAvatarUploadInput = document.getElementById('uploademailaddress') ||
    undefined;
const emailIconAvatarUploadInput = document.getElementById('iconemailaddress') ||
    undefined;
const emailInstructionAvatarUploadInput = document.getElementById('instrutionsemailaddress') ||
    undefined;
// DOM of Full name.
const fullNameAvatarUploadInput = document.getElementById('uploadfullnamefield') ||
    undefined;
// DOM of github username.
const githubUsernameAvatarUploadInput = document.getElementById('uploadgithubusername') ||
    undefined;
// DOM of generate botom
const generateButtonticket = document.getElementById('generatebutton') || undefined;
// upload avatar area of coding.
// Preview function of upload avatar.
function createAvatarPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        var _a;
        if (avatarUploadDropArea && ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result)) {
            const preview = document.createElement('img');
            preview.src = e.target.result;
            preview.className = 'avatar-preview';
            sessionStorage.setItem('avatarPreview', e.target.result);
            // clean and add preview
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
            sessionStorage.setItem('email', email);
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
        emailAvatarUploadInput.addEventListener('input', (e) => {
            const email = e.target.value;
            handleEmail(email);
        });
    }
});
// function to validate full name
function validateFullName(fullName) {
    const cleanedName = fullName.trim().replace(/\s+/g, ' ');
    const namePattern = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s'-]+$/;
    if (!cleanedName) {
        return { isValid: false, message: 'false' };
    }
    if (!namePattern.test(cleanedName)) {
        return {
            isValid: false,
            message: 'false'
        };
    }
    const nameParts = cleanedName.split(' ');
    if (nameParts.length < 2) {
        return {
            isValid: false,
            message: 'false'
        };
    }
    const formattedName = nameParts
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
    return { isValid: true, message: '', formattedName };
}
// UI management for full name
function handleFullName(fullName) {
    const validationFullName = validateFullName(fullName);
    if (fullNameAvatarUploadInput) {
        if (validationFullName.isValid) {
            fullNameAvatarUploadInput.style.borderColor = '';
            sessionStorage.setItem('fullName', fullName);
        }
        else {
            fullNameAvatarUploadInput.style.borderColor = '#ff0000';
        }
    }
}
// Event Listeners of full name
document.addEventListener('DOMContentLoaded', () => {
    if (fullNameAvatarUploadInput) {
        fullNameAvatarUploadInput.addEventListener('input', e => {
            const fullName = e.target.value;
            handleFullName(fullName);
        });
    }
});
// function to validate github username
function validateGithubUsername(username) {
    const githubUsernamePattern = /^@[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    if (!githubUsernamePattern.test(username)) {
        return {
            isValid: false,
            message: 'Please enter a valid GitHub username.'
        };
    }
    return { isValid: true, message: '' };
}
// UI manegemenent for github username
function handleGithubUsername(username) {
    const validationGithubUsername = validateGithubUsername(username);
    if (githubUsernameAvatarUploadInput) {
        if (validationGithubUsername.isValid) {
            githubUsernameAvatarUploadInput.style.borderColor = '';
            sessionStorage.setItem('githubUsername', username);
        }
        else {
            githubUsernameAvatarUploadInput.style.borderColor = '#ff0000';
        }
    }
}
// Event Listeners of github username
document.addEventListener('DOMContentLoaded', () => {
    if (githubUsernameAvatarUploadInput) {
        githubUsernameAvatarUploadInput.addEventListener('input', e => {
            const username = e.target.value;
            handleGithubUsername(username);
        });
    }
});
// to generate bottom.
// Event Listeners of generate bottom
document.addEventListener('DOMContentLoaded', () => {
    if (generateButtonticket) {
        generateButtonticket.addEventListener('click', e => {
            e.preventDefault();
            const isValid = validateAllFields();
            redirect(isValid);
        });
    }
});
// funtion to be redirected to the second page where the ticket is made.
function redirect(isValid) {
    if (isValid) {
        window.location.href = 'result.html';
        // const datosUsuario: string = JSON.stringify({
        // })
    }
    else {
        if (generateButtonticket) {
            generateButtonticket.style.border = '3px solid red';
        }
    }
}
// funtion to know if all validations have been true.
function validateAllFields() {
    return (savedAvatarFile !== null &&
        validateFile(savedAvatarFile).isValid &&
        validateEmail((emailAvatarUploadInput === null || emailAvatarUploadInput === void 0 ? void 0 : emailAvatarUploadInput.value) || '').isValid &&
        validateFullName((fullNameAvatarUploadInput === null || fullNameAvatarUploadInput === void 0 ? void 0 : fullNameAvatarUploadInput.value) || '').isValid &&
        validateGithubUsername((githubUsernameAvatarUploadInput === null || githubUsernameAvatarUploadInput === void 0 ? void 0 : githubUsernameAvatarUploadInput.value) || '').isValid);
}
// reset the border of the generate button when it´s fine
document.addEventListener('DOMContentLoaded', () => {
    if (generateButtonticket && validateAllFields()) {
        generateButtonticket.style.border = '';
    }
});
// ts to result page.
const dayToday = new Date();
// Date format "DD/MM/YYYY"
const day = dayToday.getDate();
const month = dayToday.getMonth() + 1;
const year = dayToday.getFullYear();
const dayFormat = `${month}/${day}/${year}`;
// location
const locationOfEvent = 'Austin, TX';
// all details joined (date and location).
const eventDetails = `${dayFormat}  /  ${locationOfEvent}`;
// DOM of second page.
// elements to insert into the elements of second page
const storedPreview = sessionStorage.getItem('avatarPreview');
const storedFullName = sessionStorage.getItem('fullName');
const storedEmail = sessionStorage.getItem('email');
const storedGithubUsername = sessionStorage.getItem('githubUsername');
// DOM of each element into the second page.
const nameInH1Header = document.getElementById('h1dDinamicName') || undefined;
const emailInH2Header = document.getElementById('h2dDinamicEmail') || undefined;
const dateAndPlaceDiv = document.getElementById('dateAndPlace') || undefined;
const nameInTicket = document.getElementById('nameOfTicket') || undefined;
const githubNameDiv = document.getElementById('nameOfGithub') || undefined;
const serialOfticketDiv = document.getElementById('serialOfTicket') || undefined;
const previewInTicket = document.getElementById('previsualitationOfownerTicket') || undefined;
// insert the data into the elements of the second page.
if (nameInH1Header && storedFullName) {
    const nameParts = storedFullName.split(' ').slice(0, 2);
    const limitedName = nameParts.join(' ') + '!';
    nameInH1Header.innerHTML = '';
    const letters = limitedName.split('');
    const startingColor = [194, 98, 105];
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        const colorProgression = `rgb(${Math.min(startingColor[0] + index * 7, 255)}, 
                                   ${Math.min(startingColor[1] + index * 7, 255)}, 
                                   ${Math.min(startingColor[2] + index * 7, 255)})`;
        span.style.color = colorProgression;
        span.style.fontWeight = 'bold';
        nameInH1Header.appendChild(span);
    });
}
if (emailInH2Header && storedEmail) {
    emailInH2Header.textContent = storedEmail;
    emailInH2Header.style.color = '#C16269';
}
if (dateAndPlaceDiv && eventDetails) {
    dateAndPlaceDiv.textContent = eventDetails;
}
if (nameInTicket && storedFullName) {
    const nameParts = storedFullName.split(' ');
    nameInTicket.textContent = nameParts.slice(0, 2).join(' ');
}
if (githubNameDiv && storedGithubUsername) {
    githubNameDiv.textContent =
        storedGithubUsername.length > 20
            ? storedGithubUsername.slice(0, 20) + '...'
            : storedGithubUsername;
}
if (storedPreview) {
    previewInTicket.src = storedPreview;
}
if (serialOfticketDiv) {
    const randomSerial = `#${Math.floor(10000 + Math.random() * 90000)}`;
    serialOfticketDiv.textContent = randomSerial;
}
