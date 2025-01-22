const API_BASE_URL = 'https://fakestoreapi.com/products';
const CATEGORY_URL = 'https://fakestoreapi.com/products/categories';
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');
const sortPrice = document.getElementById('sortPrice');
const productList = document.getElementById('productList');
const productCount = document.getElementById('productCount');

let products = [];
let filteredProducts = [];

// Fetch all products and categories on page load
async function initialize() {
  try {
    const productData = await fetch(API_BASE_URL);
    const categoryData = await fetch(CATEGORY_URL);
    products = await productData.json();
    const categories = await categoryData.json();
    populateCategories(categories);
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching data:', error);
    productList.innerHTML = '<p style="color: red;">Failed to fetch products. Please try again later.</p>';
  }
}

// Populate categories in the dropdown
function populateCategories(categories) {
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
}

// Display products dynamically
function displayProducts(productsToDisplay) {
  filteredProducts = productsToDisplay;
  productList.innerHTML = '';
  productCount.textContent = `Showing ${filteredProducts.length} product(s)`;

  if (filteredProducts.length === 0) {
    productList.innerHTML = '<p>No products found.</p>';
    return;
  }

  filteredProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-details">
        <h3>${product.title}</h3>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p><strong>Category:</strong> ${product.category}</p>
      </div>
    `;
    productList.appendChild(productElement);
  });
}

// Apply filters and search
function filterAndSearch() {
  let filtered = [...products];

  // Filter by category
  const category = categoryFilter.value;
  if (category) {
    filtered = filtered.filter(product => product.category === category);
  }

  // Filter by search
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }

  // Sort by price
  const sortValue = sortPrice.value;
  if (sortValue === 'asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

// Event listeners for search, category filter, and sorting
searchInput.addEventListener('input', filterAndSearch);
categoryFilter.addEventListener('change', filterAndSearch);
sortPrice.addEventListener('change', filterAndSearch);

// Initialize the app
initialize();
