const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/foodDeliveryWebsite";
// const MONGO_URI = "mongodb://127.0.0.1:27017/foodDeliveryWebsite";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDb connection established!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongoDb;
