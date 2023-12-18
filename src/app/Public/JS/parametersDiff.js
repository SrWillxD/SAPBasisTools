applicationLauncher();

function applicationLauncher(){
    addingPasteReplicationBehaviorToInputTables();
}

function addingPasteReplicationBehaviorToInputTables(){
    document.addEventListener('DOMContentLoaded', function(){
        let tables = document.querySelectorAll("table");

        tables.forEach(table =>{
            table.addEventListener("paste", clipboardEvent =>{
                processPastedData(clipboardEvent, clipboardEvent.target);
                replaceNonBreakingSpace(table);
            });
        });
    });
}

function processPastedData(clipboardEvent, targetCell){
    clipboardEvent.preventDefault();
    
    let clipboardData = clipboardEvent.clipboardData || window.ClipboardEvent;
    let pastedData = clipboardData.getData('text/plain');
    let rows = pastedData.split('\n');
    
    let currentRow = targetCell.parentNode;
    
    for(let i = 0; i < rows.length; i++){
        let cells = rows[i].split('\t');

        for(let j = 0; j < cells.length; j++){
            if(currentRow.cells[j]){
                currentRow.cells[j].innerHTML = cells[j].replace(/ /g, '&nbsp;');
            }
        }

        currentRow = currentRow.nextElementSibling;
        if(!currentRow){break;}
    }
}

function replaceNonBreakingSpace(table){
    let rows = table.querySelectorAll("tbody > tr");

    rows.forEach(row =>{
        let cells = row.querySelectorAll("td");

        cells.forEach(cell =>{
            cell.innerHTML = cell.innerHTML.replace(/&nbsp;/g, ' ');
        });
    });
}

function capturesAllDataFromAllTables(){
    let modelUserFunctionsArr = [];
    let modelUserParamsArr = [];
    let modelUserProfilesArr = [];
    let userCopyFunctionsArr = [];
    let userCopyParamsArr = [];
    let userCopyProfilesArr = [];

    
}