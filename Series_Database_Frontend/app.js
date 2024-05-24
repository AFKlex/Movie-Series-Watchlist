// Define required modules and load enviorment variables
const express = require('express');
const path = require('path');
const app = express();

var api_base_url = process.env.base_url

// Configure HTML Public Serve Folder
app.use(express.static(path.join(__dirname, 'public')));

// Configure Root Endpoint
app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configure path to get base URL
app.get('/api-base-url', (req, res) => {
    res.json({ apiUrl: api_base_url });
});

// Start Server
app.listen(8080, () => {
    console.log("Server successfully running on port 8080");
  });