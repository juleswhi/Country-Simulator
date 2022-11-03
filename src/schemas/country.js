const { Schema, model } = require("mongoose");

const countrySchema = new Schema({
  _id: Schema.Types.ObjectId,
  country: String,
  population: Number
});

module.exports = model("Country", countrySchema, "countries");