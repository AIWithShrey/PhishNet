const express = require('express');
const connectDB = require('./database');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '..', '/Phishnet/dist')));

// Define a route for the initial page
app.get('/', (req, res) => {    
    res.sendFile(path.join(__dirname, '..', '/Phishnet/dist/index.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


