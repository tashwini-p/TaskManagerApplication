let tbody = document.querySelector("tbody");
let priorityFilterSelecter = document.getElementById("priorityFilter");
let statusFilterSelector = document.getElementById("statusFilter");

let deletedTasks=JSON.parse(localStorage.getItem("deletedTasks")) || [];
appendToDeleteTable(deletedTasks);

function createDeletedRow(obj, index){
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    let td4=document.createElement("td");
    let td5=document.createElement("td");

    td1.innerText=obj.title;
    td2.innerText=obj.priority;
    td3.innerText=obj.status;

    if(obj.priority=="low"){
        td2.style.color="rgb(0,128,0)";
    } else if(obj.priority=="medium"){
        td2.style.color="rgb(0,0,255)"
    } else {
        td2.style.color="rgb(255,0,0)"
    }

    //restore button
    let restoreButton=document.createElement("button");
    restoreButton.classList.add("restore-btn");
    restoreButton.innerText="restore";
    td4.append(restoreButton);

    restoreButton.addEventListener("click", ()=>{
        let deletedTasks=JSON.parse(localStorage.getItem("deletedTasks")) || [];
        let taskToRestore=deletedTasks.splice(index, 1);
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(...taskToRestore);
        appendToDeleteTable(deletedTasks);
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));

    })

    //permanently delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerText="delete";
    td5.append(deleteButton);

    deleteButton.addEventListener("click", ()=>{
        let deletedTasks=JSON.parse(localStorage.getItem("deletedTasks")) || [];
        deletedTasks.splice(index, 1);
        appendToDeleteTable(deletedTasks);
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
    })

    tr.append(td1, td2, td3, td4, td5);
    tbody.append(tr);
    return tr;
}

function appendToDeleteTable(data){
    tbody.innerHTML="";
    data.forEach((item, index)=>{
        let tr=createDeletedRow(item, index);
        tbody.append(tr);
    })
}

priorityFilterSelecter.addEventListener("change", ()=>{
    let deletedTasks=JSON.parse(localStorage.getItem("deletedTasks")) || [];
    if(priorityFilterSelecter.value===""){
        appendToDeleteTable(deletedTasks);
    } else {
        let arr = deletedTasks.filter(item=>{
            if(item.priority===priorityFilterSelecter.value){
                return true;
            }
        })
        appendToDeleteTable(arr);
    }
})

statusFilterSelector.addEventListener("change", ()=>{
    let deletedTasks=JSON.parse(localStorage.getItem("deletedTasks")) || [];
    if(statusFilterSelector.value===""){
        appendToDeleteTable(deletedTasks);
    } else {
        let arr2 = deletedTasks.filter(item=>{
            if(item.status===statusFilterSelector.value){
                return true;
            }
        })
        appendToDeleteTable(arr2);
    }
})

// function applyFilter(deletedTasks){
//     let priorityFilter=priorityFilterSelecter.value;
//     let statusFilter=statusFilterSelector.value;

//     tbody.innerHTML="";

//     deletedTasks.forEach((item, index)=>{
//         let PM = priorityFilter==="" || item.priority=== priorityFilter;
//         let SM = statusFilter==="" || item.status === statusFilter;
//         if(PM && SM){
//             createDeletedRow(item, index);
//         }
//     })

// }