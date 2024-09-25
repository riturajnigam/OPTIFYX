// Variables
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskAction);

// Add new task
function addTask() {
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const taskItem = createTaskItem(taskValue);
        taskList.appendChild(taskItem);
        saveTaskToLocalStorage(taskValue);
        taskInput.value = ''; // Clear input field
    }
}

// Create task list item
function createTaskItem(taskValue) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskValue}</span>
        <div>
            <button class="complete-btn">✔</button>
            <button class="remove-btn">✖</button>
        </div>
    `;
    return li;
}

// Handle task completion or removal
function handleTaskAction(e) {
    if (e.target.classList.contains('complete-btn')) {
        e.target.parentElement.parentElement.classList.toggle('completed');
    } else if (e.target.classList.contains('remove-btn')) {
        const taskItem = e.target.parentElement.parentElement;
        removeTaskFromLocalStorage(taskItem);
        taskItem.remove();
    }
}

// Save task to localStorage
function saveTaskToLocalStorage(taskValue) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const taskItem = createTaskItem(task);
        taskList.appendChild(taskItem);
    });
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks = getTasksFromLocalStorage();
    const taskText = taskItem.querySelector('span').textContent;
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
