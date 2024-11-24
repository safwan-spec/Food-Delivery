const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menu",
    },
    quantity: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
