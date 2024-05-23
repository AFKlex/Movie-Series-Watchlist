const express = require('express');

const bodyParser = require("body-parser");

const cors = require('cors');

const { addEntry,getallEntries,removeEntry } = require('./src/api');

const app = express();
const port = 3000;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Enable CORS for all routes with detailed configuration
app.use(cors({
  origin: '*', // Allow all origins, modify this for more specific configuration
  methods: 'GET,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));


app.post("/api/add/entry", (req, res) => {
    const { name, status, score, startDate, finishDate, rewatchCount, note,currentEpisode } = req.body;
    addEntry(name, status, score, startDate, finishDate, rewatchCount, note,currentEpisode)
    res.send(req.body);
});

app.get("/api/get/allEntries", async (req, res) => {
  try {
    const entrys = await getallEntries();
    res.send(entrys);
    console.log("Entrys where successfully retrived and send.");
} catch (error) {
    res.status(500).send("Error retrieving entrys");
    console.log("Error retrieving entrys")
}
});



app.delete("/api/delete/entry", (req, res) => {
  console.log(req.body.id)
  removeEntry(req.body.id);
  res.send(req.body);
});

app.get('/', (req, res) => {
  res.send('API is Online');
});

app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});


