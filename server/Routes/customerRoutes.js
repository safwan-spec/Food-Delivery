const express = require("express");

const router = express.Router();
const {
  getCategoriesAndProducts,
  getSingleMenu,
  LoginCustomer,
  getProfile,
  registerCustomer,
  addMenuIntoCart,
  viewCart,
  removeMenuFromCart,
  updateCartQuantity,
  placeOrder,
  getOrders,
  sendFeedback,
  submitFeedback,
} = require("../Controllers/customerController");
const { verifyCustomer } = require("../Middleware/authCustomer");
router.get("/getCategoriesAndProducts", getCategoriesAndProducts);
router.get("/getSingleMenu/:id", getSingleMenu);
router.post("/registerCustomer", registerCustomer);
router.post("/LoginCustomer", LoginCustomer);
router.get("/getProfile", verifyCustomer, getProfile);

router.post("/addMenuIntoCart/:menuId", verifyCustomer, addMenuIntoCart);
router.get("/viewCart", verifyCustomer, viewCart);
router.delete("/removeMenuFromCart/:id", verifyCustomer, removeMenuFromCart);
router.put("/updateCartQuantity/:id", verifyCustomer, updateCartQuantity);
//orders
router.get("/getOrders", verifyCustomer, getOrders);
router.post("/placeOrder", verifyCustomer, placeOrder);
router.post("/sendFeedback", verifyCustomer, sendFeedback);
router.put("/submitFeedback/:id", verifyCustomer, submitFeedback);

module.exports = router;
