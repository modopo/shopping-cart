/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
  state.cart.updateCounter();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tbody = document.querySelector('tbody');

  while(tbody.firstChild) {
    tbody.removeChild(tbody.lastChild);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  let tbody = document.querySelector('tbody');

  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
  state.cart.items.forEach(cartItem => {
    let tr = document.createElement('tr');

    let remove = document.createElement('td');
    let quantity = document.createElement('td');
    let item = document.createElement('td');
    
    let deleteLink = document.createElement('a');
    deleteLink.href = "";
    deleteLink.id = cartItem.product;
    deleteLink.innerText = 'X';
    remove.appendChild(deleteLink);

    quantity.innerText = cartItem.quantity;
    item.innerText = cartItem.product;

    tr.appendChild(remove);
    tr.appendChild(quantity);
    tr.appendChild(item);

    tbody.append(tr);
  });
}

function removeItemFromCart(event) {

  event.preventDefault();

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

  state.cart.removeItem(event.target.id);
  state.cart.saveToLocalStorage();
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
