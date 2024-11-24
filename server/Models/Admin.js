const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { Schema } = mongoose;
const adminSchema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    profile: { type: String, default: "admin.jpg" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admin", adminSchema);
