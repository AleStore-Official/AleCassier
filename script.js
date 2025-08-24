let carrello = [];

function aggiungiProdotto(nome, prezzo) {
  const esistente = carrello.find(p => p.nome === nome);
  if (esistente) {
    esistente.quantità += 1;
  } else {
    carrello.push({ nome, prezzo, quantità: 1 });
  }
  aggiornaTotale();
  salvaCarrello();
}

function aggiornaBorse() {
  const nBorse = parseInt(document.getElementById('borse')?.value) || 0;
  const borse = carrello.find(p => p.nome === "Borsa");

  if (borse) {
    borse.quantità = nBorse;
  } else if (nBorse > 0) {
    carrello.push({ nome: "Borsa", prezzo: 0.20, quantità: nBorse });
  }

  aggiornaTotale();
  salvaCarrello();
}

function rimuoviProdotto(nome) {
  carrello = carrello.filter(item => item.nome !== nome);
  aggiornaTotale();
  salvaCarrello();
  mostraCarrello();
}

function calcolaTotale() {
  return carrello.reduce((sum, item) => sum + item.prezzo * item.quantità, 0);
}

function aggiornaTotale() {
  const totale = calcolaTotale();
  const totaleDiv = document.getElementById('totale');
  if (totaleDiv) totaleDiv.textContent = `Totale: €${totale.toFixed(2)}`;
  localStorage.setItem('totaleFinale', totale.toFixed(2));
}

function salvaCarrello() {
  localStorage.setItem("carrello", JSON.stringify(carrello));
}

function caricaCarrello() {
  const salvato = localStorage.getItem("carrello");
  if (salvato) {
    carrello = JSON.parse(salvato);
    aggiornaTotale();
    mostraCarrello();
  }
}

function mostraCarrello() {
  const container = document.getElementById("carrelloList");
  if (!container) return;

  container.innerHTML = "";
  carrello.forEach(item => {
    const riga = document.createElement("div");
    riga.className = "product-card";
    riga.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>${item.nome}</strong><br>
          Quantità: ${item.quantità}<br>
          €${(item.prezzo * item.quantità).toFixed(2)}
        </div>
        <button class="btn-add" onclick="rimuoviProdotto('${item.nome}')">❌</button>
      </div>
    `;
    container.appendChild(riga);
  });

  const borse = carrello.find(p => p.nome === "Borsa");
  document.getElementById("borseVisual").textContent = borse ? borse.quantità : 0;
  document.getElementById("costoBorse").textContent = borse ? (borse.prezzo * borse.quantità).toFixed(2) : "0.00";
  document.getElementById("totaleFinale").textContent = localStorage.getItem("totaleFinale") || "0.00";
}

// 🧾 Simulazione POS: verifica codice e mostra ricevuta
function verificaCodice() {
  const codice = document.getElementById("codicePagamento").value.trim();
  const codiceValido = "POS2025";

  if (codice === codiceValido) {
    document.getElementById("messaggio").textContent = "✅ Codice accettato. Generazione ricevuta...";
    mostraRicevuta();

    // ⏳ Reindirizza dopo 5 secondi
    setTimeout(() => {
      window.location.href = "fattura.html";
    }, 5000);
  } else {
    document.getElementById("messaggio").textContent = "❌ Codice non valido.";
    document.getElementById("ricevuta").style.display = "none";
  }
}

function mostraRicevuta() {
  const container = document.getElementById("riepilogoProdotti");
  const ricevuta = document.getElementById("ricevuta");
  const carrello = JSON.parse(localStorage.getItem("carrello")) || [];

  container.innerHTML = "";
  carrello.forEach(item => {
    const riga = document.createElement("p");
    riga.textContent = `${item.nome} × ${item.quantità} = €${(item.prezzo * item.quantità).toFixed(2)}`;
    container.appendChild(riga);
  });

  document.getElementById("totaleFinale").textContent =
    localStorage.getItem("totaleFinale") || "0.00";

  ricevuta.style.display = "block";
}

// 📷 Lettore QR
window.onload = () => {
  if (location.pathname.includes("carrello.html")) {
    caricaCarrello();
    return;
  }

  const scanner = new Html5Qrcode("qr-preview");

  scanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      const nome = decodedText.trim();
      const prezzo = prodotti[nome];
      if (prezzo !== undefined) {
        aggiungiProdotto(nome, prezzo);
        mostraCarrello();
      } else {
        console.warn(`QR non riconosciuto: ${nome}`);
      }
    },
    (errorMessage) => {
      // Ignora errori di scansione
    }
  );
};

// 📦 Lista prodotti e prezzi
const prodotti = {
  "Panino": 3.50,
  "Brioche": 1.50,
  "Lasagne": 4.50,
  "Muffin al cioccolato": 2.00,
  "Waffle": 2.50,
  "Waffle a forma di cuore": 2.80,
  "Una fetta di pizza": 2.50,
  "Crostata all'albicocca": 2.20,
  "Crostata al cioccolato": 2.50,
  "Ciambella": 1.80,
  "Pane": 1.50,
  "Pane per hamburger": 1.20,
  "Fette biscottate": 1.00,
  "Fetta biscottata con miele": 1.50,
  "Cracker": 0.80,
  "Patatine fritte": 2.00,
  "Wurstel": 1.50,
  "Mela": 1.00,
  "Mela rossa": 1.00,
  "Pera": 1.20,
  "Banana": 0.90,
  "Fragola": 1.50,
  "Uva Viola": 2.00,
  "Uva verde": 2.00,
  "Mandarino": 0.80,
  "Limone": 0.60,
  "Arancia": 1.00,
  "Arancia rossa": 1.20,
  "Pomodoro piccolo": 0.70,
  "Cetriolo grande": 1.00,
  "Cetriolo piccolo": 0.80,
  "Peperone Verde": 1.20,
  "Peperone rosso": 1.30,
  "Peperone giallo": 1.30,
  "Carota": 0.60,
  "Patata": 0.50,
  "Pannocchia": 1.50,
  "Insalata": 1.00,
  "Melanzana": 1.20,
  "Finocchio": 1.00,
  "Fettina di peperone": 0.40,
  "Cavolfiore": 1.80,
  "Asparagi": 2.00,
  "Pisellini": 1.50,
  "Gelato con cono": 2.50,
  "Cono di gelato": 2.00,
  "Uova crude": 1.00,
  "Uova sode": 1.20,
  "Gamberetto": 3.50,
  "Una fetta di anguria": 1.50,
  "Anguria intera": 4.00,
  "Cipolla": 0.70
};