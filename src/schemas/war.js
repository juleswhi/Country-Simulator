const { Schema, model } = require("mongoose");

const warSchema = new Schema({
  _id: Schema.Types.ObjectId,
  CountryA: String,
  CountryB: String
});

module.exports = model("War", warSchema, "wars");