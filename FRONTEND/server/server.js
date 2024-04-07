const express = require('express');
const path = require('path');
const { connect, findValidPhish } = require('./database');



const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '..', '/Phishnet/dist')));

app.use(express.json());

// Define a route to handle the POST request from the frontend
app.post('/data', async (req, res) => {
  try {
      const { urlInput } = req.body;
      console.log('Received URL input:', urlInput);

      const result = await findValidPhish(urlInput);
      console.log("Found phish", result);

      res.json({ message: 'Data received successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});

// Define a route for the initial page
app.get('/', (req, res) => {    
    res.sendFile(path.join(__dirname, '..', '/Phishnet/dist/index.html'));
});

app.get('/data', async (req, res) => {
    try {
      await connect(); // Connect before the query
      const result = await findValidPhish();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

