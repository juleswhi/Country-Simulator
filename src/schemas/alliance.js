const { Schema, model } = require("mongoose");

const allianceSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Name: String,
  Members: [
    { Name: String, MoneyContributed: Number, Chairman: Boolean }
  ],
  Money: Number,
  JoinFee: Number
});

module.exports = model("Alliance", allianceSchema, "alliances");
