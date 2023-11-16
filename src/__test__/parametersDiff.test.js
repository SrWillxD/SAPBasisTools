const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlPath = path.resolve(__dirname, '../app/Public/HTML/parametersDiff.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const { addingPasteReplicationBehaviorToInputTables } = require('../app/Public/JS/parametersDiff.js')

const { window } = new JSDOM(htmlContent);
global.document = window.document;
global.window = window;


describe("Paste Replication Behavior", ()=>{
    const toBePasted = `/STMC/USER_ID	USR_TDZLGAJ6HAPORO
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
    SCL	                                         G`;


    it("Must fill 17 cells in the table", ()=>{
        addingPasteReplicationBehaviorToInputTables();

        const tables = window.document.querySelectorAll('table');
        console.table(tables);
        const arrayFromNodeList = [...tables];
        console.log(arrayFromNodeList);
        console.log(Array.from(tables).map(table => ({ HTMLTableElement: table.outerHTML })));

        //console.log(window.document.documentElement.outerHTML);
    });
});
