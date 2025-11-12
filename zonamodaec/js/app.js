// Base de datos de productos
const productos = [
    {
        id: 1,
        nombre: "Zapatos Deportivos Nike",
        categoria: "deportivos",
        precio: 89.99,
        imagen: "👟"
    },
    {
        id: 2,
        nombre: "Zapatillas Running Adidas",
        categoria: "deportivos",
        precio: 79.99,
        imagen: "🏃"
    },
    {
        id: 3,
        nombre: "Zapatos Casuales Converse",
        categoria: "casuales",
        precio: 59.99,
        imagen: "👞"
    },
    {
        id: 4,
        nombre: "Mocasines Elegantes",
        categoria: "casuales",
        precio: 69.99,
        imagen: "👠"
    },
    {
        id: 5,
        nombre: "Zapatos Formales Negros",
        categoria: "formales",
        precio: 99.99,
        imagen: "👔"
    },
    {
        id: 6,
        nombre: "Oxford Clásicos",
        categoria: "formales",
        precio: 109.99,
        imagen: "👞"
    },
    {
        id: 7,
        nombre: "Botas Deportivas",
        categoria: "deportivos",
        precio: 94.99,
        imagen: "🥾"
    },
    {
        id: 8,
        nombre: "Sneakers Urbanos",
        categoria: "casuales",
        precio: 64.99,
        imagen: "👟"
    },
    {
        id: 9,
        nombre: "Zapatos de Vestir Marrones",
        categoria: "formales",
        precio: 119.99,
        imagen: "👞"
    }
];

// Estado del carrito
let carrito = [];
let categoriaActual = 'todos';

// Elementos del DOM
const productosGrid = document.getElementById('productosGrid');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos);
    cargarCarritoDesdeStorage();
    actualizarCarrito();
});

// Mostrar productos
function mostrarProductos(productosFiltrados) {
    productosGrid.innerHTML = '';
    
    productosFiltrados.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        productoCard.innerHTML = `
            <div class="producto-image">${producto.imagen}</div>
            <div class="producto-info">
                <div class="producto-categoria">${producto.categoria}</div>
                <div class="producto-nombre">${producto.nombre}</div>
                <div class="producto-precio">$${producto.precio.toFixed(2)}</div>
                <button class="btn-add-cart" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al Carrito
                </button>
            </div>
        `;
        productosGrid.appendChild(productoCard);
    });
}

// Filtros de categoría
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(b => b.classList.remove('active'));
        // Agregar clase active al botón clickeado
        btn.classList.add('active');
        
        categoriaActual = btn.dataset.category;
        
        if (categoriaActual === 'todos') {
            mostrarProductos(productos);
        } else {
            const productosFiltrados = productos.filter(p => p.categoria === categoriaActual);
            mostrarProductos(productosFiltrados);
        }
    });
});

// Agregar al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const itemExistente = carrito.find(item => item.id === productoId);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    guardarCarritoEnStorage();
    actualizarCarrito();
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

// Remover del carrito
function removerDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    guardarCarritoEnStorage();
    actualizarCarrito();
}

// Actualizar cantidad
function actualizarCantidad(productoId, cambio) {
    const item = carrito.find(item => item.id === productoId);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            removerDelCarrito(productoId);
        } else {
            guardarCarritoEnStorage();
            actualizarCarrito();
        }
    }
}

// Actualizar vista del carrito
function actualizarCarrito() {
    // Actualizar contador
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar items del carrito
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
    } else {
        cartItems.innerHTML = carrito.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.imagen}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.nombre}</div>
                    <div class="cart-item-price">$${item.precio.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="actualizarCantidad(${item.id}, -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button class="quantity-btn" onclick="actualizarCantidad(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removerDelCarrito(${item.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Actualizar total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Abrir/Cerrar carrito
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// Cerrar carrito al hacer click fuera
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        cartSidebar.classList.remove('open');
    }
});

// Finalizar compra
checkoutBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    alert(`¡Gracias por tu compra!\nTotal: $${total.toFixed(2)}\n\nEn un momento te contactaremos para confirmar tu pedido.`);
    
    carrito = [];
    guardarCarritoEnStorage();
    actualizarCarrito();
    cartSidebar.classList.remove('open');
});

// Formulario de contacto
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Te contactaremos pronto.');
    contactForm.reset();
});

// Smooth scroll para enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// LocalStorage
function guardarCarritoEnStorage() {
    localStorage.setItem('zonamodaec_carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('zonamodaec_carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn 0.3s;
    `;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s';
        setTimeout(() => notificacion.remove(), 300);
    }, 2000);
}

// Agregar animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

