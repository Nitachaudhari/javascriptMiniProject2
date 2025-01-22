// URL of the JSONPlaceholder API
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Reference to the unordered list in the DOM
const userList = document.getElementById('user-list');

// Function to fetch and display user data
async function fetchUsers() {
  try {
    // Fetch data from the API
    const response = await fetch(API_URL);
    const users = await response.json();

    // Dynamically create list items for each user
    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = user.name;

      // Add a click event listener to display the email
      listItem.addEventListener('click', () => {
        alert(`Email: ${user.email}`);
      });

      // Append the list item to the unordered list
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Call the function to fetch and display users
fetchUsers();
