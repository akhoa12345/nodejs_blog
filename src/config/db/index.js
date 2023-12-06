const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/f8_education_dev");
    console.log("MongoDB connect successfullly!!!");
  } catch (error) {
    console.log("MongoDB connect failure!!!");
  }
}

module.exports = { connect };
