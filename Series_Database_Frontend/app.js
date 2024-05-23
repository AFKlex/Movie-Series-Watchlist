const express = require('express');
const path = require('path');
const app = express();

var api_base_url = process.env.base_url

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api-base-url', (req, res) => {
    res.json({ apiUrl: api_base_url });
});

app.listen(8080, () => {
    console.log("Server successfully running on port 8080");
  });