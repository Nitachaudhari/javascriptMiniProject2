let users = [];
let currentPage = 1;
const usersPerPage = 5;

const fetchUsers = async () => {
  const url = 'https://practice-9b2ec-default-rtdb.firebaseio.com/users.json';  
  try {
    const response = await fetch(url);
    const data = await response.json();
    users = Object.values(data);  // Convert object to array
    loadUsers();  // Load the users after fetching data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Load users based on search and filter criteria
const loadUsers = () => {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const emailDomain = document.getElementById('email-domain-filter').value;
  
  // Filter users based on search query and email domain
  const filteredUsers = users.filter(user => {
    const matchesName = user.name.toLowerCase().includes(searchQuery);
    const matchesEmailDomain = emailDomain ? user.email.includes(emailDomain) : true;
    return matchesName && matchesEmailDomain;
  });
  
  // Paginate the filtered users
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Update the user list
  displayUsers(paginatedUsers);

  // Update pagination info and button visibility
  updatePagination(filteredUsers.length, totalPages);
};

// Display users in the list
const displayUsers = (users) => {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';  // Clear previous list
  users.forEach(user => {
    const userElement = document.createElement('li');
    userElement.textContent = `${user.name} - ${user.email}`;
    userList.appendChild(userElement);
  });
};

// Update pagination controls based on the total users and pages
const updatePagination = (totalUsers, totalPages) => {
  const pageInfo = document.getElementById('page-info');
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  // Disable or enable buttons based on the current page
  document.getElementById('prev-btn').disabled = currentPage <= 1;
  document.getElementById('next-btn').disabled = currentPage >= totalPages;
};

// Change page when the next/previous button is clicked
const changePage = (direction) => {
  currentPage += direction;
  loadUsers();  // Reload users for the new page
};

fetchUsers();
