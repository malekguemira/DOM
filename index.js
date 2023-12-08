const items = [
    { id: 1, name: 'Item 1', price: 10, quantity: 1 },
    { id: 2, name: 'Item 2', price: 20, quantity: 2 },
    // Add more items as needed
];

function renderCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <div>
                <button onclick="adjustQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="adjustQuantity(${item.id}, 1)">+</button>
                <span class="heart" onclick="toggleLike(${item.id})">❤️</span>
                <button onclick="deleteItem(${item.id})">Delete</button>
            </div>
        `;

        if (item.liked) {
            cartItem.querySelector('.heart').style.color = 'red';
        }

        cartContainer.appendChild(cartItem);
    });

    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

function adjustQuantity(itemId, amount) {
    const item = items.find(i => i.id === itemId);
    if (item) {
        item.quantity += amount;
        if (item.quantity < 0) {
            item.quantity = 0;
        }
        renderCart();
    }
}

function toggleLike(itemId) {
    const item = items.find(i => i.id === itemId);
    if (item) {
        item.liked = !item.liked;
        renderCart();
    }
}

function deleteItem(itemId) {
    const index = items.findIndex(i => i.id === itemId);
    if (index !== -1) {
        items.splice(index, 1);
        renderCart();
    }
}

renderCart();