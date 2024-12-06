let currentPage = 1; // Start with the first page
const pageSize = 10; // Number of items per page
const container = document.querySelector('.container'); // The parent element to display items
const paginationControls = document.querySelector('.pagination-controls'); // For page navigation

// Function to fetch data
function fetchData(page) {
    const skip = (page - 1) * pageSize; // Calculate skip value
    fetch(`https://dummyjson.com/products?limit=${pageSize}&skip=${skip}&select=title,price`)
        .then((res) => res.json())
        .then((data) => {
            displayData(data.products);
        })
        .catch((err) => console.error('Error fetching data:', err));
}

// Function to display data
function displayData(products) {
    container.innerHTML = ''; // Clear previous content
    products.forEach((item) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${item.title}</h3>
            <p>Price: $${item.price}</p>
        `;
        container.appendChild(productDiv);
    });
}

// Function to create pagination controls
function createPagination(totalItems) {
    paginationControls.innerHTML = ''; // Clear previous controls
    const totalPages = Math.ceil(totalItems / pageSize);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentPage ? 'active' : '';
        button.addEventListener('click', () => {
            currentPage = i;
            fetchData(currentPage);
            createPagination(totalItems);
        });
        paginationControls.appendChild(button);
    }
}

// Initial fetch to determine total items and set up pagination
fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((data) => {
        const totalItems = data.total; // Total number of items
        createPagination(totalItems); // Set up pagination controls
        fetchData(currentPage); // Fetch and display the first page
    })
    .catch((err) => console.error('Error fetching initial data:', err));
