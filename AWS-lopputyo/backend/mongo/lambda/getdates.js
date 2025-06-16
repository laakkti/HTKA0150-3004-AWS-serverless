const hash = require("../../NDVI/utils/hash");
const mongoose = require("mongoose");
const mongodb = require("../../NDVI/mongo/mongodb");
// TSEKKAA TARVVIIKO TÄÄLLÄ MUDOSTAA YHEYTTÄ MINGOON vaan se on mongodb.js sisällä
require("dotenv").config();

module.exports.handler = async (event) => {

  const body = JSON.parse(event.body);
  const geometry = body.geometry;
  
  const mongoURI = process.env.mongoURI;

  let id = hash.sha256(geometry);

  try {
    await mongoose.connect(mongoURI);
    console.log("DB Connected!");
        
    let { dates } = await mongodb.getDates(id);

    if (dates) {
      return dates;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error", error: err.toString() }),
    };
  } finally {
    try {
      await mongoose.connection.close();
      console.log("DB connection closed.");
    } catch (closeErr) {
      console.error("Error closing DB connection:", closeErr);
    }
  }
};
