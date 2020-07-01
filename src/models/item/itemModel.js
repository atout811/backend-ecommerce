const mongoose = require("mongoose");

const itemScehma = new mongoose.Schema({
  name: { type: String, required: true },
  reviews: { type: Number },
  description: { type: String },
  image: { type: Buffer },
  quantity: { type: Number },
  own: { type: mongoose.Schema.Types.ObjectId, ref: "Kart" },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
});

module.exports = mongoose.model("Item", itemScehma);
