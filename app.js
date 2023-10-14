const productButtons = document.querySelectorAll(".add-to-cart");
const cart = document.getElementById("cart");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");
const cartDiskon = document.getElementById("cart-diskon");
const inputPromoCode = document.getElementById("promo-code");
const cartItems = [];

// promo
const promo = [
  {
    label: "DISC10",
    value: 0.1,
  },
  {
    label: "DISC50",
    value: 0.5,
  },
  {
    label: "DISC75",
    value: 0.75,
  },
];

displayCart();

productButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

function addToCart(event) {
  const button = event.currentTarget;
  const name = button.getAttribute("data-name");
  const price = parseFloat(button.getAttribute("data-price"));

  const existingItem = cartItems.find((item) => item.name === name);

  if (existingItem) {
    // Jika produk sudah ada di dalam keranjang, tambahkan jumlah
    existingItem.quantity += 1;
  } else {
    // Jika produk belum ada di dalam keranjang, tambahkan sebagai item baru
    cartItems.push({ name, price, quantity: 1 });
  }

  console.log(name);
  displayCart();
}

function displayCart() {
  cart.innerHTML = "";
  if (cartItems.length === 0) {
    cart.innerHTML = "<p>Cart is empty</p>";
  } else {
    cartItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.innerHTML = `
      <div class="row bg-body-tertiary rounded-2 mt-2 mx-1 pt-2">
                <div class="col-6">
                  <h6>${item.name}</h6>
                  <p>Rp. ${item.price}</p>
                </div>
                <div class="col-6">
                  <p class="float-end me-2 pt-3">${item.quantity} item</p>
                </div>
              </div>
      `;
      // itemElement.innerHTML = `${item.name} - Rp. ${item.price} - ${item.quantity}`;
      cart.appendChild(itemElement);
    });
  }

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  cartSubtotal.textContent = `Rp. ${subTotal}`;
  cartTotal.textContent = `Rp. ${subTotal}`;

  inputPromoCode.addEventListener("change", inputPromo);

  function inputPromo(e) {
    e.preventDefault();
    let total = 0;
    let diskon = 0;
    const codePromo = inputPromoCode.value;
    const disc = checkPromoCode(codePromo);

    if (disc > 0) {
      total = subTotal - subTotal * disc;
      diskon = subTotal * disc;
      cartDiskon.textContent = `Rp. ${diskon}`;
      cartTotal.textContent = `Rp. ${total}`;
    } else {
      cartDiskon.textContent = `Rp. ${diskon}`;
      cartTotal.textContent = `Rp. ${subTotal}`;
    }
  }

  function checkPromoCode(codePromo) {
    for (let i = 0; i < promo.length; i++) {
      if (codePromo === promo[i].label) {
        return promo[i].value;
      }
    }
    return 0;
  }
}
