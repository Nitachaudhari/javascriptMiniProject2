const products = [
    { name: 'Phone', price: 800, category: 'electronics' },
    { name: 'Laptop', price: 1500, category: 'electronics' },
    { name: 'Tablet', price: 400, category: 'electronics' },
    { name: 'Chair', price: 200, category: 'furniture' },
    { name: 'Sofa', price: 700, category: 'furniture' },
    { name: 'Desk', price: 300, category: 'furniture' }
];

const productList = document.getElementById('productList');
const filterCategory = document.getElementById('filterCategory');
const sortOption = document.getElementById('sortOption');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const currentPageDisplay = document.getElementById('currentPage');

let filteredProducts = [...products];
let currentPage = 1;
const productsPerPage = 3;

function displayProducts() {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToDisplay = filteredProducts.slice(start, end);

    productList.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
        `;
        productList.appendChild(productItem);
    });

    currentPageDisplay.textContent = currentPage;
}

function filterAndSortProducts() {
    const category = filterCategory.value;
    const sort = sortOption.value;

    filteredProducts = products.filter(product => category === 'all' || product.category === category );

    if (sort === 'name-asc') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    currentPage = 1; 
    displayProducts();
}

function updatePaginationControls() {
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage * productsPerPage >= filteredProducts.length;
}

filterCategory.addEventListener('change', () => {
    filterAndSortProducts();
    updatePaginationControls();
});

sortOption.addEventListener('change', () => {
    filterAndSortProducts();
    updatePaginationControls();
});

prevPage.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
        updatePaginationControls();
    }
});

nextPage.addEventListener('click', () => {
    if (currentPage * productsPerPage < filteredProducts.length) {
        currentPage++;
        displayProducts();
        updatePaginationControls();
    }
});

filterAndSortProducts();
updatePaginationControls();
