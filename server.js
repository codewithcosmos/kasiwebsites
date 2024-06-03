// server.js

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Form Data:', formData);
    res.send('Form submitted successfully!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
