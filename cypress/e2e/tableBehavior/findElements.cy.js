/// <reference types="Cypress"/>

describe('Find elements', ()=>{

    it("Find button compareButtonBTN", ()=>{
        cy.visit('http://localhost:3333/params');
        cy.get('#compareButtonBTN');
    });

    it("When the 'Compare' button is clicked without any content in the tables, the result div should not be displayed.", ()=>{
        cy.visit('http://localhost:3333/params');
    });

    it("When the 'Compare' button is clicked with real data in the table, but it is not necessary to perform any action, the corresponding result div should be shown informing that the users are already in sync.", ()=>{
        cy.visit('http://localhost:3333/params');
    });

    it("When entering duplicate data, the result must be shown without duplicate values.", () => {
        
    });

    //! Create tests to check whether the element that shows the result is found when the button is clicked and the user requires actions.
    //! Check the feasibility of creating describes for each item entered.
});