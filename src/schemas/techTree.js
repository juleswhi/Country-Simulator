const { Schema, model } = require("mongoose");

const techSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Name: String,
  
});

module.exports = model("TechTree", techSchema, "TechTrees");