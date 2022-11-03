const { Schema, model } = require("mongoose");

const sectorSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Name: String,
  Benefit: [String],
  Rating: Number,
});

module.exports = model("Sector", sectorSchema, "sectors");
