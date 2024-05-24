// Import required stuff
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

// General Configuration 
const { addEntry,getallEntries,removeEntry } = require('./src/api');

const app = express();
const port = 3000;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Enable CORS for all routes with detailed configuration
app.use(cors({
  origin: '*', // Allow all origins
  methods: 'GET,POST,DELETE', // Allow only certain methods
  allowedHeaders: 'Content-Type,Authorization' // Allowed Headers
}));


// API URL Endpoint for Adding Entries 
app.post("/api/add/entry", (req, res) => {
    const { name, status, score, startDate, finishDate, rewatchCount, note,currentEpisode } = req.body;
    addEntry(name, status, score, startDate, finishDate, rewatchCount, note,currentEpisode)
    res.send(req.body);
});

// API URL Endpoint for Getting Entries 
app.get("/api/get/allEntries", async (req, res) => {
  try {
    const entrys = await getallEntries();// Get entries from Database 
    res.send(entrys); // Send Entries to Client
    console.log("Entrys where successfully retrived and send.");
} catch (error) {
    res.status(500).send("Error retrieving entrys"); // Send Failure to Client 
    console.log("Error retrieving entrys")
}
});


// API URL Endpoint for Removeing Entries 
app.delete("/api/delete/entry", (req, res) => {
  console.log(req.body.id)
  removeEntry(req.body.id);
  res.send(req.body); // Send deleation result back to client
});

// Get Root access show that API is online. 
app.get('/', (req, res) => {
  res.send('API is Online');
});

// Start web application
app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});


