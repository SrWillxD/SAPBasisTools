/// <reference types="Cypress"/>

describe('Check if the link is active', () => {
    it('Status 2xx', () => {
        const linkUrl = 'http://localhost:3333';

        cy.request(linkUrl).as('linkRequest');

        cy.get('@linkRequest').its('status').should('be.oneOf', [200, 201, 202, 204]);
    });
});