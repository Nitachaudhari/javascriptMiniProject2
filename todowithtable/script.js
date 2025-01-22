// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const searchInput = document.getElementById('searchInput');
const taskTable = document.getElementById('taskTable').querySelector('tbody');

// Get tasks from localStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the table
function renderTasks(filteredTasks = tasks) {
  taskTable.innerHTML = '';
  filteredTasks.forEach(task => {
    const row = document.createElement('tr');
    row.setAttribute('data-id', task.id);

    // Determine status and apply color
    const statusClass = task.completed ? 'status-completed' : 'status-incomplete';
    const statusText = task.completed ? 'Completed' : 'Incomplete';

    row.innerHTML = `
      <td class="${task.completed ? 'completed' : ''}">${task.text}</td>
      <td class="${statusClass}">${statusText}</td>
      <td class="actions">
        <button class="toggle-btn">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
    taskTable.appendChild(row);
  });
}

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert('Please enter a task.');
    return;
  }

  const newTask = {
    id: Date.now().toString(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = '';
}

// Toggle task completion
function toggleTaskCompletion(taskId) {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// Delete a task
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  renderTasks();
}

// Filter tasks based on search input
function filterTasks(searchTerm) {
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderTasks(filteredTasks);
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);

taskTable.addEventListener('click', e => {
  const parentRow = e.target.closest('tr');
  const taskId = parentRow.getAttribute('data-id');

  if (e.target.classList.contains('toggle-btn')) {
    toggleTaskCompletion(taskId);
  } else if (e.target.classList.contains('delete-btn')) {
    deleteTask(taskId);
  }
});

searchInput.addEventListener('input', e => {
  filterTasks(e.target.value);
});

// Initial render
renderTasks();
