document.addEventListener('DOMContentLoaded', () => {
    const fetchCurrentInvoiceNumber = async () => {
      const response = await fetch('http://localhost:3000/invoiceNumberTracker');
      const tracker = await response.json();
      return tracker.currentInvoiceNumber;
    };
  
    const incrementInvoiceNumber = async (currentNumber) => {
      await fetch('http://localhost:3000/invoiceNumberTracker', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentInvoiceNumber: currentNumber + 1 })
      });
    };
  
    const createInvoiceNumber = (currentNumber) => {
      return `INV${String(currentNumber).padStart(4, '0')}`;
    };
  
    const generateInvoice = async () => {
      const currentInvoiceNumber = await fetchCurrentInvoiceNumber();
      const newInvoiceNumber = createInvoiceNumber(currentInvoiceNumber);
  
      const newInvoice = {
        invoiceNumber: newInvoiceNumber,
        date: new Date().toLocaleDateString(),
        client: {
          name: "Client Name", // Replace with dynamic data as needed
          address: "Client Address" // Replace with dynamic data as needed
        },
        services: [
          {
            name: "Simple Website",
            description: "Start sharing your thoughts and ideas with a blog platform",
            price: 500
          },
          {
            name: "Basic Website",
            description: "Standard website with additional features",
            price: 800
          }
          // Add more services as needed
        ],
        total: 1300 // Calculate total dynamically as needed
      };
  
      await fetch('http://localhost:3000/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInvoice)
      });
  
      await incrementInvoiceNumber(currentInvoiceNumber);
  
      document.getElementById('invoice-number').textContent = newInvoice.invoiceNumber;
      document.getElementById('invoice-date').textContent = newInvoice.date;
      document.getElementById('invoice-total').textContent = `R${newInvoice.total.toFixed(2)}`;
  
      const invoiceItems = document.getElementById('invoice-items');
      newInvoice.services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><span>${service.name}</span></td>
          <td><span>${service.description}</span></td>
          <td><span>R${service.price.toFixed(2)}</span></td>
          <td><span>1</span></td>
          <td><span>R${service.price.toFixed(2)}</span></td>
        `;
        invoiceItems.appendChild(row);
      });
    };
  
    generateInvoice().catch(error => console.error('Error generating invoice:', error));
  });
  