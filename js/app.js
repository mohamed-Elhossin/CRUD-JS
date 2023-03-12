let title = document.getElementById("title");
let cost = document.querySelectorAll("#cost input");
let count = document.getElementById("count");
let department = document.getElementById("department");
let btnCreate = document.getElementById("btnCreate")
let tableBody = document.getElementById("tableBody");
let deleteAllBtn = document.getElementById("deleteAllBtn");
let spanDeleteBtn = document.getElementById("spanDeleteBtn");

let mood = "create";
let globalID;
// All Data in local
let allData;
if (localStorage.product != null) {
    allData = JSON.parse(localStorage.product);
} else {
    allData = [];
}

// =========== Get Total Function =======
let getTotal = () => {
    let price = cost[0].value,
        tax = cost[1].value,
        tCost = cost[2].value,
        discound = cost[3].value;

    let getTotalValue = (+price + +tax + +tCost) - discound
    cost[4].value = Math.ceil(getTotalValue);
}
for (let i = 0; i < cost.length; i++) {
    cost[i].addEventListener('keyup', getTotal)
}

// create New object 
let createObject = () => {
    let newData = {
        title: title.value,
        price: cost[0].value,
        tax: cost[1].value,
        Tcost: cost[2].value,
        discound: cost[3].value,
        total: cost[4].value,
        count: count.value,
        department: department.value
    }

    if (mood == "create") {
        if (newData.count > 1) {
            for (let i = 0; i < newData.count; i++) {
                allData.push(newData);
            }
        } else {
            allData.push(newData);
        }
    } else {
        allData[globalID] = newData;
        mood = "create";
        btnCreate.innerHTML = "Create";
        btnCreate.classList.replace("btn-warning", "btn-info");
        count.classList.remove("none");
    }



    localStorage.setItem("product", JSON.stringify(allData));

    showData();
    clearInputs();
}

// Show Data
let showData = () => {
    let table = '';
    for (let i = 0; i < allData.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${allData[i].title}</td>
        <td>${allData[i].price}</td>
        <td>${allData[i].tax}</td>
        <td>${allData[i].Tcost}</td>
        <td>${allData[i].discound}</td>
        <td>${allData[i].total}</td>
        <td>${allData[i].department}</td>
        <td> <button onclick='deleteItem(${i})' class='btn btn-danger'> Remove </button>  </td>
        <td> <button onclick='updateData(${i})'  class='btn btn-primary'> Update </button>  </td>
        </tr>`;
    }

    if (allData.length > 0) {
        deleteAllBtn.classList.remove("none");
        spanDeleteBtn.innerHTML = allData.length;
    } else {
        deleteAllBtn.classList.add("none");
    }
    tableBody.innerHTML = table;
}
showData();
btnCreate.addEventListener("click", createObject);

// Clear Inputs 
let clearInputs = () => {
    title.value = ""
    cost[0].value = ""
    cost[1].value = ""
    cost[2].value = ""
    cost[3].value = ""
    cost[4].value = ""
    count.value = ""
    department.value = ""
}

// Delete One Item
let deleteItem = (i) => {
    allData.splice(i, 1)
    localStorage.product = JSON.stringify(allData);
    showData();
}

// Delete all Item
let deleteAllItems = () => {
    localStorage.clear();
    allData.splice(0);
    showData();
}
deleteAllBtn.addEventListener('click', deleteAllItems);
let updateData = (i) => {
    mood = "update"
    title.value = allData[i].title
    cost[0].value = allData[i].price
    cost[1].value = allData[i].tax
    cost[2].value = allData[i].Tcost
    cost[3].value = allData[i].discound
    cost[4].value = allData[i].total
    department.value = allData[i].department
    globalID = i;
    count.classList.add("none");
    btnCreate.innerHTML = "Update";
    btnCreate.classList.replace("btn-info", "btn-warning")
}







