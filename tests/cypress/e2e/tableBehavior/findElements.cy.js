/// <reference types="Cypress"/>

const dotenv = require('dotenv')

dotenv.config();

const port = process.env.PORT || 3333;

describe('Find elements', () => {
    const parameterData = `/STMC/USER_ID	USR_TDZLGAJ6HAPORO
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

    const roleData = `SAP_S_RFCACL
ZNWBC_AUTO_TEST_CANVAS_ROLE_1
ZNWBC_HIDE_TEST
ZTRUSTEDSYSTEM
ABAP_S4
Z_ANALISTAS_SAP
Z_BASIS_ARAUJO
Z_CORP_SOLICITANTE_V_A_P
Z_CORP_USUARIOS
Z_DIGITAL_TIME_TECNOLOGIA
PFCG_OBG
Z_DROGATEL_GESTAO
Z_GEINF_ANALISTAS_FUNCIONAIS
Z_GETEC_AUXILIAR_SF
SAP_SUP_FI
Z_TEMP_SE38
Z_USERS`

    it("Find button compareButtonBTN", () => {
        cy.visit(`http://localhost:${port}/params`);
        cy.get('#compareButtonBTN');
    });

    it("When the 'Compare' button is clicked without any content in the tables, the result div should not be displayed.", () => {
        cy.visit(`http://localhost:${port}/params`);
        cy.get('#compareButtonBTN').click();
        cy.get('#result-container').should('not.be.visible');
    });

    it("When a result already exists, remove it before inserting the new one.", () => {
        cy.visit(`http://localhost:${port}/params`);

        cy.get('#modelUser > :nth-child(1) > tbody > :nth-child(1) > td')
            .invoke('text', roleData)
            .trigger('paste', { clipboardData: { getData: () => roleData } });

        cy.get('#modelUser > :nth-child(2) > tbody > :nth-child(1) > :nth-child(1)')
            .invoke('text', parameterData)
            .trigger('paste', { clipboardData: { getData: () => parameterData } });

        cy.get('#modelUser > :nth-child(3) > tbody > :nth-child(1) > td')
            .invoke('text', roleData)
            .trigger('paste', { clipboardData: { getData: () => roleData } });

        cy.get('#compareButtonBTN').click();
        cy.get('#compareButtonBTN').click();

        cy.get('#result-functions')
            .should('exist')
            .find('span')
            .should('have.length', 1);
        cy.get('#result-functions')
            .find('ul')
            .should('have.length', 1);

        cy.get('#result-params')
            .should('exist')
            .find('span')
            .should('have.length', 1);
        cy.get('#result-params')
            .find('table')
            .should('have.length', 1);

        cy.get('#result-profiles')
            .should('exist')
            .find('span')
            .should('have.length', 1);
        cy.get('#result-profiles')
            .find('ul')
            .should('have.length', 1);
    });

    it('Complementary test to the test above, in this case the scenario where there are parameters with the same keys but different values will be treated.', () => {
        cy.visit(`http://localhost:${port}/params`);

        const parameterDataModified = `CAC	A001
ERB	A001`;

        cy.get('#modelUser > :nth-child(2) > tbody > :nth-child(1) > :nth-child(1)')
            .invoke('text', parameterData)
            .trigger('paste', { clipboardData: { getData: () => parameterData } });

        cy.get('#userCopy > :nth-child(2) > tbody > :nth-child(1) > :nth-child(1)')
            .invoke('text', parameterDataModified)
            .trigger('paste', { clipboardData: { getData: () => parameterDataModified } });

        cy.get('#compareButtonBTN').click();
        cy.get('#compareButtonBTN').click();

        cy.get('#result-params')
            .should('exist')
            .find('span')
            .should('have.length', 2);
        cy.get('#result-params')
            .find('table')
            .should('have.length', 2);
    });
});


describe("When the 'Compare' button is clicked with real data in the table, but it is not necessary to perform any action, the corresponding result div should be shown informing that the users are already in sync.", () => {

});

describe("When entering duplicate data, the result must be shown without duplicate values.", () => {

});

describe("When the value conversion button is clicked, the user model values must change table with the user copy.", () => {

});


describe("Check the veracity of the results when changes are required for the user.", () => {

});

describe("When only parameters with equal keys and different values are entered, the result should be shown in the same way.", () => {

});

//! When we copy the data from the result div, the spaces are not copied.