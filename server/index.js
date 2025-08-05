const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DB connected');
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@taskmanager.7tnzarm.mongodb.net/`;
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const FoodsCollection = client.db('unLimitedFoods').collection('foods');
    
  } catch (err) {
    console.error('❌ MongoDB error:', err.message);
  }
}
run();

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
