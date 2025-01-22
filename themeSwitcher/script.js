const themeSelector = document.getElementById('themeSelector');
const body = document.body;

// Function to apply a theme
function applyTheme(theme) {
  body.className = ''; // Clear any existing theme
  body.classList.add(`theme-${theme}`);
  sessionStorage.setItem('selectedTheme', theme);
}

// Check sessionStorage for the saved theme on page load
window.addEventListener('load', () => {
  const savedTheme = sessionStorage.getItem('selectedTheme') || 'light'; // Default to 'light'
  themeSelector.value = savedTheme;
  applyTheme(savedTheme);
});

// Change theme dynamically when the dropdown value changes
themeSelector.addEventListener('change', (event) => {
  const selectedTheme = event.target.value;
  applyTheme(selectedTheme);
});
