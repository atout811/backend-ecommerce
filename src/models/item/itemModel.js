const mongoose = require("mongoose");
const { schema } = require("../user/userModel");

const itemScehma = new mongoose.Schema({
  name: String,
  reviews: Number,
  description: String,
  own: { type: mongoose.Schema.Types.ObjectId, ref: "Kart" },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
});

module.exports = mongoose.model("Item", itemScehma);
