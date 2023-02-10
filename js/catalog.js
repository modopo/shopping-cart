/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
state.cart = new Cart(cartItems);

// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in state.allProducts) {
    let newProduct = document.createElement('option')
    newProduct.innerText = state.allProducts[i].name;
    newProduct.value = state.allProducts[i].name;
    selectElement.appendChild(newProduct);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  // TODO: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  updateCartPreview();
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list

  let dropDown = document.getElementById('items');
  let selectedItems = dropDown.options[dropDown.selectedIndex].value;
  let quantInput = document.getElementById('quantity').value;

  if (!quantInput) {
    quantInput = 0;
  }
  
  state.cart.addItem(selectedItems, quantInput);
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  let cart = document.getElementById('cartContents');

  //remove any child elements under the cart <div> so it doesn't repeat the cart after every submit
  while (cart.firstChild) {
    cart.removeChild(cart.lastChild);
  }

  for(let index = 0; index < state.cart.items.length; index++) {
    let cartItem = document.createElement('p');
    cartItem.innerText = `${state.cart.items[index].product}, ${state.cart.items[index].quantity}`;
    cart.appendChild(cartItem);
  }

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.

populateForm();
updateCartPreview();
state.cart.updateCounter();