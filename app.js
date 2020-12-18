//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
   //DOM Load event
   document.addEventListener('DOMContentLoaded', getTasks);
   //Add task event
   form.addEventListener('submit', addTask);
   //Remove task event
   taskList.addEventListener('click', removeTask);
   //Clear task event
   clearBtn.addEventListener('click', clearTask);
   //Filter task event 
   filter.addEventListener('keyup', filterTasks);
}

//Get tasks from Local storage
function getTasks() {
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   }else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   };

   tasks.forEach(function(task){
      const li = document.createElement('li');
      //Add a class
      li.className = 'collection-item';
      //Create Text node and append to the li
      li.appendChild(document.createTextNode(taskInput.value));

      //Create new link element
      const link = document.createElement('a');
      //Add class
      link.className = 'delete-item secondary-content';
      //Add icon HTML
      link.innerHTML = '<i class = "fa fa-remove"></i>';
      //Append the link to the li
      li.appendChild(link);

      //Append the li to the ul
      taskList.appendChild(li);
   })
}

//Add Task function
function addTask(e){
   if(taskInput.value === ''){
      alert('Add a task');
   }

   //Create Li element
   const li = document.createElement('li');
   //Add a class
   li.className = 'collection-item';
   //Create Text node and append to the li
   li.appendChild(document.createTextNode(taskInput.value));

   //Create new link element
   const link = document.createElement('a');
   //Add class
   link.className = 'delete-item secondary-content';
   //Add icon HTML
   link.innerHTML = '<i class = "fa fa-remove"></i>';
   //Append the link to the li
   li.appendChild(link);

   //Append the li to the ul
   taskList.appendChild(li);

   //Store task in Local Storage
   storeTaskinLocalStorage(taskInput.value)

   //Clear Input
   taskInput.value = '';


   e.preventDefault();
}

//Store Task
function storeTaskinLocalStorage(task){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   }else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.push(task);

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task function
function removeTask(e){
   if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are you sure?')){
         e.target.parentElement.parentElement.remove();

         //Remove Local Storage
         removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
   } 
}

//Remove from LS
function removeTaskFromLocalStorage(){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   }else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   task.forEach(function(task, index){
      if(taskItem.textContent === task){
         tasks.splice(index, 1);
      }
   })

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks function
function clearTask(e){
   //taskList.innerHTML = '';

   //faster method
   while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
   }

   //Clear from LS
   clearTasksFromLocalStorage()
}

//Clear Tasks from LS
function clearTasksFromLocalStorage() {
   localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach(
      function(task){
         const item = task.firstChild.textContent;
         if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
         }else{
            task.style.display = 'none';
         }
      }
   )
}