const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskTableBody = document.querySelector('#taskTable tbody');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');
const incompleteTasksSpan = document.getElementById('incompleteTasks');
const filterAll = document.getElementById('filterAll');
const filterCompleted = document.getElementById('filterCompleted');
const filterIncomplete = document.getElementById('filterIncomplete');
const sortTasks = document.getElementById('sortTasks');

let tasks = []; // Array to store tasks
let filter = 'all'; // Current filter

// Update the task counters
function updateCounters() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const incompleteTasks = totalTasks - completedTasks;

  totalTasksSpan.textContent = totalTasks;
  completedTasksSpan.textContent = completedTasks;
  incompleteTasksSpan.textContent = incompleteTasks;
}

// Render the task table
function renderTasks() {
  let filteredTasks = tasks;

  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === 'incomplete') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  taskTableBody.innerHTML = ''; // Clear the table

  filteredTasks.forEach((task, index) => {
    const row = document.createElement('tr');
    row.className = task.completed ? 'completed' : '';
    row.dataset.id = task.id;

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${task.text}</td>
      <td>
        <input type="checkbox" ${task.completed ? 'checked' : ''} />
      </td>
      <td>
        <button class="deleteBtn">Delete</button>
      </td>
    `;
    taskTableBody.appendChild(row);
  });

  updateCounters();
}

// Add a new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  taskInput.value = ''; // Clear input
  renderTasks();
});

// Handle task actions (toggle completion, delete task)
taskTableBody.addEventListener('click', (event) => {
  const row = event.target.closest('tr');
  const taskId = row.dataset.id;

  if (event.target.tagName === 'INPUT') {
    // Toggle completion
    tasks = tasks.map(task =>
      task.id == taskId ? { ...task, completed: !task.completed } : task
    );
  } else if (event.target.classList.contains('deleteBtn')) {
    // Delete task
    tasks = tasks.filter(task => task.id != taskId);
  }

  renderTasks();
});

// Filter tasks
filterAll.addEventListener('click', () => {
  filter = 'all';
  renderTasks();
});

filterCompleted.addEventListener('click', () => {
  filter = 'completed';
  renderTasks();
});

filterIncomplete.addEventListener('click', () => {
  filter = 'incomplete';
  renderTasks();
});

// Sort tasks alphabetically
sortTasks.addEventListener('click', () => {
  tasks.sort((a, b) => a.text.localeCompare(b.text));
  renderTasks();
});
