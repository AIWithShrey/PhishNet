const { MongoClient, ServerApiVersion } = require('mongodb'); require('dotenv').config();
const uri = process.env.CONNECTION_STRING

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      console.log()
    }
  }
  run().catch(console.dir);

  
async function findValidPhish(urlInput) {
  try {
    console.log(urlInput);
    const result = client.db("SiteReviews").collection("Sites").find({Phish: urlInput}).toArray()
    return result; 

  } catch(err) {
    console.error('findValidPhish error:', err);
    throw err; 
  } finally {
    console.log() 
  } 
}

module.exports = { 
  connect: run, 
  findValidPhish 
};

