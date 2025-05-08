document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {

    const newTaskInput = document.getElementById('new-task');

    const taskList = document.getElementById('task-list');

    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {

        const newTask = {

            text: taskText,

            completed: false

        };

        let tasks = getTasks();

        tasks.push(newTask);

        saveTasks(tasks);

        renderTasks();

        newTaskInput.value = '';

    }

}

function toggleComplete(index) {

    let tasks = getTasks();

    tasks[index].completed = !tasks[index].completed;

    saveTasks(tasks);

    renderTasks();

}

function deleteTask(index) {

    let tasks = getTasks();

    tasks.splice(index, 1);

    saveTasks(tasks);

    renderTasks();

}

function renderTasks() {

    const taskList = document.getElementById('task-list');

    taskList.innerHTML = '';

    const tasks = getTasks();

    tasks.forEach((task, index) => {

        const listItem = document.createElement('li');

        const checkbox = document.createElement('input');

        checkbox.type = 'checkbox';

        checkbox.checked = task.completed;

        checkbox.onchange = () => toggleComplete(index);

        const taskSpan = document.createElement('span');

        taskSpan.textContent = task.text;

        if (task.completed) {

            taskSpan.classList.add('completed');

        }

        const deleteButton = document.createElement('button');

        deleteButton.textContent = 'Remover';

        deleteButton.onclick = () => deleteTask(index);

        listItem.appendChild(checkbox);

        listItem.appendChild(taskSpan);

        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);

    });

}

function getTasks() {

    const storedTasks = localStorage.getItem('tasks');

    return storedTasks ? JSON.parse(storedTasks) : [];

}

function saveTasks(tasks) {

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function loadTasks() {

    renderTasks();

}

