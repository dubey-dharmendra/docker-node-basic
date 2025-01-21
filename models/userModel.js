const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, require: true },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    email: { type: String, unique: true, require: true },
    password: {
      type: String,
      unique: true,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = new mongoose.model("User", userSchema);
