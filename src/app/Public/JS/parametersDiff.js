function addingPasteReplicationBehaviorToInputTables(){
    document.addEventListener('DOMContentLoaded', function(){
        let tables = document.querySelectorAll("table");

        tables.forEach(table =>{
            table.addEventListener("paste", clipboardEvent =>{
                processPastedData(clipboardEvent, clipboardEvent.target);
            });
        });
    });
}

addingPasteReplicationBehaviorToInputTables();

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

module.exports = {
    addingPasteReplicationBehaviorToInputTables
};