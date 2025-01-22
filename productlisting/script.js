const API_URL = 'https://fakestoreapi.com/products';

const productGrid = document.getElementById('product-grid');
const errorMessage = document.getElementById('error-message');

// Function to fetch and display products
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await response.json();

    // Display products
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    displayError('Failed to fetch products. Please try again later.');
  }
}

// Function to display products in the grid
function displayProducts(products) {
  // Clear any previous error messages
  errorMessage.textContent = '';

  // Iterate through the products and create product cards
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product';

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
      <button onclick="viewDetails('${product.title}', '${product.description}')">View Details</button>
    `;

    productGrid.appendChild(productCard);
  });
}

// Function to handle "View Details" button click
function viewDetails(title, description) {
  alert(`Product: ${title}\n\nDescription: ${description}`);
}

// Function to display an error message
function displayError(message) {
  errorMessage.textContent = message;
}

// Fetch and display products when the page loads
fetchProducts();
