const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'communitySeva';
let db;

const connectDB = async () => {
  if (db) return db;

  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db(dbName);
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
