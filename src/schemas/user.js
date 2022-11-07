const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userName: String,
  Country: String,
  WorldApprovalRating: Number,
  LocalApprovalRating: Number,
  Alliance: String,
  War: String,
  EconomyRating: Number,
  Money: {
    InvestMoney: Number,
    YearlyIncome: Number,
  },
  Population: String,
  Invested: [{ Name: String, Cost: Number }],
  InBank: Number,
  Land: [{ Name: String }],
  Resources: [{ Name: String, Amount: Number }],
  Popularity: Number,
  ArmySize: Number,
  Stock: String,
  NationalBank: {
    Name: String,
    Rate: Number,
    Amount: Number,
  },
  TotalUVR: Number,
  SpecialResource: String,
  SpecialResourceMultiplier: Number,
});

module.exports = model("User", userSchema, "users");
