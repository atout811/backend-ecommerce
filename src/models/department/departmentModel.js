const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  depName: { type: String, required: true },
  items: [
    {
      itemName: String,
      review: Number,
      description: String,
      price: Number,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Department", departmentSchema);
