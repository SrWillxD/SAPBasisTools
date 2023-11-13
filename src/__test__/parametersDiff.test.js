const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlPath = path.resolve(__dirname, '../app/Public/HTML/parametersDiff.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const { window } = new JSDOM(htmlContent);
global.document = window.document;
global.window = window;

console.log(htmlContent);

describe("Paste Replication Behavior", ()=>{



})
