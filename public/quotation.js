// public/quotation.js or similar
const API_URL = 'http://localhost:3001'; // Adjust if needed

async function addToQuote(serviceId) {
  const response = await fetch(`${API_URL}/services/${serviceId}`);
  const service = await response.json();

  const quoteResponse = await fetch(`${API_URL}/quotations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      service,
      quotationNumber: await getNextQuotationNumber()
    })
  });

  if (quoteResponse.ok) {
    alert('Service added to quote!');
  } else {
    alert('Failed to add service to quote.');
  }
}

async function addToInvoice(serviceId) {
  const response = await fetch(`${API_URL}/services/${serviceId}`);
  const service = await response.json();

  const invoiceResponse = await fetch(`${API_URL}/invoices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      service,
      invoiceNumber: await getNextInvoiceNumber()
    })
  });

  if (invoiceResponse.ok) {
    alert('Service added to invoice!');
  } else {
    alert('Failed to add service to invoice.');
  }
}

async function getNextQuotationNumber() {
  const response = await fetch(`${API_URL}/quotationNumberTracker`);
  const data = await response.json();
  const nextNumber = data.currentQuotationNumber;

  // Update the quotation number tracker
  await fetch(`${API_URL}/quotationNumberTracker`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ currentQuotationNumber: nextNumber + 1 })
  });

  return nextNumber;
}

async function getNextInvoiceNumber() {
  const response = await fetch(`${API_URL}/invoiceNumberTracker`);
  const data = await response.json();
  const nextNumber = data.currentInvoiceNumber;

  // Update the invoice number tracker
  await fetch(`${API_URL}/invoiceNumberTracker`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ currentInvoiceNumber: nextNumber + 1 })
  });

  return nextNumber;
}
