const { MongoClient, ServerApiVersion } = require("mongodb");
let db;

async function connectDB() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l3p6wcn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  db = client.db("portfolio-crud");
  console.log("Connected to MongoDB successfully!");
}

function getDB() {
  if (!db) {
    throw new Error("Database not connected. Please call connectDB first.");
  }
  return db;
}

module.exports = { connectDB, getDB };
