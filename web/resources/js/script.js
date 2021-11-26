const form = document.getElementById("transactionForm");

form.addEventListener("submit", function(event){
        event.preventDefault();
        let transactionFormData = new FormData(form);
        let transactionObj = convertFormDataToTransactionObject(transactionFormData);
        saveTransactionObj(transactionObj);
        insertRowInTransactionTable(transactionObj);
        form.reset();
    }
)

document.addEventListener("DOMContentLoaded", function(event) {
    insertDefaultCategories()
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    transactionObjArr.forEach (
        function(arrayElement){
            insertRowInTransactionTable(arrayElement)
        }
    )
})

function getNewTransactionID() {
    let lastTransactionID = localStorage.getItem("lastTransactionID") || "-1";
    let newTransactionID = JSON.parse(lastTransactionID) + 1;
    localStorage.setItem("lastTransactionID", JSON.stringify(newTransactionID));
    return newTransactionID;
}

function convertFormDataToTransactionObject(transactionFormData){
    let transactionType = transactionFormData.get("transactionType");
    let transactionDescription = transactionFormData.get("transactionDescription");
    let transactionAmount = transactionFormData.get("transactionAmount");
    let transactionCategory = transactionFormData.get("transactionCategory");
    let transactionID = getNewTransactionID();
    return {
        "transactionType" : transactionType, 
        "transactionDescription" : transactionDescription, 
        "transactionAmount" : transactionAmount, 
        "transactionCategory" : transactionCategory,
        "transactionID" : transactionID,
    }
}

function insertRowInTransactionTable(transactionObj){
    let transactionTableRef = document.getElementById("transactionTable");

    let newTransactionRowRef = transactionTableRef.insertRow(-1);
    newTransactionRowRef.setAttribute("data-transaction-ID", transactionObj["transactionID"])

    let newTypeCellRef = newTransactionRowRef.insertCell(0);
    newTypeCellRef.textContent = transactionObj["transactionType"];

    newTypeCellRef = newTransactionRowRef.insertCell(1);
    newTypeCellRef.textContent = transactionObj["transactionDescription"];

    newTypeCellRef = newTransactionRowRef.insertCell(2);
    newTypeCellRef.textContent = transactionObj["transactionAmount"];

    newTypeCellRef = newTransactionRowRef.insertCell(3);
    newTypeCellRef.textContent = transactionObj["transactionCategory"];

    let newDeleteCell = newTransactionRowRef.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
            newDeleteCell.appendChild(deleteButton)

    deleteButton.addEventListener("click",  (event) => {
        let transactionRow = event.target.parentNode.parentNode;
        let transactionID = transactionRow.getAttribute("data-transaction-ID");
        transactionRow.remove();
        deleteTransactionObj(transactionID);
    })
}

function deleteTransactionObj(transactionID){
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
    let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionID == transactionID);
    transactionObjArr.splice(transactionIndexInArray, 1);
    let transactionObjJSON = JSON.stringify(transactionObjArr);
    localStorage.setItem("transactionData" , transactionObjJSON)
}

function saveTransactionObj(transactionObj){
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(transactionObj);
    let transactionObjJSON = JSON.stringify(myTransactionArray);
    localStorage.setItem("transactionData" , transactionObjJSON)
}

function insertIncomeCategory(categoryName){
    const selectElement =  document.getElementById ('incomeTransaction');
    let htmltoInsert = `<option value="${categoryName}">${categoryName}</option>`;
    selectElement.insertAdjacentHTML("beforeend", htmltoInsert)
}

function insertExpenseCategory(categoryName){
    const selectElement = document.getElementById ('expenseTransaction');
    let htmltoInsert = `<option value="${categoryName}">${categoryName}</option>`;
    selectElement.insertAdjacentHTML("beforeend", htmltoInsert)
}

function insertDefaultCategories(){
    let defaultIncomeCategories = [
        "Sueldo/fijo", "Sueldo/freelance", "Otros/Ingresos"
    ]
    for (let index =0; index < defaultIncomeCategories.length; index++){
        insertIncomeCategory(defaultIncomeCategories[index])
    }
    let defaultExpenseCategories = [
        "Alquiler", "Comida", "Gustos/Ocio", "Higiene", "Otros/Egresos"
    ]
    for (let index =0; index < defaultExpenseCategories.length; index++){
        insertExpenseCategory(defaultExpenseCategories[index])
    }
}