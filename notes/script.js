const notesArea = document.getElementById('notesArea');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const messageDiv = document.getElementById('message');

// Helper function to show messages
function showMessage(message, color = '#555') {
  messageDiv.textContent = message;
  messageDiv.style.color = color;
  setTimeout(() => {
    messageDiv.textContent = '';
  }, 3000);
}

// Load notes from localStorage on page load
window.addEventListener('load', () => {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    notesArea.value = savedNotes;
    showMessage('Notes loaded from localStorage.', '#007bff');
  }
});

// Save notes to localStorage
saveBtn.addEventListener('click', () => {
  const notes = notesArea.value.trim();
  if (!notes) {
    showMessage('Cannot save empty notes.', '#f44336');
    return;
  }
  localStorage.setItem('notes', notes);
  showMessage('Notes saved successfully!', '#4caf50');
});

// Load notes from localStorage
loadBtn.addEventListener('click', () => {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    notesArea.value = savedNotes;
    showMessage('Notes loaded from localStorage.', '#007bff');
  } else {
    showMessage('No saved notes found.', '#f44336');
  }
});

// Clear notes from localStorage
clearBtn.addEventListener('click', () => {
  localStorage.removeItem('notes');
  notesArea.value = '';
  showMessage('Notes cleared from localStorage.', '#f44336');
});
