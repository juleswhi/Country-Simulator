const { Schema, model } = require("mongoose");

const warNameSchema = new Schema({
  _id: String,
  Name: String,
  // Date: String
});

module.exports = model("WarName", warNameSchema, "warNames");
