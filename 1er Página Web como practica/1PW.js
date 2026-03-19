// ============================================
//        CONFIGURACIÓN INICIAL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Web-Coffee cargada correctamente ☕');
    
    // Inicializar todos los módulos
    initMobileMenu();
    initShoppingCart();
    initProductFilter();
    initGallery();
    initNewsletter();
    initSmoothScroll();
    initSearch();
    initBlogReadMore();
    initAddToCart();
});

// ============================================
//        MENÚ MÓVIL (HAMBURGUESA)
// ============================================
function initMobileMenu() {
    const menu = document.querySelector('.menu');
    const bars = document.querySelector('.fa-bars');
    const closeBtn = document.createElement('i');
    
    // Crear botón de cerrar
    closeBtn.className = 'fa-solid fa-xmark';
    closeBtn.style.display = 'none';
    closeBtn.style.fontSize = '3rem';
    closeBtn.style.color = '#fff';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.marginLeft = '2rem';
    
    // Agregar botón de cerrar al menú
    menu.appendChild(closeBtn);
    
    // Toggle menú
    bars.addEventListener('click', () => {
        menu.classList.toggle('active');
        bars.style.display = 'none';
        closeBtn.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Evitar scroll
    });
    
    closeBtn.addEventListener('click', () => {
        menu.classList.remove('active');
        bars.style.display = 'block';
        closeBtn.style.display = 'none';
        document.body.style.overflow = 'auto'; // Permitir scroll
    });
    
    // Cerrar menú al hacer clic en un enlace
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            bars.style.display = 'block';
            closeBtn.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
}

// ============================================
//        CARRITO DE COMPRAS
// ============================================
function initShoppingCart() {
    const cartCount = document.querySelector('.number');
    const cartIcon = document.querySelector('.fa-basket-shopping');
    let cartItems = [];
    
    // Mostrar carrito (modal simple)
    cartIcon.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Tu carrito está vacío 🛒');
        } else {
            let message = '🛒 Tu Carrito:\n\n';
            cartItems.forEach((item, index) => {
                message += `${index + 1}. ${item.name} - $${item.price}\n`;
            });
            message += `\nTotal: $${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`;
            alert(message);
        }
    });
    
    // Función para agregar al carrito (se llama desde initAddToCart)
    window.addToCart = (productName, price) => {
        cartItems.push({ name: productName, price: price });
        updateCartCount();
        showNotification(`✅ ${productName} agregado al carrito`);
    };
    
    // Actualizar contador del carrito
    function updateCartCount() {
        cartCount.textContent = `(${cartItems.length})`;
    }
}

// ============================================
//        NOTIFICACIONES (TOAST)
// ============================================
function showNotification(message) {
    // Crear elemento de notificación
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #151515;
        color: #fff;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-size: 1.4rem;
    `;
    
    document.body.appendChild(toast);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Agregar animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
//        FILTRO DE PRODUCTOS
// ============================================
function initProductFilter() {
    const filterOptions = document.querySelectorAll('.container-options span');
    const products = document.querySelectorAll('.container-products');
    
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remover clase active de todos
            filterOptions.forEach(opt => opt.classList.remove('active'));
            // Agregar clase active al seleccionado
            option.classList.add('active');
            
            // Aquí podrías agregar lógica para filtrar productos
            // Por ahora, solo mostramos una animación
            products.forEach(product => {
                product.style.opacity = '0';
                setTimeout(() => {
                    product.style.opacity = '1';
                }, 300);
            });
        });
    });
}

// ============================================
//        GALERÍA DE IMÁGENES
// ============================================
function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery-img-1, .gallery-img-2, .gallery-img-3, .gallery-img-4, .gallery-img-5');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt);
        });
    });
}

function openLightbox(imageSrc, imageAlt) {
    // Crear modal de lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        cursor: pointer;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageAlt;
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 1rem;
        box-shadow: 0 0 20px rgba(199, 161, 122, 0.5);
    `;
    
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
    
    // Cerrar al hacer clic
    lightbox.addEventListener('click', () => {
        lightbox.remove();
    });
}

// ============================================
//        FORMULARIO NEWSLETTER
// ============================================
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter .content');
    const emailInput = newsletterForm.querySelector('input');
    const subscribeBtn = newsletterForm.querySelector('button');
    
    subscribeBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('⚠️ Por favor ingresa un correo electrónico');
            return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('⚠️ Por favor ingresa un correo válido');
            return;
        }
        
        // Simular suscripción
        showNotification('✅ ¡Gracias por suscribirte!');
        emailInput.value = '';
    });
}

// ============================================
//        SCROLL SUAVE
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ============================================
//        BÚSQUEDA
// ============================================
function initSearch() {
    const searchInput = document.querySelector('.search-form input');
    const searchBtn = document.querySelector('.btn-search');
    
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            showNotification(`🔍 Buscando: ${searchTerm}`);
            // Aquí podrías agregar lógica real de búsqueda
        } else {
            alert('⚠️ Por favor ingresa un término de búsqueda');
        }
    });
    
    // Buscar al presionar Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// ============================================
//        BOTONES DE LECTURA MÁS
// ============================================
function initBlogReadMore() {
    const readMoreBtns = document.querySelectorAll('.btn-read-more');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card-blog');
            const content = card.querySelector('.content-blog p');
            
            if (content.style.display === 'none') {
                content.style.display = 'block';
                btn.textContent = 'Leer más';
            } else {
                content.style.display = 'none';
                btn.textContent = 'Leer menos';
            }
        });
    });
}

// ============================================
//        AGREGAR AL CARRITO (PRODUCTOS)
// ============================================
function initAddToCart() {
    const addToCartBtns = document.querySelectorAll('.add-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar propagación
            
            const card = btn.closest('.card-product');
            const productName = card.querySelector('h3').textContent;
            const priceElement = card.querySelector('.price');
            const price = parseFloat(priceElement.textContent.replace('$', ''));
            
            // Llamar a la función addToCart
            if (window.addToCart) {
                addToCart(productName, price);
            }
        });
    });
}

// ============================================
//        EFECTO SCROLL EN HEADER
// ============================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ============================================
//        ANIMACIÓN DE ENTRADA (FADE IN)
// ============================================
function initFadeIn() {
    const elements = document.querySelectorAll('.card-product, .card-feature, .card-category, .card-blog');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Iniciar animación de entrada
initFadeIn();