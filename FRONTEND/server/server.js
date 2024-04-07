const express = require('express');
const path = require('path');
const cors = require('cors')
const { spawn } = require('child_process');
const { connect, findValidPhish } = require('./database');



const app = express();
const port = 3000;


app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {    
    res.sendFile(path.join(__dirname, '..', '/Phishnet/dist/index.html'));
});

app.get('/data', async (req, res) => {
    console.log("Get made")
    try {
      await connect(); 
      const result = await findValidPhish();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});



app.post('/data', async (req, res) => {
    const url = req.body.url;  // Assume the body directly contains the URL
    console.log('1')
    // Spawn the Python process to run your AI script
    const pythonProcess = spawn('python', ['../../PhishBot.py', url]);
    console.log('2')
    pythonProcess.stdout.on('data', (data) => {
        // When data is received from the Python script, send it back as a response
        console.log(data)
        res.json(JSON.parse(data.toString()));
    });

    pythonProcess.stderr.on('data', (data) => {
        // Handle errors from the Python script
        console.error(`stderr: ${data.toString()}`);
        res.status(500).json({ error: 'Error in Python script' });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

