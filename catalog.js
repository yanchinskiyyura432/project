let cartIcon = document.querySelector("#cart");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//container start animation
gsap.fromTo(
  ".container",
  { opacity: 0, y: 100 },
  { opacity: 1, y: 0, duration: 1 }
);

//cart icon hover animation
cartIcon.addEventListener("mouseover", function () {
  cartIcon.style.transitionDuration = "1s";
  cartIcon.style.width = "50px";
  cartIcon.style.height = "50px";
});
cartIcon.addEventListener("mouseout", function () {
  cartIcon.style.transitionDuration = "1s";
  cartIcon.style.width = "45px";
  cartIcon.style.height = "45px";
});

//cart appear event
cartIcon.addEventListener("click", function () {
  cart.classList.add("active");
});
if (cartIcon) {
  closeCart.addEventListener("click", function () {
    cart.classList.remove("active");
  });
}
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//cart operations
function ready() {
  let removeCartButtons = document.getElementsByClassName("cart-remove");

  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  let cartAdd = document.getElementsByClassName("add-cart");
  for (let i = 0; i < cartAdd.length; i++) {
    let button = cartAdd[i];
    button.addEventListener("click", addCartClick);
  }
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClick);
}

// buying event (adds all elements to the local storage if phone number was entered correctly (if not - it won't start))
// then deletes all items from the cart
function buyButtonClick() {
  let enterNumber = prompt("Enter your phone number");
  let numberCheck = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (enterNumber == enterNumber.match(numberCheck)) {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
      let cartBox = cartBoxes[i];
      let product =
        cartBox.getElementsByClassName("cart-product-title")[0].innerText;
      let Stringprice = cartBox.getElementsByClassName("cart-price")[0];
      let price = parseFloat(Stringprice.innerText.replace("$", ""));
      let quantity = cartBox.getElementsByClassName("cart-quantity")[0].value;
      let key = Math.floor(Math.random() * 300);
      let objStorage = {
        Item: product,
        Amount: quantity,
        Price: price * quantity,
        PhoneNumber: enterNumber,
      };
      if (key !== localStorage.getItem(key)) {
        mJSON = JSON.stringify(objStorage);
        localStorage.setItem(key, mJSON);
      }
    }
    while (cartContent.hasChildNodes()) {
      cartContent.removeChild(cartContent.firstChild);
    }
    alert("Your Order is received");
    updateTotalPrice();
  } else {
    alert("invalid phone number");
  }
}

// event that adds items to cart
function addCartClick(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let image = shopProducts.getElementsByClassName("product-img")[0].src;

  addProductCart(title, price, image);
  updateTotalPrice();
}

// function which previous event uses
function addProductCart(title, price, image) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You alredy added this item to your cart");
      return;
    }
  }
  let cartBoxContent = ` <img src=${image} alt="" class="cart-img" />
<div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-quantity" />
</div>
<i class="bx bx-trash cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("click", quantityChanged);
}

// removes items fron the cart
function removeCartItem(event) {
  let buttonClick = event.target;
  buttonClick.parentElement.remove();
  updateTotalPrice();
}

// checking if quantity is lower than 0 (if is - it changes to 1)
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotalPrice();
}

// updatating total price (sum of all items in the cart )
function updateTotalPrice() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;

  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
