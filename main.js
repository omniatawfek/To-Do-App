let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let array = [];

if(localStorage.getItem("tasks")){
    array = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromStorage();

add.onclick = function(){
    if(input.value !== "")
    {
        addTasksToArray(input.value);
        input.value = "";
    }
};

tasks.addEventListener("click",function(e){
if(e.target.classList.contains("del")){
    e.target.parentElement.remove();
    removeTaskFromStorage(e.target.parentElement.getAttribute("data-id"));
}
if (e.target.classList.contains("task")){
    e.target.classList.toggle("done");
    toggleTask(e.target.getAttribute("data-id"));
}
});

    function addTasksToArray(taskText){
    const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
    };
    array.push(task);
    addArrayToPage(array);
    addTasksToStorsge(array);
    }

function addArrayToPage(array){
tasks.innerHTML = "";
array.forEach((task) => {
    let div = document.createElement("div");
    div.className = task.completed ? "task done": "task";
    div.setAttribute("data-id",task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasks.appendChild(div);
});
}

function addTasksToStorsge(array){
window.localStorage.setItem("tasks",JSON.stringify(array));
}

function getDataFromStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        array = JSON.parse(data);
        addArrayToPage(array);
    }
}

function removeTaskFromStorage(taskId){
array = array.filter((task) => task.id != taskId )
addTasksToStorsge(array);
}

function toggleTask(taskId) {
    array.forEach(task => {
        if(task.id === +taskId)
            task.completed == !task.completed;
    });
    addTasksToStorsge(array);
}

let search = document.querySelector("[type = search]");

search.addEventListener("input" ,function(e){
let searchContent = e.target.value.toLowerCase();
let allTasks = document.querySelectorAll(".tasks .task");

allTasks.forEach(task => {
    let taskContent = task.textContent.toLowerCase();

if(taskContent.includes(searchContent)){
task.classList.remove("hide");
}
else
task.classList.add("hide");
});
});