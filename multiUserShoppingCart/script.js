// Initialize cart and login functionality
let currentUser = null;

// Function to login the user
function login() {
  const username = document.getElementById('username').value.trim();
  if (username === '') {
    document.getElementById('loginError').textContent = 'Username cannot be empty';
    return;
  }

  // Check if user already exists in localStorage
  if (!localStorage.getItem(username)) {
    localStorage.setItem(username, JSON.stringify([])); // Initialize empty cart
  }

  currentUser = username;
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('cartSection').style.display = 'block';
  document.getElementById('welcomeMessage').textContent = username;

  loadCart();
}

// Function to load user's cart
function loadCart() {
  const cartData = JSON.parse(localStorage.getItem(currentUser)) || [];
  updateCartUI(cartData);
}

// Function to update the cart UI
function updateCartUI(cartData) {
  const cartBody = document.getElementById('cartBody');
  cartBody.innerHTML = '';
  let totalCost = 0;

  cartData.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.itemName}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" /></td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;
    cartBody.appendChild(row);
    totalCost += item.price * item.quantity;
  });

  document.getElementById('totalCost').textContent = `Total: $${totalCost.toFixed(2)}`;
}

// Function to show the modal for adding an item
function showAddItemForm() {
  document.getElementById('addItemModal').style.display = 'block';
}

// Function to cancel and hide the modal
function cancelAddItemForm() {
  document.getElementById('addItemModal').style.display = 'none';
}

// Function to handle the form submission for adding an item
document.getElementById('itemForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const itemName = document.getElementById('itemName').value.trim();
  const itemPrice = parseFloat(document.getElementById('itemPrice').value);
  const itemQuantity = parseInt(document.getElementById('itemQuantity').value, 10);

  if (itemName && itemPrice > 0 && itemQuantity > 0) {
    const cartData = JSON.parse(localStorage.getItem(currentUser)) || [];
    const item = { itemName, price: itemPrice, quantity: itemQuantity };
    cartData.push(item);
    localStorage.setItem(currentUser, JSON.stringify(cartData));
    loadCart();
    cancelAddItemForm(); // Close the modal and show the updated cart
  } else {
    alert('Please enter valid item details.');
  }
});

// Function to update item quantity
function updateQuantity(index, quantity) {
  const cartData = JSON.parse(localStorage.getItem(currentUser)) || [];
  cartData[index].quantity = parseInt(quantity, 10);
  localStorage.setItem(currentUser, JSON.stringify(cartData));
  loadCart();
}

// Function to remove an item from the cart
function removeItem(index) {
  const cartData = JSON.parse(localStorage.getItem(currentUser)) || [];
  cartData.splice(index, 1);
  localStorage.setItem(currentUser, JSON.stringify(cartData));
  loadCart();
}

// Function to logout
function logout() {
  currentUser = null;
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('cartSection').style.display = 'none';
}
