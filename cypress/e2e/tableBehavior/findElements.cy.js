/// <reference types="Cypress"/>

describe('Find elements', ()=>{
    it("Find button compareButtonBTN", ()=>{
        cy.visit('http://localhost:3333/params');
        cy.get('#compareButtonBTN');
    });
});

describe("When the 'Compare' button is clicked without any content in the tables, the result div should not be displayed.", ()=>{
    
});

describe("When the 'Compare' button is clicked with real data in the table, but it is not necessary to perform any action, the corresponding result div should be shown informing that the users are already in sync.", ()=>{

});

describe("When entering duplicate data, the result must be shown without duplicate values.", ()=>{
    
});

describe("When the value conversion button is clicked, the user model values must change table with the user copy.", ()=>{

});


describe("Check the veracity of the results when changes are required for the user.", ()=>{

});

describe("When a result already exists, remove it before inserting the new one.", ()=>{

});
