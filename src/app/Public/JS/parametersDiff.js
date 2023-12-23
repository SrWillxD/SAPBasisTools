applicationLauncher();

function applicationLauncher(){
    addingPasteReplicationBehaviorToInputTables();
    compareButtonListener();
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

function compareButtonListener(){
    const button = document.getElementById('compareButtonBTN');

    document.addEventListener('DOMContentLoaded', ()=>{
        button.addEventListener('click', capturesAllDataFromAllTables);
    })
}

function capturesAllDataFromAllTables(){
    let modelUserFunctionsArr = captureTableData("#modelUser table:nth-child(1)");
    let modelUserParamsArr = captureTableData("#modelUser table:nth-child(2)");
    let modelUserProfilesArr = captureTableData("#modelUser table:nth-child(3)");

    let userCopyFunctionsArr = captureTableData("#userCopy table:nth-child(1)");
    let userCopyParamsArr = captureTableData("#userCopy table:nth-child(2)");
    let userCopyProfilesArr = captureTableData("#userCopy table:nth-child(3)");

    compareSingleColumnTable(modelUserFunctionsArr, userCopyFunctionsArr);
    compareDoubleColumnTable(modelUserParamsArr, userCopyParamsArr);
    compareSingleColumnTable(modelUserProfilesArr, userCopyProfilesArr);
}


function captureTableData(selector){
    let dataArray = [];
    let rows = document.querySelectorAll(`${selector} tbody > tr`);

    rows.forEach(row =>{
        let cells = row.querySelectorAll("td");
        let rowData = [];

        cells.forEach(cell =>{
            rowData.push(cell.textContent.replace(/\n$/, ''));
        });

        dataArray.push(rowData);
    });

    return dataArray;
}

function compareSingleColumnTable(modelUserArr, copyUserArr){
    const modelArr = modelUserArr;
    const copyArr = copyUserArr;
    
    for(let i = 0; i < modelArr.length; i++){
        if(copyArr.some(item=> JSON.stringify(item) === JSON.stringify(modelArr[i]))){
            
        }
    }
}

function compareDoubleColumnTable(){
    
}
