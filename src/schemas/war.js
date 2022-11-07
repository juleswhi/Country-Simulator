const { Schema, model } = require("mongoose");
const warName = require("./warName")
const alliance = require("./alliance")

const warSchema = new Schema({
  _id: String,
  Name: String,
  AllianceA: {
    AllianceString: String,
    Members: [{ Name: String }],
    MoneyInvested: Number,
    ArmyCount: Number,
  },
  AllianceB: {
    AllianceName: String,
    Members: [{ Name: String }],
    MoneyInvested: Number,
    ArmyCount: Number,
  },
});

module.exports = model("War", warSchema, "wars");
