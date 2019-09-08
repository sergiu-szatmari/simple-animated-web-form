
const colorOK = 'rgb(87,189,130)';
const colorERR = 'rgb(189,87,87)';

const validCredentials = [
    { username: 'user', email: 'email@example.com', password: 'password' },
];

currentUser = '';


function animatedForm() {

    const arrows = document.querySelectorAll(".fa-arrow-down");
    arrows.forEach( arrow => {
        arrow.addEventListener('click', () => {
            const input = arrow.previousElementSibling;
            const parentDiv = arrow.parentElement;
            const nextParentDiv = parentDiv.nextElementSibling;

            // Validation
            if (input.type === "text" && validateUser(input)) {
                nextSlide(parentDiv, nextParentDiv);
            } else if (input.type === "email" && validateEmail(input)) {
                nextSlide(parentDiv, nextParentDiv);
            } else if (input.type === "password" && validatePassword(input)) {
                passwordSuccess(parentDiv, nextParentDiv);
                // nextSlide();
            } else {
                parentDiv.style.animation = "shake 0.5s ease";
            }

            parentDiv.addEventListener('animationend', () => {
                parentDiv.style.animation = "";
            });

            const statusDiv = document.querySelector('.field-status');
            statusDiv.addEventListener('animationend', () => {
                statusDiv.style.animation = '';
            })
        });
    })
}

function hearts() {

    const hearts = document.querySelectorAll('.fa-heart');
    hearts.forEach(h => {
        h.style.animation = "hearts 1s ease";
    });
}

function animateFinal() {

    const finalDiv = document.querySelector('.field-final');
    finalDiv.addEventListener('click', () => {
        changeBgColor(colorERR);
        hearts();
        finalDiv.addEventListener('animationend', () => {
            location.reload();
        })
    });
}


function validateUser(user) {

    validUsername = false;
    validCredentials.forEach(credential => {
        if (credential.username === user.value) {
            validUsername = true;
        }
    })

    if (validUsername) {
        currentUser = user.value;
        success();
        return true;
    } else {
        error('Invalid username');
    }
}

function validateEmail(email) {

    validEmail = false;
    const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (validation.test(email.value)) {

        validCredentials.forEach(credential => {
            if (credential.username === currentUser) {
                if (credential.email === email.value) {
                    validEmail = true;
                }
            }
        });

        if (validEmail) {
            success();
            return true;
        } else {
            error('Invalid email for user \'' + currentUser + '\'');
        }
    
    } else {
        error('Invalid email address format');
    }
}

function validatePassword(password) {

    validPassword = false;
    validCredentials.forEach(credential => {
        if (credential.username === currentUser) {
            if (credential.password === password.value) {
                validPassword = true;
            }
        }
    });

    if (validPassword) {
        success();
        return true;
    } else {
        error('Invalid password for user \'' + currentUser + '\'');
    }
}

function nextSlide(parent, nextParentDiv) {

    setStatusMessage('');
    const status = document.querySelector('.field-status');
    hideStatus(status);

    parent.classList.add('inactive');
    parent.classList.remove('active');
    nextParentDiv.classList.add('active');
}

function changeBgColor(color) {

    document.body.style.backgroundColor = color;
}

function showStatus(status) {

    status.style.animation = 'status-shake 1.0s ease';
    status.classList.add('activestatus');
    status.classList.remove('inactivestatus');
}

function hideStatus(status) {

    status.classList.add('inactivestatus');
    status.classList.remove('activestatus');
}

function setStatusMessage(message) {

    textfield = document.querySelector('.field-status').getElementsByTagName('p')[0];
    textfield.innerHTML = message;
}

function success() {

    changeBgColor(colorOK);
}

function error(message) {

    changeBgColor(colorERR);
    const status = document.querySelector('.field-status');
    setStatusMessage(message);
    showStatus(status);
}

function passwordSuccess(parentDiv, nextParentDiv) {

    const i = document.querySelector('.fa-lock');
    i.style.animation = 'unlock 1s ease';
    i.classList.remove('fa-lock');
    i.classList.add('fa-unlock');
    i.addEventListener('animationend', () => {
        nextSlide(parentDiv, nextParentDiv);
    })
    i.style.animation = 'unlock 0.3s ease';
}

function animateWidgets() {

    const i = document.querySelector('.fa-user');
    i.addEventListener('click', () => {
        i.style.animation = 'shakeplace 0.7s ease';
        i.addEventListener('animationend', () => {
            i.style.animation = '';
        });
    });
    const j = document.querySelector('.fa-envelope');
    j.addEventListener('click', () => {
        j.style.animation = 'shakeplace 0.7s ease';
        j.addEventListener('animationend', () => {
            j.style.animation = '';
        });
    });
    const k = document.querySelector('.fa-lock');
    k.addEventListener('click', () => {
        k.style.animation = 'shakeplace 0.7s ease';
        k.addEventListener('animationend', () => {
            k.style.animation = '';
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    animatedForm();
    animateFinal();
    animateWidgets();
});
