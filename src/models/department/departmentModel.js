const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  depName: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = mongoose.model("Department", departmentSchema);
