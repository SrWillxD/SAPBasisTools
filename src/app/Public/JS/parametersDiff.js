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
    let modelUserFunctionsArr = [].concat(...captureTableData("#modelUser table:nth-child(1)")).filter(item=> item.length > 0);
    let modelUserParamsArr = captureTableData("#modelUser table:nth-child(2)").filter(row => row[0].trim() !== '');
    let modelUserProfilesArr = [].concat(...captureTableData("#modelUser table:nth-child(3)")).filter(item=> item.length > 0);

    let userCopyFunctionsArr = [].concat(...captureTableData("#userCopy table:nth-child(1)")).filter(item=> item.length > 0);
    let userCopyParamsArr = captureTableData("#userCopy table:nth-child(2)").filter(row => row[0].trim() !== '');
    let userCopyProfilesArr = [].concat(...captureTableData("#userCopy table:nth-child(3)")).filter(item=> item.length > 0);

    const differenceBetweenFunctionsArr = differenceBetweenSingleColumnTables(modelUserFunctionsArr, userCopyFunctionsArr);
    const differenceBetweenParamsArr = differenceBetweenDoubleColumnTables(modelUserParamsArr, userCopyParamsArr);
    const differenceBetweenProfilesArr = differenceBetweenSingleColumnTables(modelUserProfilesArr, userCopyProfilesArr);

    buildFunctionDiv(differenceBetweenFunctionsArr);
    buildParamsDiv(differenceBetweenParamsArr);
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

function differenceBetweenSingleColumnTables(modelUserArr, copyUserArr){
    const uniqueModelArr = modelUserArr.filter(item => !copyUserArr.some(copyItem => areItensEqual(item, copyItem)));
    return uniqueModelArr;
}

function differenceBetweenDoubleColumnTables(modelUserArr, copyUserArr){
    const modelUserKeysArr = modelUserArr.map(item=> item[0]);
    const modelUserValuesArr = modelUserArr.map(item=>item[1]);

    const copyUserKeysArr = copyUserArr.map(item => item[0]);
    const copyUserValuesArr = copyUserArr.map(item => item[1]);

    const uniqueModelArr = [];
    const sameKeyDiffValues = [];

    for(let i = 0; i < modelUserKeysArr.length; i++){
        if(copyUserKeysArr.includes(modelUserKeysArr[i])){
            const copyItemIndex = copyUserKeysArr.findIndex(item => areItensEqual(modelUserKeysArr[i], item));

            if(modelUserValuesArr[i] !=copyUserValuesArr[copyItemIndex]){
                sameKeyDiffValues.push([modelUserKeysArr[i], modelUserValuesArr[i]]);
            }
        }
        
        if(!copyUserKeysArr.includes(modelUserKeysArr[i])){
            uniqueModelArr.push([modelUserKeysArr[i], modelUserValuesArr[i]]);
        }
    }
    return [uniqueModelArr, sameKeyDiffValues];
}

function areItensEqual(obj1, obj2){
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/*function resultDiv(differenceBetweenFunctionsArr, differenceBetweenParamsArr, differenceBetweenProfilesArr){
    let novaDiv = document.createElement("div");
    novaDiv.id = "nova-div-resultados";

    let resultContainer = document.getElementById("result-container");

    differenceBetweenFunctionsArr.forEach((dados)=>{
        let paragrafo = document.createElement("p");
        paragrafo.textContent = dados;
        novaDiv.appendChild(paragrafo);
    });
    novaDiv.style.backgroundColor = "#013";
    resultContainer.appendChild(novaDiv);

    novaDiv = document.createElement("div");
    differenceBetweenParamsArr.forEach((dados)=>{
        let paragrafo = document.createElement("p");
        paragrafo.textContent = dados;
        novaDiv.appendChild(paragrafo);
    });
    novaDiv.style.backgroundColor = "#257";
    resultContainer.appendChild(novaDiv);


    novaDiv = document.createElement("div");
    differenceBetweenProfilesArr.forEach((dados)=>{
        let paragrafo = document.createElement("p");
        paragrafo.textContent = dados;
        novaDiv.appendChild(paragrafo);
    });
    novaDiv.style.backgroundColor = "#393";
    resultContainer.appendChild(novaDiv);

    resultContainer.style.display = "block";
}*/

function buildFunctionDiv(resultArr){
    let resultContainer = document.getElementById("result-container");
    let resultFunctionsDiv = document.getElementById("result-functions");
    let list = document.createElement("ul");
    let spanMessage = document.createElement("span");
    spanMessage.textContent = "Para igualar o usuário cópia com o modelo você deve adicionar as seguintes funções:";

    resultArr.forEach((resultado)=>{
        let itemLista = document.createElement("li");
        itemLista.textContent = resultado;
        list.appendChild(itemLista);
    });

    resultFunctionsDiv.appendChild(spanMessage);
    resultFunctionsDiv.appendChild(list);
    resultFunctionsDiv.style.display = "block";
    resultContainer.style.display = "block";
}

function buildParamsDiv(arrayBidimensional){
    let resultParamsDiv = document.getElementById("result-params");
    let resultContainer = document.getElementById("result-container");
    let uniqueModelSpan = document.createElement('span');
    let sameKeyDiffValuesSpan = document.createElement('span');

    uniqueModelSpan.textContent = "Para igualar o usuário cópia com o modelo você deve adicionar os seguintes parâmetros:";
    sameKeyDiffValuesSpan.textContent = "Porem, cuidado com estes parâmetros, pois, eles já estão presentes e com valores diferentes:";

    arrayBidimensional.forEach((subArray, index)=>{
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");


        subArray.forEach((item)=>{
            let row = document.createElement("tr");

            item.forEach((value) => {
                let cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        if(index === 0){
            table.id = "uniqueModelArr";
        }else if(index === 1){
            table.id = "sameKeyDiffValues";
        }

        if(index === 0){
            resultParamsDiv.appendChild(uniqueModelSpan);
            resultParamsDiv.appendChild(table);
        }else if(index === 1){
            resultParamsDiv.appendChild(sameKeyDiffValuesSpan);
            resultParamsDiv.appendChild(table);
        }
    });

    resultParamsDiv.style.display = "block";
    resultContainer.style.display = "block";
}
