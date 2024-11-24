const customerSchema = require("../Models/Customer");
const categorySchema = require("../Models/Category");
const menuSchema = require("../Models/Menus");
const cartSchema = require("../Models/Cart");
const orderSchema = require("../Models/Order");
const feedbackSchema = require("../Models/Feedback");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "foodDeliveryWebsite";

const getCategoriesAndProducts = async (req, res) => {
  try {
    const allMenus = await menuSchema
      .find({ status: "Available" })
      .populate("category");
    const allCategories = await categorySchema.find();
    res.json({ success: true, menus: allMenus, categories: allCategories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const getSingleMenu = async (req, res) => {
  try {
    const singleMenu = await menuSchema
      .findById(req.params.id)
      .populate("category");
    if (!singleMenu) {
      res.json({ success: false, message: "Menu does not exists!" });
    } else {
      const allMenus = await menuSchema.find().populate("category");
      const relatedMenus = allMenus.filter(
        (menu) => menu?.id !== req.params.id
      );
      res.json({ success: true, singleMenu, relatedMenus });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

const registerCustomer = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const check = await customerSchema.findOne({ username });
    if (check) {
      res.json({ success: false, message: "Username already exists!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await new customerSchema({
        username,
        email,
        password: hashedPassword,
      }).save();
      res.json({ success: true, message: "New account created successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const LoginCustomer = async (req, res) => {
  try {
    const { username, password } = req.body;
    const check = await customerSchema.findOne({ username });
    if (!check) {
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const matchPassword = await bcrypt.compare(password, check.password);
      if (!matchPassword) {
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        const token = await jwt.sign(check.id, SECRET_KEY);
        res.json({ success: true, token, message: "Logged in successfully!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const getProfile = async (req, res) => {
  try {
    const customer = await customerSchema.findById(req.customer);
    if (!customer) {
      res.json({ success: false, message: "Admin not found!" });
    } else {
      res.json({ success: true, customer });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

const addMenuIntoCart = async (req, res) => {
  try {
    const customerId = req.customer;
    const menuId = req.params.menuId;
    const checkMenuInCart = await cartSchema.findOne({ customerId, menuId });
    if (checkMenuInCart) {
      const updatedCart = {};
      updatedCart.quantity = +checkMenuInCart.quantity + +1;
      await cartSchema.findByIdAndUpdate(
        checkMenuInCart.id,
        { $set: updatedCart },
        { new: true }
      );
      res.json({ success: true, message: "Cart updated!" });
    } else {
      const newMenu = await new cartSchema({
        customerId,
        menuId,
        quantity: 1,
      }).save();
      res.json({ success: true, message: "Menu added to Cart!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

const viewCart = async (req, res) => {
  try {
    const cartData = await cartSchema
      .find({ customerId: req.customer })
      .populate("menuId");
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const removeMenuFromCart = async (req, res) => {
  try {
    const cartData = await cartSchema.findById(req.params.id);
    if (!cartData) {
      res.json({ success: false, message: "Cart not found!" });
    } else {
      await cartSchema.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Menu deleted from the cart!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const updateCartQuantity = async (req, res) => {
  try {
    const cartData = await cartSchema.findById(req.params.id);
    if (!cartData) {
      res.json({ success: false, message: "Cart not found!" });
    } else {
      const { quantity } = req.body;
      const updatedCart = {};
      updatedCart.quantity = quantity;
      await cartSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedCart },
        { new: true }
      );
      res.json({ success: true, message: "Cart quantity updated!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

const placeOrder = async (req, res) => {
  try {
    const {
      menus,
      name,
      phone,
      email,
      address,
      location,
      city,
      pinCode,
      message,
      totalAmount,
      transactionId,
    } = req.body;
    const newOrder = await new orderSchema({
      customerId: req.customer,
      menus,
      name,
      phone,
      email,
      address,
      location,
      city,
      pinCode,
      message,
      totalAmount,
      transactionId,
      paymentStatus: "Initiated",
      orderStatus: "Placed",
    }).save();
    res.json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const submitFeedback = async (req, res) => {
  try {
    const order = await orderSchema.findById(req.params.id);
    if (!order) {
      res.json({ success: false, message: "Order does not exists!" });
    } else {
      const { feedback, ratings } = req.body;
      const updatedOrder = {};
      if (feedback) updatedOrder.feedback = feedback;
      if (ratings) updatedOrder.ratings = ratings;
      await orderSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedOrder,
        },
        { new: true }
      );
      res.json({ success: true, message: "Feedback submitted!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderSchema
      .find({ customerId: req.customer })
      .populate("menus.menuId");
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

const sendFeedback = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newFeedback = await new feedbackSchema({
      name,
      email,
      subject,
      message,
    }).save();
    res.json({
      success: true,
      message: "Message has been sent!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

module.exports = {
  getCategoriesAndProducts,
  getSingleMenu,
  registerCustomer,
  LoginCustomer,
  getProfile,
  addMenuIntoCart,
  viewCart,
  removeMenuFromCart,
  updateCartQuantity,
  placeOrder,
  getOrders,
  sendFeedback,
  submitFeedback,
};
