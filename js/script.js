// ===== PRODUKT-DATEN =====
const products = [
    {
        id: 1,
        name: "Laptop Pro",
        category: "elektronik",
        price: 999.99,
        emoji: "💻",
        description: "Hochwertiger Business Laptop"
    },
    {
        id: 2,
        name: "Wireless Kopfhörer",
        category: "elektronik",
        price: 149.99,
        emoji: "🎧",
        description: "Premium Sound Quality"
    },
    {
        id: 3,
        name: "T-Shirt",
        category: "kleidung",
        price: 29.99,
        emoji: "👕",
        description: "Komfortables Baumwoll T-Shirt"
    },
    {
        id: 4,
        name: "Jeans",
        category: "kleidung",
        price: 79.99,
        emoji: "👖",
        description: "Klassische Blue Jeans"
    },
    {
        id: 5,
        name: "JavaScript Buch",
        category: "bucher",
        price: 39.99,
        emoji: "📚",
        description: "Lernen Sie JavaScript von Grund auf"
    },
    {
        id: 6,
        name: "Web Development Guide",
        category: "bucher",
        price: 49.99,
        emoji: "📖",
        description: "Kompletter Guide für Web Entwicklung"
    },
    {
        id: 7,
        name: "USB-C Kabel",
        category: "elektronik",
        price: 19.99,
        emoji: "🔌",
        description: "Schnelles Laden & Datentransfer"
    },
    {
        id: 8,
        name: "Hoodie",
        category: "kleidung",
        price: 59.99,
        emoji: "🧥",
        description: "Warmer und gemütlicher Hoodie"
    }
];

// ===== WARENKORB =====
let cart = [];

// ===== DOM ELEMENTS =====
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const checkoutBtn = document.getElementById('checkoutBtn');
const navLinks = document.querySelectorAll('.nav-link');

// ===== FUNKTIONEN =====

// Produkte rendern
function renderProducts(filter = 'all') {
    productsGrid.innerHTML = '';

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">€${product.price.toFixed(2)}</div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        In den Warenkorb
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Produkt zum Warenkorb hinzufügen
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${product.name} wurde hinzugefügt!`);
}

// Produkt aus dem Warenkorb entfernen
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Warenkorb aktualisieren
function updateCart() {
    // Warenkorb-Anzahl aktualisieren
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Warenkorb-Items rendern
    renderCartItems();

    // LocalStorage speichern (damit der Warenkorb nicht verloren geht)
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Warenkorb-Items anzeigen
function renderCartItems() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        checkoutBtn.disabled = true;
    } else {
        emptyCartMessage.style.display = 'none';
        checkoutBtn.disabled = false;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.emoji} ${item.name}</div>
                    <div class="cart-item-quantity">Menge: ${item.quantity}</div>
                </div>
                <div class="cart-item-price">€${(item.price * item.quantity).toFixed(2)}</div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    Entfernen
                </button>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Gesamtbetrag berechnen
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `€${total.toFixed(2)}`;
}

// Warenkorb Modal öffnen/schließen
function openCart() {
    cartModal.classList.add('active');
}

function closeCart() {
    cartModal.classList.remove('active');
}

// Notification anzeigen
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Filter-Navigation
function handleFilterClick(e) {
    navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.dataset.filter;
    renderProducts(filter);
}

// Checkout (Placeholder für Phase 2)
function handleCheckout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`✅ Phase 1 Prototyp: Checkout würde hier stattfinden.\n\nGesamtbetrag: €${total.toFixed(2)}\n\nPhase 2: Zahlungsintegration kommt bald!`);
}

// ===== EVENT LISTENER =====
cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
checkoutBtn.addEventListener('click', handleCheckout);
navLinks.forEach(link => link.addEventListener('click', handleFilterClick));

// Modal schließen wenn außerhalb geklickt wird
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCart();
    }
});

// ===== INITIALISIERUNG =====
function init() {
    // Warenkorb aus LocalStorage laden
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }

    // Produkte rendern
    renderProducts();
}

// App starten
init();