const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = new mongoose.model("Item", itemSchema);
