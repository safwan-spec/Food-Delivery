const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema(
  {
    title: { type: String },
    picture: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("categories", categorySchema);
