// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('createAccount', (email, password, firstName, lastName) => {

    cy.log('userInformation', {
        email,
        password,
        firstName,
        lastName
    });

    cy.get('#firstname').clear().type(firstName);
    cy.get('#lastname').clear().type(lastName);
    cy.get('#email_address').clear().type(email);
    cy.get('#password').clear().type(password);
    cy.get('#password-confirmation').clear().type(password);


    cy.get('.submit.primary[type="submit"]').click();
})
