var root = document.querySelector(':root');
var container = document.querySelector('.container');
var newTaskInput = document.getElementById('new_task_input');
var taskform = document.getElementById('new_task_form');
var tasksList = document.getElementById('tasksList');
var themeBtn = document.querySelector('.theme_toggle_btn');
var clearAllTasksBtn = document.getElementById('clear_all_tasks_btn');
var editTaskModal = document.getElementById('editTaskModal');
var closeModalBtn = document.querySelector('.close-btn');
var editTaskForm = document.getElementById('edit_task_form');
var editTaskInput = document.getElementById('edit_task_input');
var editTaskDescription = document.getElementById('edit_task_description');
var currentEditTaskItem = null;

// Do this when we submit the form
taskform.addEventListener('submit', function (e) {
    e.preventDefault();
    var newtaskInputValue = taskform.elements.new_task_input;
    addTask(newtaskInputValue.value);
    newtaskInputValue.value = '';
    container.classList.remove('task_list_empty');
});

// To add task in List
function addTask(newTask) {
    const newTaskItem = document.createElement('li');
    newTaskItem.setAttribute('class', 'task_item');

    const newCheckBtn = document.createElement('div');
    newCheckBtn.setAttribute('class', 'task_check_btn');

    const newTaskBio = document.createElement('span');
    newTaskBio.setAttribute('class', 'task_bio');
    newTaskBio.innerText = newTask;

    const newTaskDescription = document.createElement('span');
    newTaskDescription.setAttribute('class', 'task_description');
    newTaskDescription.innerText = '';

    const editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'edit_btn');
    editBtn.innerText = 'Edit';

    tasksList.appendChild(newTaskItem);
    newTaskItem.appendChild(newCheckBtn);
    newTaskItem.appendChild(newTaskBio);
    newTaskItem.appendChild(newTaskDescription);
    newTaskItem.appendChild(editBtn);

    onTaskComplete(newCheckBtn);
    editBtn.addEventListener('click', () => openEditTaskModal(newTaskItem, newTaskBio, newTaskDescription));
}

// To remove the completed task
function onTaskComplete(btn) {
    btn.addEventListener('click', function (e) {
        var parent = e.target.parentElement;
        parent.classList.add('task-completed');
        setTimeout(() => {
            parent.remove();
            if (tasksList.childNodes.length == 0) {
                container.classList.add('task_list_empty');
            }
        }, 400);
    });
}

// Open Edit Task Modal
function openEditTaskModal(taskItem, taskBio, taskDescription) {
    currentEditTaskItem = taskItem;
    editTaskInput.value = taskBio.innerText;
    editTaskDescription.value = taskDescription.innerText;
    editTaskModal.style.display = 'block';
}

// Close Modal
closeModalBtn.addEventListener('click', function () {
    editTaskModal.style.display = 'none';
});

// Save changes on task edit
editTaskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var taskBio = currentEditTaskItem.querySelector('.task_bio');
    var taskDescription = currentEditTaskItem.querySelector('.task_description');
    taskBio.innerText = editTaskInput.value;
    taskDescription.innerText = editTaskDescription.value;
    editTaskModal.style.display = 'none';
});

// Clear all tasks
clearAllTasksBtn.addEventListener('click', function () {
    while (tasksList.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
    }
    container.classList.add('task_list_empty');
});

// Dark mode
themeBtn.addEventListener('click', function () {
    var darkTheme = themeBtn.classList.toggle('dark');
    if (darkTheme) {
        root.style.setProperty('--theme-transition', '1s');
        root.style.setProperty('--primary-color', '#1E1E1E');
        root.style.setProperty('--secondary-color', '#3B3B3B');
        root.style.setProperty('--text-color', '#EAEAEA');
        root.style.setProperty('--task-color', '#3B3B3B');
        root.style.setProperty('--footer-bg-color', '#3B3B3B');
        root.style.setProperty('--footer-text-color', '#EAEAEA');
        root.style.setProperty('--theme-btn', `url('assets/Light-theme-btn.svg')`);
        root.style.setProperty('--container-bg', `url('./assets/Dark-empty.svg')`);
        root.style.setProperty('--filter', 'invert()');
        root.style.setProperty('--bg-color', '#1E1E1E');
        root.style.setProperty('--clear-btn-bg', '#3B3B3B');
        root.style.setProperty('--clear-btn-text', '#EAEAEA');
    } else {
        root.style.setProperty('--theme-transition', '1s');
        root.style.setProperty('--primary-color', 'white');
        root.style.setProperty('--secondary-color', '#1E1E1E');
        root.style.setProperty('--text-color', 'black');
        root.style.setProperty('--task-color', 'white');
        root.style.setProperty('--footer-bg-color', '#1E1E1E');
        root.style.setProperty('--footer-text-color', 'white');
        root.style.setProperty('--theme-btn', `url('assets/Dark-theme-btn.svg')`);
        root.style.setProperty('--container-bg', `url('./assets/Light-empty.svg')`);
        root.style.setProperty('--filter', 'none');
        root.style.setProperty('--bg-color', '#f0f0f0');
        root.style.setProperty('--clear-btn-bg', '#1E1E1E');
        root.style.setProperty('--clear-btn-text', 'white');
    }
});
