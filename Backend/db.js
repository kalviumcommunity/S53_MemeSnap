const mongoose = require("mongoose");

let mongoConnection;

async function ConnectToDB() {
  try {
    const mongoUri = process.env.MONGO_URI;
    mongoConnection = await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB database.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    
  }
}

async function stopDatabase() {
  if (!mongoConnection) return;

  await mongoConnection.close();
  mongoConnection = null;

  console.log('Disconnected from local MongoDB database.');
}

function isConnected() {
  return mongoConnection && mongoConnection.readyState === 1;
}

module.exports = { ConnectToDB, stopDatabase, isConnected };
