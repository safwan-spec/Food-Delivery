const mongoose = require("mongoose");
const { Schema } = mongoose;
const customerSchema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    profile: { type: String, default: "customer.jpg" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("customer", customerSchema);
