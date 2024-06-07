// public/invoice.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/invoices')
      .then(response => response.json())
      .then(invoices => {
        const latestInvoice = invoices[invoices.length - 1];
        const invoiceSection = document.getElementById('invoice-details');
        invoiceSection.innerHTML = `
          <h2>Invoice Number: ${latestInvoice.invoiceNumber}</h2>
          ${latestInvoice.services.map(service => `
            <div>
              <h3>${service.name}</h3>
              <p>${service.description}</p>
              <p>Price: R${service.price}</p>
            </div>
          `).join('')}
        `;
      });
  });
  