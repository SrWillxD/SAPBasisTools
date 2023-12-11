/// <reference types="Cypress"/>

describe('Paste replication behavior', ()=>{

    const data = `/STMC/USER_ID	USR_TDZLGAJ6HAPORO
AREA_ID	S_AREA_CMG
BCS_ADMIN_TREE	CC
CAC	A000
ERB	A000
ETP	                        2
LLV	CC
RSWAD_DEV_MDVERSION	                                              87
RSWAD_SKIP_JAVA	X
SCL	                                         G
SM04_CONFIGURATION	X X
SOST	XXXX    XXX1XXX  XX  X
SP01_WARN	1000
TM_INVOICE_CLERK	
WLC	X   X  XX   X 0000
RSWAD_SKIP_JAVA	X
SCL	                                         G`

    it('Must fill all fields', ()=>{
        cy.visit('http://localhost:3333/params');

        cy.get(':nth-child(1) > tbody > :nth-child(1) > :nth-child(1)')
            .invoke('text', data)
            .trigger('paste', { clipboardData: { getData: () => data } });

        cy.get(':nth-child(2) > tbody > :nth-child(1) > :nth-child(1)')
            .invoke('text', data)
            .trigger('paste', { clipboardData: { getData: () => data } });

        cy.get(':nth-child(1) > tbody > :nth-child(1) > :nth-child(1)').should('have.text', '/STMC/USER_ID');
        cy.get(':nth-child(1) > tbody > :nth-child(1) > :nth-child(2)').should('have.text', 'USR_TDZLGAJ6HAPORO');

        cy.get(':nth-child(1) > tbody > :nth-child(2) > :nth-child(1)').should('have.text', 'AREA_ID');
        cy.get(':nth-child(1) > tbody > :nth-child(2) > :nth-child(2)').should('have.text', 'S_AREA_CMG');

        cy.get(':nth-child(1) > tbody > :nth-child(3) > :nth-child(1)').should('have.text', 'BCS_ADMIN_TREE');
        cy.get(':nth-child(1) > tbody > :nth-child(3) > :nth-child(2)').should('have.text', 'CC');

        cy.get(':nth-child(1) > tbody > :nth-child(4) > :nth-child(1)').should('have.text', 'CAC');
        cy.get(':nth-child(1) > tbody > :nth-child(4) > :nth-child(2)').should('have.text', 'A000');

        cy.get(':nth-child(1) > tbody > :nth-child(5) > :nth-child(1)').should('have.text', 'ERB');
        cy.get(':nth-child(1) > tbody > :nth-child(5) > :nth-child(2)').should('have.text', 'A000');

        cy.get(':nth-child(1) > tbody > :nth-child(6) > :nth-child(1)').should('have.text', 'ETP');
        cy.get(':nth-child(1) > tbody > :nth-child(6) > :nth-child(2)').should('have.text', '                        2');
/*
        cy.get(':nth-child(1) > tbody > :nth-child(7) > :nth-child(1)').should('have.text', 'AREA_ID');
        cy.get(':nth-child(1) > tbody > :nth-child(7) > :nth-child(2)').should('have.text', 'AREA_ID');

        cy.get(':nth-child(1) > tbody > :nth-child(8) > :nth-child(1)').should('have.text', 'AREA_ID');
        cy.get(':nth-child(1) > tbody > :nth-child(8) > :nth-child(2)').should('have.text', 'AREA_ID');

        cy.get(':nth-child(1) > tbody > :nth-child(9) > :nth-child(1)').should('have.text', 'AREA_ID');
        cy.get(':nth-child(1) > tbody > :nth-child(9) > :nth-child(2)').should('have.text', 'AREA_ID');*/
    })
})