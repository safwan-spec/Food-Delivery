const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const menuSchema = new Schema(
  {
    title: { type: String },
    picture: { type: String },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    price: { type: String },
    foodType: { type: String },
    servings: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("menu", menuSchema);
