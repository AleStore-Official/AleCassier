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

document.addEventListener("DOMContentLoaded", () => {
  if (location.pathname.includes("cart.html")) {
    loadCart();
  }
});

// 📦 Product list
const products = {
  "Sandwich": 3.50,
  "Croissant": 1.50,
  "Lasagna": 4.50,
  "Chocolate Muffin": 2.00,
  "Waffle": 2.50,
  "Heart-shaped Waffle": 2.80,
  "Slice of Pizza": 2.50,
  "Apricot Tart": 2.20,
  "Chocolate Tart": 2.50,
  "Donut": 1.80,
  "Bread": 1.50,
  "Burger Bun": 1.20,
  "Toast": 1.00,
  "Toast with Honey": 1.50,
  "Crackers": 0.80,
  "French Fries": 2.00,
  "Sausage": 1.50,
  "Apple": 1.00,
  "Red Apple": 1.00,
  "Pear": 1.20,
  "Banana": 0.90,
  "Strawberry": 1.50,
  "Purple Grapes": 2.00,
  "Green Grapes": 2.00,
  "Mandarin": 0.80,
  "Lemon": 0.60,
  "Orange": 1.00,
  "Blood Orange": 1.20,
  "Small Tomato": 0.70,
  "Large Cucumber": 1.00,
  "Small Cucumber": 0.80,
  "Green Pepper": 1.20,
  "Red Pepper": 1.30,
  "Yellow Pepper": 1.30,
  "Carrot": 0.60,
  "Potato": 0.50,
  "Corn Cob": 1.50,
  "Lettuce": 1.00,
  "Eggplant": 1.20,
  "Fennel": 1.00,
  "Pepper Slice": 0.40,
  "Cauliflower": 1.80,
  "Asparagus": 2.00,
  "Peas": 1.50,
  "Ice Cream Cone": 2.50,
  "Cone Ice Cream": 2.00,
  "Raw Eggs": 1.00,
  "Boiled Eggs": 1.20,
  "Shrimp": 3.50,
  "Watermelon Slice": 1.50,
  "Whole Watermelon": 4.00,
  "Onion": 0.70
};