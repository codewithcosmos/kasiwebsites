// script.js
let quote = [];
let invoice = [];

function addToQuote(serviceId) {
  fetch(`http://localhost:3001/services/${serviceId}`)
    .then(response => response.json())
    .then(service => {
      quote.push(service);
      alert(`${service.name} added to quote`);
    });
}

function addToInvoice(serviceId) {
  fetch(`http://localhost:3001/services/${serviceId}`)
    .then(response => response.json())
    .then(service => {
      invoice.push(service);
      alert(`${service.name} added to invoice`);
    });
}

function displayQuote() {
  const quoteSection = document.getElementById('quote');
  quoteSection.innerHTML = quote.map(service => `
    <div>
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <p>Price: R${service.price}</p>
    </div>
  `).join('');
}

function displayInvoice() {
  const invoiceSection = document.getElementById('invoice');
  invoiceSection.innerHTML = invoice.map(service => `
    <div>
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <p>Price: R${service.price}</p>
    </div>
  `).join('');
}
