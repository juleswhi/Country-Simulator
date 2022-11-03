const { Schema, model } = require("mongoose");

const companySchema = new Schema({
  _id: Schema.Types.ObjectId,
  Name: String,
  Sector: String,
  Symbol: String,
});

module.exports = model("Company", companySchema, "companies");
