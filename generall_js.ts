// Interfaces
interface FileValidation {
  isValid: boolean;
  message: string;
}

// global state for all the document
let savedAvatarFile: File | null = null;

// DOM general

// DOM of upload avatar
const uploadAvatarButton: HTMLButtonElement | undefined =
  (document.getElementById('uploadButton') as HTMLButtonElement) || undefined;

const avatarUploadDropArea: HTMLDivElement | undefined =
  (document.getElementById('dropArea') as HTMLDivElement) || undefined;

const userAvatarUploadIcon: HTMLImageElement | undefined =
  (document.getElementById('infoiconupload') as HTMLImageElement) || undefined;

const avatarUploadInstruction: HTMLHeadingElement | undefined =
  (document.getElementById('intructionsizeofimage') as HTMLHeadingElement) ||
  undefined;

const avatarUploadGuide: HTMLSpanElement | undefined =
  (document.getElementById('dragAndDropMessage') as HTMLHeadingElement) ||
  undefined;

// DOM of email address
const emailAvatarUploadInput: HTMLInputElement | null =
  (document.getElementById('uploademailaddress') as HTMLInputElement) ||
  undefined;

const emailIconAvatarUploadInput: HTMLImageElement | null =
  (document.getElementById('iconemailaddress') as HTMLImageElement) ||
  undefined;

const emailInstructionAvatarUploadInput: HTMLSpanElement | null =
  (document.getElementById('instrutionsemailaddress') as HTMLSpanElement) ||
  undefined;

// DOM of Full name.
const fullNameAvatarUploadInput: HTMLInputElement | null =
  (document.getElementById('uploadfullnamefield') as HTMLInputElement) ||
  undefined;

// DOM of github username.
const githubUsernameAvatarUploadInput: HTMLInputElement | null =
  (document.getElementById('uploadgithubusername') as HTMLInputElement) ||
  undefined;

// upload avatar area of coding.
// Preview function of upload avatar.
function createAvatarPreview(file: File): void {
  const reader: FileReader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (avatarUploadDropArea && e.target?.result) {
      const preview: HTMLImageElement = document.createElement('img');
      preview.src = e.target.result as string;
      preview.className = 'avatar-preview';

      // Limpiar y añadir preview
      avatarUploadDropArea.innerHTML = '';
      avatarUploadDropArea.appendChild(preview);
    }
  };

  reader.readAsDataURL(file);
}

// tester of anwers in upload avatar
function validateFile(file: File): FileValidation {
  const maxSize: number = 512000; // 500KB
  const validTypes: string[] = ['image/jpeg', 'image/png'];

  if (validTypes.includes(file.type)) {
    if (file.size <= maxSize) {
      return {
        isValid: true,
        message: 'Upload your photo (JPG or PNG, max size: 500KB).'
      };
    } else {
      return {
        isValid: false,
        message: 'File too large. Please upload a photo under 500KB.'
      };
    }
  } else {
    return {
      isValid: false,
      message: 'Please upload your photo (JPG or PNG, max size: 500KB).'
    };
  }
}

// file managements of upload avatar.
function handleFile(file: File): void {
  const validation: FileValidation = validateFile(file);

  if (userAvatarUploadIcon && avatarUploadInstruction) {
    userAvatarUploadIcon.style.fill = '';
    userAvatarUploadIcon.style.filter = '';

    if (validation.isValid) {
      avatarUploadInstruction.style.color = '#b5b4c5';
      avatarUploadInstruction.textContent = validation.message;
      savedAvatarFile = file;
      createAvatarPreview(file);
    } else {
      userAvatarUploadIcon.style.filter =
        'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)';
      avatarUploadInstruction.textContent = validation.message;
      avatarUploadInstruction.style.color = '#ff0000';
    }
  }
}

// Event Listeners of upload avatar.
if (
  uploadAvatarButton &&
  avatarUploadDropArea &&
  userAvatarUploadIcon &&
  avatarUploadInstruction
) {
  // Click en botón
  uploadAvatarButton.addEventListener('click', () => {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg, image/png';
    input.click();
    input.onchange = (e: Event) => {
      const file: File | undefined = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFile(file);
    };
  });

  // Drag and Drop of upload avatar.
  uploadAvatarButton.addEventListener('dragover', (e: DragEvent) => {
    e.preventDefault();
    avatarUploadDropArea.classList.add('drag-over');
    avatarUploadGuide.style.display = 'none';
  });

  uploadAvatarButton.addEventListener('dragleave', () => {
    avatarUploadDropArea.classList.remove('drag-over');
    avatarUploadGuide.style.display = '';
  });

  uploadAvatarButton.addEventListener('drop', (e: DragEvent) => {
    e.preventDefault();
    avatarUploadDropArea.classList.remove('drag-over');
    avatarUploadGuide.style.display = '';
    const file: File | undefined = e.dataTransfer?.files[0];
    if (file) {
      handleFile(file);
    }
  });
}

// From here start email area of coding.

// Interfaz para validar email
interface EmailValidation {
  isValid: boolean;
  message: string;
}

const emailPattern: RegExp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

// funtion to validate email
function validateEmail(email: string): EmailValidation {
  if (!email.includes('@')) {
    return { isValid: false, message: 'Please enter a valid email address.' };
  }

  const [localPart, domain] = email.split('@');

  // Validations
  if (
    !email.trim() ||
    localPart.length === 0 ||
    localPart.length > 64 ||
    localPart.startsWith('.') ||
    localPart.endsWith('.')
  ) {
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
function handleEmail(email: string): void {
  const validationEmail = validateEmail(email);

  if (
    emailIconAvatarUploadInput &&
    emailInstructionAvatarUploadInput &&
    emailAvatarUploadInput
  ) {
    if (validationEmail.isValid) {
      emailIconAvatarUploadInput.style.display = 'none';
      emailInstructionAvatarUploadInput.textContent = '';
      emailAvatarUploadInput.style.borderColor = '#4c4b81';
    } else {
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
    emailAvatarUploadInput.addEventListener('input', (e: Event) => {
      const email = (e.target as HTMLInputElement).value;
      handleEmail(email);
    });
  }
});

// From here start full name area of coding (funtional programming).

// Interface for validate full name
interface FullNameValidation {
  isValid: boolean;
  message: string;
  formattedName?: string;
}

// function to validate full name
function validateFullName(fullName: string): FullNameValidation {
  const cleanedName: string = fullName.trim().replace(/\s+/g, ' ');
  const namePattern: RegExp = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s'-]+$/;
  if (!cleanedName) {
    return { isValid: false, message: 'false' };
  }
  if (!namePattern.test(cleanedName)) {
    return {
      isValid: false,
      message: 'false'
    };
  }
  const nameParts: string[] = cleanedName.split(' ');
  if (nameParts.length < 2) {
    return {
      isValid: false,
      message: 'false'
    };
  }
  const formattedName: string = nameParts
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

  return { isValid: true, message: '', formattedName };
}

// UI management for full name
function handleFullName(fullName: string): void {
  const validationFullName: FullNameValidation = validateFullName(fullName);
  if (fullNameAvatarUploadInput) {
    if (validationFullName.isValid) {
      fullNameAvatarUploadInput.style.borderColor = '';
    } else {
      fullNameAvatarUploadInput.style.borderColor = '#ff0000';
    }
  }
}

// Event Listeners of full name
document.addEventListener('DOMContentLoaded', () => {
  if (fullNameAvatarUploadInput) {
    fullNameAvatarUploadInput.addEventListener('input', e => {
      const fullName: string = (e.target as HTMLInputElement).value;
      handleFullName(fullName);
    });
  }
});

// From here start github username area of coding (funtional programming).

// Interface for validate github username
interface GithubUsernameValidation {
  isValid: boolean;
  message: string;
}

// function to validate github username
function validateGithubUsername(username: string): GithubUsernameValidation {
  const githubUsernamePattern: RegExp =
    /^@[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  if (!githubUsernamePattern.test(username)) {
    return {
      isValid: false,
      message: 'Please enter a valid GitHub username.'
    };
  }
  return { isValid: true, message: '' };
}

// UI manegemenent for github username
function handleGithubUsername(username: string): void {
  const validationGithubUsername: GithubUsernameValidation =
    validateGithubUsername(username);
  if (githubUsernameAvatarUploadInput) {
    if (validationGithubUsername.isValid) {
      githubUsernameAvatarUploadInput.style.borderColor = '';
    } else {
      githubUsernameAvatarUploadInput.style.borderColor = '#ff0000';
    }
  }
}

// Event Listeners of github username
document.addEventListener('DOMContentLoaded', () => {
  if (githubUsernameAvatarUploadInput) {
    githubUsernameAvatarUploadInput.addEventListener('input', e => {
      const username: string = (e.target as HTMLInputElement).value;
      handleGithubUsername(username);
    });
  }
});

// ts to the second page.
