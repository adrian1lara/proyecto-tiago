document.addEventListener('DOMContentLoaded', function() {
  // Espera a que se cargue completamente el documento

  $(document).ready(function() {
    // Agregar animaciones de desplazamiento suave a todos los enlaces anclados
    $('a[href^="#"]').on('click', function(event) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    });
  });
  

  // Obtener los botones "Agregar al carrito"
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  // Agregar un evento de clic a cada botón "Agregar al carrito"
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartClicked);
  });

  // Función que se ejecuta cuando se hace clic en el botón "Agregar al carrito"
  function addToCartClicked(event) {
    const button = event.target;
    const product = button.parentElement;
    const productId = product.dataset.id;

    // Obtener los detalles del producto
    const productTitle = product.querySelector('h3').innerText;
    const productPrice = product.querySelector('.price').innerText;

    // Agregar el producto al carrito
    addItemToCart(productId, productTitle, productPrice);

    // Actualizar el número de elementos en el carrito
    updateCartCount();

    // Verificar si hay productos
    checkCartEmpty();

    // Guardar los elementos del carrito en el almacenamiento local
    saveCartItems();
  }

  // Función para agregar un elemento al carrito
  function addItemToCart(id, title, price) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.id = id;
    cartItem.innerHTML = `
      <div class="cart-item-details">
        <h4 class="cart-item-title">${title}</h4>
        <p class="cart-item-price">${price}</p>
      </div>
      <a href="#" class="remove-item"><i class="fas fa-times"></i></a>
    `;
    const cartItems = document.querySelector('.cart-items');
    cartItems.appendChild(cartItem);
    cartItem.querySelector('.remove-item').addEventListener('click', removeItem);
    updateCartTotal();
    updateCartCount();
    checkCartEmpty();

    // Guardar los elementos del carrito en el almacenamiento local
    saveCartItems();
  }

  // Función para actualizar el número de elementos en el carrito
  function updateCartCount() {
    const cartCount = document.querySelector('.cart span');
    const cartItems = document.querySelectorAll('.cart-item');

    if (cartCount) {
      cartCount.innerText = cartItems.length;
    }
  }

  // Función para actualizar el total del carrito
  function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    cartItems.forEach(item => {
      const price = item.querySelector('.cart-item-price').innerText.replace('$', '');
      total += parseFloat(price);
    });
    const cartTotal = document.querySelector('.cart-footer p');
    cartTotal.innerText = `Total: $${total.toFixed(2)}`;
  }

  // Función para eliminar un elemento del carrito
  function removeItem(event) {
    const buttonClicked = event.currentTarget;
    buttonClicked.parentElement.remove();
    updateCartTotal();
    updateCartCount();
    checkCartEmpty();

    // Guardar los elementos del carrito en el almacenamiento local
    saveCartItems();
  }

  // Agregar un evento de clic al botón del carrito para mostrar/ocultar el carrito 
  const cartButton = document.querySelector('.cart'); 
  const cartSidebar = document.querySelector('.cart-sidebar'); 
  const closeCart = document.querySelector('.close-cart'); 
  cartButton.addEventListener('click', function() { cartSidebar.classList.add('open'); }); 
  closeCart.addEventListener('click', function() { cartSidebar.classList.remove('open'); });

  // Función para verificar si hay elementos en el carrito 
  function checkCartEmpty() { const cartItems = document.querySelectorAll('.cart-items .cart-item');
  const emptyCartText = document.querySelector('.cart-items p');
  if (emptyCartText) {
    if (cartItems.length === 0) {
      emptyCartText.style.display = 'block';
    } else {
      emptyCartText.style.display = 'none';
    }
  }

  // Guardar los elementos del carrito en el almacenamiento local
  saveCartItems();
  }

  // Función para cargar los elementos del carrito desde el almacenamiento 
  function loadCartItems() { const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.forEach(item => {
    addItemToCart(item.id, item.title, item.price);
  });

  updateCartTotal();
  updateCartCount();
  checkCartEmpty();
  }

  // Función para guardar los elementos del carrito en el almacenamiento local 
  function saveCartItems() { const cartItems = document.querySelectorAll('.cart-item'); const items = [];
  cartItems.forEach(item => {
    items.push({
      id: item.dataset.id,
      title: item.querySelector('.cart-item-title').innerText,
      price: item.querySelector('.cart-item-price').innerText
    });
  });

  localStorage.setItem('cartItems', JSON.stringify(items));
  }

  // Cargar los elementos del carrito desde el almacenamiento local 
  loadCartItems(); 
});






