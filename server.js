const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let quoteCounter = 1;
let invoiceCounter = 1;
let quotes = [];
let invoices = [];

// Endpoints for managing services, quotes, and invoices
app.get('/services', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/services');
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/quotes', (req, res) => {
  const quote = {
    ...req.body,
    quoteNumber: quoteCounter++
  };
  quotes.push(quote);
  res.status(201).json(quote);
});

app.post('/invoices', (req, res) => {
  const invoice = {
    ...req.body,
    invoiceNumber: invoiceCounter++
  };
  invoices.push(invoice);
  res.status(201).json(invoice);
});

app.get('/quotes', (req, res) => {
  res.json(quotes);
});

app.get('/invoices', (req, res) => {
  res.json(invoices);
});

// Middleware to remove .html extension from URL
app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', `${page}.html`);
    res.sendFile(filePath, (err) => {
        if (err) {
            next();
        }
    });
});

// Fallback to index.html for any other requests (for single-page applications)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
