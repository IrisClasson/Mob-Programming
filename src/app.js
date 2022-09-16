// live reload on save
// npm install reload -g --save-dev
// reload -b in index.html folder

//Event handling
var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");

//New task list item
var createNewTaskElement=function(taskString){
	var listItem=document.createElement("li");
	var checkBox=document.createElement("input");
	var label=document.createElement("label");
	var editInput=document.createElement("input");
	var editButton=document.createElement("button");
	var deleteButton=document.createElement("button");
	label.innerHTML=taskString;
	checkBox.type="checkbox";
	editInput.type="text";
	editButton.innerText="Edit";
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

var addTask=function(){
	var listItem=createNewTaskElement(taskInput.value);
	console.log("Log entry:");
	console.log(listItem);

	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value="";
}

var editTask=function(){
    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editButton = listItem.querySelector("")
    var isInEditMode=listItem.classList.contains("editMode");
    if(isInEditMode){

        label.innerText=editInput.value;
    }else{
        editInput.value=label.innerText;
    }
    listItem.classList.toggle("editMode");
}

var deleteTask=function(){
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);
}

var taskCompleted=function(){
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
    var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

addButton.addEventListener("click",addTask);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");
    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}