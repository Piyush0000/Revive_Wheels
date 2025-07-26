import { vehicleAccessoriesData } from '../data/vehicleAccessoriesData.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('sell-buy');
    const cartIcon = document.getElementById('cart-icon');
    const cartItemCount = document.getElementById('cart-item-count');
    const modal = document.getElementById('checkout-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalElement = document.getElementById('cart-total');
    const proceedToPayButton = document.getElementById('proceed-to-pay-button');
    const categoryContainer = document.querySelector('.categories');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    let cart = [];
    let currentCategory = 'All';
    let currentSearchTerm = '';

    // --- RENDER PRODUCTS ---
    function renderProducts() {
        container.innerHTML = ''; // Clear existing items

        const filteredData = vehicleAccessoriesData.filter(product => {
            const matchesCategory = currentCategory === 'All' || product.category === currentCategory;
            const matchesSearch = product.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredData.length === 0) {
            container.innerHTML = '<p>No products found.</p>';
            return;
        }

        filteredData.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.price}</h5>
                    <p class="card-text">${product.name}</p>
                    <span>${product.description}</span>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // --- CART LOGIC ---
    function addToCart(productId) {
        const productToAdd = vehicleAccessoriesData.find(p => p.id === productId);
        if (productToAdd) {
            cart.push(productToAdd);
            updateCart();
        }
    }

    function removeFromCart(productId) {
        const indexToRemove = cart.findIndex(p => p.id === productId);
        if (indexToRemove > -1) {
            cart.splice(indexToRemove, 1);
            updateCart();
        }
    }

    function updateCart() {
        cartItemCount.textContent = cart.length;
        renderCartItemsInModal();
    }
    
    // --- MODAL LOGIC ---
    function renderCartItemsInModal() {
        cartItemsList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalElement.textContent = 'Total: ₹0';
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsList.appendChild(itemElement);
            total += parseInt(item.price.replace(/[^0-9]/g, ''));
        });

        cartTotalElement.textContent = `Total: ₹${total.toLocaleString('en-IN')}`;
    }

    function openModal() {
        renderCartItemsInModal();
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // --- EVENT LISTENERS ---
    container.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = event.target.dataset.id;
            addToCart(productId);
        }
    });

    cartIcon.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn')) {
            const productId = event.target.dataset.id;
            removeFromCart(productId);
        }
    });
    
    proceedToPayButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before proceeding.");
            return;
        }
        alert("Thank you for your order! You will now be redirected to the payment gateway.");
        cart = [];
        updateCart();
        closeModal();
    });

    categoryContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('category-item')) {
            document.querySelector('.category-item.active').classList.remove('active');
            event.target.classList.add('active');
            currentCategory = event.target.dataset.category;
            renderProducts();
        }
    });

    searchButton.addEventListener('click', () => {
        currentSearchTerm = searchInput.value;
        renderProducts();
    });

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            currentSearchTerm = searchInput.value;
            renderProducts();
        }
    });

    // Initial load
    renderProducts();
});