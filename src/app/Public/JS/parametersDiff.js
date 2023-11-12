document.addEventListener('DOMContentLoaded', function(){
    let tables = document.querySelectorAll("table");

    tables.forEach(table =>{
        table.addEventListener("paste", e =>{
            e.preventDefault();

            let clipboardData = e.clipboardData || window.Clipboard;
            console.log(e.clipboardData);
            let pastedData = clipboardData.getData('text/plain');

            let rows = pastedData.split('\n');

            let currentCell = e.target;
            let currentRow = currentCell.parentNode;

            for(let i = 0; i < rows.length; i++){
                let cells = rows[i].split('\t');

                for(let j = 0; j < cells.length; j++){
                    if(currentRow.cells[j]){
                        currentRow.cells[j].textContent = cells[j].trim();
                    }
                }

                currentRow = currentRow.nextElementSibling;
                if(!currentRow){break};
            }
        });
    });
});
