const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedbackSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    subject: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedback", feedbackSchema);
