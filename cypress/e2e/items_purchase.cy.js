import { faker } from '@faker-js/faker';

describe('Buy Items form the store', () => {

    context('Guest User', () => {
        beforeEach(() => {
            cy.visit('/')
        })
        it('Place Order for guest user', () => {

            cy.get('.level0.level-top')
                .contains('Men')
                .click();
            cy.get('.block .options li.item')
                .contains('Tops')
                .click();
            cy.contains('Category')
                .click({ force: true });
            cy.get('.filter-options-content')
                .contains('Jackets')
                .click();
            cy.get('.product-item-info > .details > .name > .product-item-link')
                .contains('Beaumont Summit Kit').click()
            cy.get('[aria-label="L"]').click()
            cy.get('[aria-label="Red"]').click()
            cy.get('#product-addtocart-button').click();


            cy.get('.level0.level-top')
                .contains('Men')
                .click();
            cy.get('.block .options li.item')
                .contains('Tops')
                .click();
            cy.contains('Category')
                .click({ force: true });
            cy.get('.filter-options-content')
                .contains('Tees')
                .click();
            cy.get('.product-item-info > .details > .name > .product-item-link')
                .contains('Strike Endurance Tee').click()
            cy.get('[aria-label="L"]').click()
            cy.get('[aria-label="Black"]').click()
            cy.get('#product-addtocart-button').click();


            cy.visit('/checkout/');


            let email = faker.internet.email();
            let firstName = faker.person.firstName();
            let lastName = faker.person.lastName();
            let city = faker.location.city();
            let address = faker.location.secondaryAddress();
            let zip = faker.location.zipCode();
            let phoneNumber = faker.phone.number();

            cy.get('.loader', { timeout: 10000 }).should('not.be.visible');
            cy.wait(2000)
            cy.get('#customer-email-fieldset > .required > .control > #customer-email').clear().type(email, { force: true });

            cy.get('[name="firstname"]').clear().type(firstName, { force: true });
            cy.get('[name="lastname"]').clear().type(lastName, { force: true });
            cy.get('[name="street[0]"]').clear().type(address, { force: true });
            cy.get('[name="city"]').clear().type(city, { force: true });
            cy.get('[name="region_id"]').select('Alaska');
            cy.get('[name="postcode"]').clear().type(zip, { force: true });
            cy.get('[name="telephone"]').clear().type(phoneNumber, { force: true });

            cy.contains('Fixed').click();

            cy.get('button.button.action.continue.primary').click();

            cy.get('.loader', { timeout: 10000 }).should('not.be.visible');


            cy.url().should('contain', '/checkout/#payment')

            cy.get('.payment-group > .step-title', { timeout: 10000 }).should('be.visible');

            cy.get('.opc-block-summary > .loading-mask > .loader > img', { timeout: 10000 }).should('not.exist');

            cy.wait(1000)

            cy.intercept('GET', '/checkout/onepage/success').as('order')

            cy.get('div.primary > .action').contains('Place Order').click();


            cy.wait('@order').its('response.statusCode').should('eq', 200);

        })

    })

    context('Logged in User', () => {

        beforeEach(() => {
            cy.visit('/customer/account/create/');
            let email = faker.internet.email();
            let password = faker.internet.password();
            let firstName = faker.person.firstName();
            let lastName = faker.person.lastName();
    
            cy.createAccount(email, password, firstName, lastName)

        })
        it('User is able to order an item and check the receipt', () => {

            cy.get('.level0.level-top')
                .contains('Men')
                .click();
            cy.get('.block .options li.item')
                .contains('Tops')
                .click();
            cy.contains('Category')
                .click({ force: true });
            cy.get('.filter-options-content')
                .contains('Jackets')
                .click();
            cy.get('.product-item-info > .details > .name > .product-item-link')
                .contains('Beaumont Summit Kit').click()
            cy.get('[aria-label="L"]').click()
            cy.get('[aria-label="Red"]').click()
            cy.get('#product-addtocart-button').click();


            cy.get('.level0.level-top')
                .contains('Men')
                .click();
            cy.get('.block .options li.item')
                .contains('Tops')
                .click();
            cy.contains('Category')
                .click({ force: true });
            cy.get('.filter-options-content')
                .contains('Tees')
                .click();
            cy.get('.product-item-info > .details > .name > .product-item-link')
                .contains('Strike Endurance Tee').click()
            cy.get('[aria-label="L"]').click()
            cy.get('[aria-label="Black"]').click()
            cy.get('#product-addtocart-button').click();


            cy.visit('/checkout/');


            let city = faker.location.city();
            let address = faker.location.secondaryAddress();
            let zip = faker.location.zipCode();
            let phoneNumber = faker.phone.number();

            cy.get('.loader', { timeout: 10000 }).should('not.be.visible');
            cy.wait(2500)


            cy.get('[name="street[0]"]').clear().type(address, { force: true });
            cy.get('[name="city"]').clear().type(city, { force: true });
            cy.get('[name="region_id"]').select('Alaska');
            cy.get('[name="postcode"]').clear().type(zip, { force: true });
            cy.get('[name="telephone"]').clear().type(phoneNumber, { force: true });

            cy.contains('Fixed').click();

            cy.get('button.button.action.continue.primary').click();

            cy.get('.loader', { timeout: 10000 }).should('not.be.visible');


            cy.url().should('contain', '/checkout/#payment')

            cy.get('.payment-group > .step-title', { timeout: 10000 }).should('be.visible');

            cy.get('.opc-block-summary > .loading-mask > .loader > img', { timeout: 10000 }).should('not.exist');

            cy.wait(1500)

            cy.intercept('GET', '/checkout/onepage/success').as('order')

            cy.get('div.primary > .action').contains('Place Order').click();


            cy.wait('@order').its('response.statusCode').should('eq', 200);


            cy.get('.order-number > strong').click();

            cy.get('.order-status').contains('Pending');


            cy.get('.col.price > .price-excluding-tax > .cart-price > .price').should('have.length', 2);

            cy.get('.grand_total > .amount').should('exist');

        })
    })
})