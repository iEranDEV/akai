/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    AKAI Frontend Task - Javascript

    W tym zadaniu postaraj się zaimplementować metody, które sprawdzą, czy dane wprowadzone
    do formularza są poprawne. Przykładowo: czy imię i nazwisko zostało wprowadzone.
    Możesz rozwinąć walidację danych tak bardzo, jak tylko zapragniesz.

    Powodzenia!
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Consts
const form = document.querySelector('#register-form');
const INTEREST_OPTIONS = ['Frontend', 'Backend', 'Mobile', 'Grafika'];

// Load add interest options on app start
const interestWrapper = document.querySelector('#interests');
INTEREST_OPTIONS.forEach((item) => {
    const labelElement = document.createElement('label');
    labelElement.htmlFor = `${item}-checkbox`;
    labelElement.className = 'interests-item';
    const inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.id = `${item}-checkbox`;
    inputElement.name = `${item}-checkbox`;
    inputElement.value = `${item}`;
    const spanElement = document.createElement('span');
    spanElement.innerText = `${item}`;
    labelElement.appendChild(inputElement);
    labelElement.appendChild(spanElement);
    interestWrapper.appendChild(labelElement);
})

// On submit event
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errors = {
        'first-name': null,
        'last-name': null,
        'email': null,
        'interests': null,
    };

    // Load all form data
    const firstName = form['first-name'].value;
    const lastName = form['last-name'].value;
    const email = form['email'].value;
    const interests = [...INTEREST_OPTIONS.map((item) => {
        const value = form[`${item}-checkbox`].checked;
        if (value) return item;
    }).filter((item) => item)];

    // Validate form

    // Validate first name
    if (!firstName) errors['first-name'] = 'Podaj swoje imie';
    else if (firstName.length >= 30 || firstName.length < 3) errors['first-name'] = 'Twoje imie musi mieć między 3 a 30 znaków';

    // Validate last name
    if (!lastName) errors['last-name'] = 'Podaj swoje nazwisko';
    else if (lastName.length >= 30 || lastName.length < 3) errors['last-name'] = 'Twoje nazwisko musi mieć między 3 a 30 znaków';

    // Validate email
    if (!email) errors['email'] = 'Podaj swój adres email';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors['email'] = 'Twój adres email jest niepoprawny';
    else if (email.length >= 50 || email.length < 3) errors['email'] = 'Twój adres email musi mieć między 3 a 50 znaków';

    // Validate interest list
    if (interests.length === 0) errors['interests'] = 'Wybierz przynajmniej jedno zainteresowanie';

    if (Object.entries(errors).every((entry) => entry[1] === null)) {
        // Success = print form data
        console.log({ firstName, lastName, email, interests });
    } else {
        // Error = print errors
        Object.entries(errors).forEach(([key, value]) => {
            const element = document.querySelector(`#${key} + .error-message`);
            if (value) {
                element.innerText = value;
                element.className = 'error-message error';
            } else {
                element.innerText = '';
                element.className = 'error-message';
            }
        })
    }
})