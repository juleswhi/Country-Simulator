const { Schema, model } = require("mongoose");

const resourceSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Name: String,
  UniversalValueRating: Number,
});

module.exports = model("Resource", resourceSchema, "resources");
