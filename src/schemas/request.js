const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
  _id: String,
  requestingUser: String,
  requestingAlliance: String,
  Date: String
});

module.exports = model("Request", requestSchema, "requests");