let cart = [];

function addProduct(name, price) {
  const existing = cart.find(p => p.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateTotal();
  saveCart();
}

function updateBags() {
  const nBags = parseInt(document.getElementById('bags')?.value) || 0;
  const bags = cart.find(p => p.name === "Bag");

  if (bags) {
    bags.quantity = nBags;
  } else if (nBags > 0) {
    cart.push({ name: "Bag", price: 0.20, quantity: nBags });
  }

  updateTotal();
  saveCart();
}

function removeProduct(name) {
  cart = cart.filter(item => item.name !== name);
  updateTotal();
  saveCart();
  showCart();
}

function calculateTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateTotal() {
  const total = calculateTotal();
  const totalDiv = document.getElementById('totale');
  if (totalDiv) totalDiv.textContent = `Total: €${total.toFixed(2)}`;
  localStorage.setItem('finalTotal', total.toFixed(2));
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) {
    cart = JSON.parse(saved);
    updateTotal();
    showCart();
  }
}

function showCart() {
  const container = document.getElementById("carrelloList");
  if (!container) return;

  container.innerHTML = "";
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "product-card";
    row.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>${item.name}</strong><br>
          Quantity: ${item.quantity}<br>
          €${(item.price * item.quantity).toFixed(2)}
        </div>
        <button class="btn-add" onclick="removeProduct('${item.name}')">❌</button>
      </div>
    `;
    container.appendChild(row);
  });

  const bags = cart.find(p => p.name === "Bag");
  document.getElementById("borseVisual").textContent = bags ? bags.quantity : 0;
  document.getElementById("costoBorse").textContent = bags ? (bags.price * bags.quantity).toFixed(2) : "0.00";
  document.getElementById("totale").textContent = `Total: €${calculateTotal().toFixed(2)}`;
}

const products = {
  "Sandwich": 3.50,
  "Brioche": 1.50,
  "Lasagna": 4.50,
  "Chocolate Muffin": 2.00,
  "Waffle": 2.50,
  "Heart-shaped Waffle": 2.80,
  "Pizza Slice": 2.50,
  "Apricot Tart": 2.20,
  "Chocolate Tart": 2.50,
  "Donut": 1.80,
  "Bread": 1.50,
  "Burger Bun": 1.20,
  "Rusks": 1.00,
  "Honey Rusk": 1.50,
  "Crackers": 0.80,
  "French Fries": 2.00,
  "Wurstel": 1.50,
  "Apple": 0.90,
  "Banana": 1.00,
  "Carrot": 0.70,
  "Tomato": 0.80,
  "Lettuce": 1.20,
  "Ice Cream with Cone": 2.50,
  "Ice Cream Cone": 2.00,
  "Raw Eggs": 1.00,
  "Boiled Eggs": 1.20,
  "Shrimp": 3.50,
  "Watermelon Slice": 1.50,
  "Whole Watermelon": 4.00,
  "Onion": 0.70
};

function generateProductCards() {
  const container = document.querySelector(".product-grid");
  if (!container) return;

  Object.entries(products).forEach(([name, price]) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${name}</h3>
      <p>€${price.toFixed(2)}</p>
      <button class="btn-add" onclick="addProduct('${name}', ${price})">Add</button>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (location.pathname.includes("cassier.html")) {
    generateProductCards();
  }
  if (location.pathname.includes("cart.html")) {
    loadCart();
  }
});