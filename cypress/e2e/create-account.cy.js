import { faker } from '@faker-js/faker';

describe('Create Account', () => {
    beforeEach(() => {
        cy.visit('/customer/account/create/');
    })
    it('User is able to create an account and get the correct ', () => {


        const email = faker.internet.email();
        const password = faker.internet.password();
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        cy.createAccount(email, password, firstName, lastName)


        cy.url().should('include', '/customer/account/')
        cy.get('.message-success').should('exist');
        cy.get('.message-success').contains('Thank you for registering').should('exist');


        cy.contains(`${firstName} ${lastName}`).should('exist');

    })
})