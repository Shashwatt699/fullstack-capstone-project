require('dotenv').config();
console.log("Loaded MONGO_URL:", process.env.MONGO_URL);
const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = process.env.MONGO_URL;
if (!url) {
    console.error("❌ MONGO_URL is missing or invalid");
    process.exit(1);
}

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance; // Return the cached DB instance
    }

    const client = new MongoClient(url);

    // Connect to MongoDB
    await client.connect();

    // Connect to database giftdb and store in dbInstance
    dbInstance = client.db(dbName);

    console.log("Connected to MongoDB:", dbName);
    return dbInstance;
}

module.exports = connectToDatabase;
