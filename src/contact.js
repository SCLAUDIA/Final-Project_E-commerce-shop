const formDiv = document.getElementById("form");
const formMessageReveal = document.getElementById("successMessage");
const nameElem = document.getElementById("name");
const emailElem = document.getElementById("email");
const messageElem = document.getElementById("message");

class UI {
    constructor() {
        this.allElementsValid = true;
    }

    showErrorMessage(elem, message) {
        elem.parentElement.classList.add('error');
        const smallError = elem.parentElement.querySelector('small');
        smallError.innerHTML = message;
    }

    showSuccessMessage(elem) {
        elem.parentElement.classList.remove('error');
        elem.parentElement.classList.add('success');

        setTimeout(() => {
            elem.parentElement.classList.remove('success');
        }, 2000);
    }

    showSuccessMessage() {
        if (this.allElementsValid) {
            let successMessage = document.createElement('p');
            successMessage.className = 'success';
            successMessage.innerHTML = "Thank you for contacting us!";
            formMessageReveal.appendChild(successMessage);

            setTimeout(() => {
                successMessage.remove();
            }, 2000);
        }
    }

    clearFields() {
        nameElem.value = '';
        emailElem.value = '';
        messageElem.value = '';
    }
}

formDiv.addEventListener('submit', (e) => {
    e.preventDefault();

    let ui = new UI();

    if (nameElem.value === '') {
        ui.showErrorMessage(nameElem, "Your name is required!");
        ui.allElementsValid = false;
    }
    else {
        ui.showSuccessMessage;
    }

    if (emailElem.value === '') {
        ui.showErrorMessage(emailElem, "Your email is required!");
        ui.allElementsValid = false;
    }
    else {
        ui.showSuccessMessage;
    }

    if (messageElem.value === '') {
        ui.showErrorMessage(messageElem, "You must write a message!");
        ui.allElementsValid = false;
    }
    else {
        ui.showSuccessMessage;
    }

    
    ui.showSuccessMessage();
    ui.clearFields();
});