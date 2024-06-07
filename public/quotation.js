document.addEventListener('DOMContentLoaded', () => {
    const fetchCurrentQuotationNumber = async () => {
      const response = await fetch('http://localhost:3000/quotationNumberTracker');
      const tracker = await response.json();
      return tracker.currentQuotationNumber;
    };
  
    const incrementQuotationNumber = async (currentNumber) => {
      await fetch('http://localhost:3000/quotationNumberTracker', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentQuotationNumber: currentNumber + 1 })
      });
    };
  
    const createQuotationNumber = (currentNumber) => {
      return `Q${String(currentNumber).padStart(6, '0')}`;
    };
  
    const generateQuotation = async () => {
      const currentQuotationNumber = await fetchCurrentQuotationNumber();
      const newQuotationNumber = createQuotationNumber(currentQuotationNumber);
  
      const newQuotation = {
        quotationNumber: newQuotationNumber,
        date: new Date().toLocaleDateString(),
        client: {
          name: "Client Name", // Replace with dynamic data as needed
          address: "Client Address" // Replace with dynamic data as needed
        },
        services: [
          {
            name: "Simple Website",
            description: "Start sharing your thoughts and ideas with a blog platform",
           
  