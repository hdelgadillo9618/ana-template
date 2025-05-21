var contactSending = false;
let base_url = 'https://ana.care/';
switch (window.location.hostname) {
    case 'localhost':
        base_url = 'http://localhost/';
        break;
    case 'dev83.boronstudio.com':
        base_url = 'https://dev83.boronstudio.com/anacare/';
        break;
}

document.addEventListener("DOMContentLoaded", function () {
    const contactNameInput = document.querySelector('.contactName');
    const contactEmailInput = document.querySelector('.contactEmail');
    const contactPhoneInput = document.querySelector('.contactPhone');
    const contactCountryInput = document.querySelector('.contactCountry');
    const contactIamInput = document.querySelector('.contactIam');
    const contactMsjInput = document.querySelector('.contactMsj');
    const contactSendButton = document.querySelector('.contactSend');
    const form = document.getElementById('contactForm');
    const onlyLettersAndSpaceRegex = /^[a-zA-Z\s]$/; // letters and space
    const onlyLettersAndSpaceRegexAll = /^[a-zA-Z\s]+$/; // letters and space
    const onlyNumbersRegex = /^[0-9]$/; //only numbers
    const onlyNumbersRegexAll = /^[0-9]+$/; //only numbers
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email format

    contactNameInput.addEventListener('keypress', function (event) {
        const char = String.fromCharCode(event.keyCode || event.which);
        if (!onlyLettersAndSpaceRegex.test(char)) {
            event.preventDefault();
        }
    });
    contactPhoneInput.addEventListener('keypress', function (event) {
        const char = String.fromCharCode(event.keyCode || event.which);
        if (!onlyNumbersRegex.test(char)) {
            event.preventDefault();
        }
    });

    contactSendButton.addEventListener('click', function (event) {
        event.preventDefault();
        const formData = new FormData();
        if (contactSending) {
            return;
        }
        if (validateForm()) {
            formData.append('contactName', contactNameInput.value);
            formData.append('contactEmail', contactEmailInput.value);
            formData.append('contactPhone', contactPhoneInput.value);
            formData.append('contactCountry', contactCountryInput.value);
            formData.append('contactIam', contactIamInput.value);
            formData.append('contactMsj', contactMsjInput.value);
            if (typeof (grecaptcha) != "undefined") {
                reloadRecaptcha(function () {
                    formData.append('recaptcha', document.querySelector("#g-recaptcha-response").value);
                    sendContactInfoFrm(formData)
                });
            } else {
                sendContactInfoFrm(formData);
            }
        }
    });


    function sendContactInfoFrm(formData) {
        fetch(base_url + 'api/contact.php', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
            },
            body: formData
        }).then(res => res.json()).then(res => {
            if (res.status) {
                console.log(res);
                form.classList.add('success');
            } else {
                if (typeof res.nodes !== 'undefined') {
                    res.nodes.forEach(node => {
                        form.querySelector(node).parentElement.classList.add('warning');
                    })
                }
                contactSending = false;
            }

        }).catch(err => {
            contactSending = false;
            console.log(err);
        })
    }

    function validateForm() {
        let isValid = true;

        if (contactNameInput.value.trim() === '') {
            displayError(contactNameInput);
            isValid = false;
        } else {
            removeError(contactNameInput);
        }

        if (!onlyLettersAndSpaceRegexAll.test(contactNameInput.value)) {
            displayError(contactNameInput);
            isValid = false;
        } else {
            removeError(contactNameInput);
        }

        if (!emailRegex.test(contactEmailInput.value.trim())) {
            displayError(contactEmailInput);
            isValid = false;
        } else {
            removeError(contactEmailInput);
        }

        if (contactPhoneInput.value.trim() === '') {
            displayError(contactPhoneInput);
            isValid = false;
        } else {
            removeError(contactPhoneInput);
        }

        if (!onlyNumbersRegexAll.test(contactPhoneInput.value)) {
            displayError(contactPhoneInput);
            isValid = false;
        } else {
            removeError(contactPhoneInput);
        }

        if (contactCountryInput.value === '') {
            contactCountryInput.parentElement.parentElement.classList.add('warning');
            isValid = false;
        } else {
            contactCountryInput.parentElement.parentElement.classList.remove('warning');
        }

        if (contactIamInput.value === '') {
            contactIamInput.parentElement.parentElement.classList.add('warning');
            isValid = false;
        } else {
            contactIamInput.parentElement.parentElement.classList.remove('warning');
        }

        if (contactMsjInput.value.trim() === '') {
            displayError(contactMsjInput);
            isValid = false;
        } else {
            removeError(contactMsjInput);
        }

        return isValid;
    }

    function displayError(inputElement) {
        inputElement.parentElement.classList.add('warning');
    }

    function removeError(inputElement) {
        inputElement.parentElement.classList.remove('warning');
    }
});