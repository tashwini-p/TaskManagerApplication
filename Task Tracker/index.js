let taskNameInput = document.getElementById("taskName");
let prioritySelect = document.getElementById("priority");
let submitBtn = document.getElementById("submitBtn");
let tbody = document.querySelector("tbody");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
appendData(tasks);

submitBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let taskItem = {
        title: taskNameInput.value,
        priority : prioritySelect.value,
        status: "pending"
    }

    if(taskItem.title=="" || taskItem.priority==""){
        alert("Task cannot be empty!");
        return;
    }

    console.log(taskItem);
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskItem);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    appendData(tasks);
})

function createRow(obj, index){
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    let td4=document.createElement("td");

    td1.innerText=obj.title;
    td2.innerText=obj.priority;

    if(obj.priority=="low"){
        td2.style.color="rgb(0,128,0)";
    } else if(obj.priority=="medium"){
        td2.style.color="rgb(0,0,255)"
    } else {
        td2.style.color="rgb(255,0,0)"
    }
    
    //status button
    let statusButton = document.createElement("button");
    statusButton.classList.add("toggleStatus");
    statusButton.innerText=obj.status;
    td3.append(statusButton);

    if(obj.status=="pending"){
        statusButton.style.backgroundColor="rgb(255, 165, 0)";
    } else if(obj.status=="in-progress"){
        statusButton.style.backgroundColor="rgb(76, 175, 80)"
    } else {
        statusButton.style.backgroundColor="rgb(255, 192, 203)"
    }

    statusButton.addEventListener("click", ()=>{
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        if(statusButton.innerText==="pending"){
            tasks[index] = {...obj, status: "in-progress"};
        } else if(statusButton.innerText==="in-progress"){
            tasks[index] = {...obj, status: "complete"};
        } else {
            tasks[index] = {...obj, status: "pending"};
            // statusButton.style.backgroundColor=""
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
        appendData(tasks);
    })

    //remove button
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.innerText="remove";
    td4.append(removeButton);

    removeButton.addEventListener("click", ()=>{
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let taskToRemove= tasks.splice(index, 1);
        let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
        deletedTasks.push(...taskToRemove);
        appendData(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
    })

    tr.append(td1, td2, td3, td4);
    return tr; 
}


function appendData(data){
    tbody.innerHTML="";
    data.forEach((item, index) => {
        let tr= createRow(item, index);
        tbody.append(tr);
    });
}