/// <reference types="Cypress"/>

describe('Paste replication behavior', () => {
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

    function createArrayOfArrays(data) {
        return data.split('\n').map(row => {
            const [left, right] = row.split('\t');
            return [left, right];
        });
    }


    it("Must fill in all the fields in the model user's 'Funções' table.", ()=>{
        const roleDataArray = roleData.trim().split('\n');

        cy.visit('http://localhost:3333/params');

        cy.get('#modelUser > :nth-child(1) > tbody > :nth-child(1) > td')
            .invoke('text', roleData)
            .trigger('paste', { clipboardData: { getData: () => roleData } });

        for(let i = 0; i < roleDataArray.length; i++){
            const selector = `#modelUser > :nth-child(1) > tbody > :nth-child(${i + 1}) > td`;
            cy.get(selector).should('have.text', roleDataArray[i]);
        }
    });

    it("Must fill in all the fields in the model user's 'Parâmetro' table.", () =>{
        const parameterDataArray = createArrayOfArrays(parameterData);

        cy.visit('http://localhost:3333/params');

        cy.get('#modelUser > :nth-child(2) > tbody > :nth-child(1) > :nth-child(1)')
            .invoke('text', parameterData)
            .trigger('paste', { clipboardData: { getData: () => parameterData } });

        const paramTableArray = [];
        const paramTableSelector = '#modelUser table:nth-child(2) tbody tr';

        cy.get(paramTableSelector).each(($row)=>{
            const rowData = [];

            cy.wrap($row).find('td').each(($cell) =>{
                rowData.push($cell.text());
            });

            paramTableArray.push(rowData);
        }).then(()=>{
            expect(parameterDataArray).to.deep.equal(paramTableArray);
        });
    });

    it("Must fill in all the fields in the model user's 'Perfis' table.", ()=>{
        const roleDataArray = roleData.trim().split('\n');

        cy.visit('http://localhost:3333/params');

        cy.get('#modelUser > :nth-child(3) > tbody > :nth-child(1) > td')
            .invoke('text', roleData)
            .trigger('paste', { clipboardData: { getData: () => roleData } });

        for(let i = 0; i < roleDataArray.length; i++){
            const selector = `#modelUser > :nth-child(3) > tbody > :nth-child(${i + 1}) > td`;
            cy.get(selector).should('have.text', roleDataArray[i]);
        }
    });

    it("Must fill in all the fields in the copy user's 'Funções' table.", ()=>{
        const roleDataArray = roleData.trim().split('\n');

        cy.visit('http://localhost:3333/params');

        cy.get('#userCopy > :nth-child(1) > tbody > :nth-child(1) > td')
            .invoke('text', roleData)
            .trigger('paste', { clipboardData: { getData: () => roleData } });

        for(let i = 0; i < roleDataArray.length; i++){
            const selector = `#userCopy > :nth-child(1) > tbody > :nth-child(${i + 1}) > td`;
            cy.get(selector).should('have.text', roleDataArray[i]);
        }
    });

    it("Must fill in all the fields in the model user's 'Parâmetro' table.", () =>{
        const parameterDataArray = createArrayOfArrays(parameterData);

        cy.visit('http://localhost:3333/params');

        cy.get('#userCopy > :nth-child(2) > tbody > :nth-child(1) > :nth-child(1)')
            .invoke('text', parameterData)
            .trigger('paste', { clipboardData: { getData: () => parameterData } });

        const paramTableArray = [];
        const paramTableSelector = '#userCopy table:nth-child(2) tbody tr';

        cy.get(paramTableSelector).each(($row)=>{
            const rowData = [];

            cy.wrap($row).find('td').each(($cell) =>{
                rowData.push($cell.text());
            });

            paramTableArray.push(rowData);
        }).then(()=>{
            expect(parameterDataArray).to.deep.equal(paramTableArray);
        });
    });

    it("Must fill in all the fields in the model user's 'Perfis' table.", ()=>{
        const roleDataArray = roleData.trim().split('\n');

        cy.visit('http://localhost:3333/params');

        cy.get('#userCopy > :nth-child(3) > tbody > :nth-child(1) > td')
            .invoke('text', roleData)
            .trigger('paste', { clipboardData: { getData: () => roleData } });

        for(let i = 0; i < roleDataArray.length; i++){
            const selector = `#userCopy > :nth-child(3) > tbody > :nth-child(${i + 1}) > td`;
            cy.get(selector).should('have.text', roleDataArray[i]);
        }
    });
});
