// public/quote.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/quotes')
      .then(response => response.json())
      .then(quotes => {
        const latestQuote = quotes[quotes.length - 1];
        const quoteSection = document.getElementById('quote-details');
        quoteSection.innerHTML = `
          <h2>Quote Number: ${latestQuote.quoteNumber}</h2>
          ${latestQuote.services.map(service => `
            <div>
              <h3>${service.name}</h3>
              <p>${service.description}</p>
              <p>Price: R${service.price}</p>
            </div>
          `).join('')}
        `;
      });
  });
  
  function generateInvoice() {
    fetch('http://localhost:3000/quotes')
      .then(response => response.json())
      .then(quotes => {
        const latestQuote = quotes[quotes.length - 1];
        fetch('http://localhost:3000/invoices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(latestQuote)
        })
        .then(response => response.json())
        .then(invoice => {
          window.location.href = 'invoice.html';
        });
      });
  }
  