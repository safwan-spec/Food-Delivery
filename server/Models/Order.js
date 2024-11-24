const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    menus: [
      {
        menuId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "menu",
        },
        quantity: { type: String },
        total: { type: String },
      },
    ],
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    location: { type: String },
    city: { type: String },
    pinCode: { type: String },
    message: { type: String },
    paymentStatus: { type: String },
    totalAmount: { type: String },
    transactionId: { type: String },
    orderStatus: { type: String },
    feedback: { type: String },
    ratings: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
