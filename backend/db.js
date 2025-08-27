const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo successfully");
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

module.exports = connectToMongo;
