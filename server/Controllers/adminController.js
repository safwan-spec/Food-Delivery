const adminSchema = require("../Models/Admin");
const customerSchema = require("../Models/Customer");
const orderSchema = require("../Models/Order");
const categorySchema = require("../Models/Category");
const menuSchema = require("../Models/Menus");
const feedbackSchema = require("../Models/Feedback");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "foodDeliveryWebsite";

const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const check = await adminSchema.findOne({ username });
    if (check) {
      res.json({ success: false, message: "Username already exists!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await new adminSchema({
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
const LoginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const check = await adminSchema.findOne({ username });
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
    const admin = await adminSchema.findById(req.admin);
    if (!admin) {
      res.json({ success: false, message: "Admin not found!" });
    } else {
      res.json({ success: true, admin });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

const viewCustomers = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

//categories CRUD
const insertCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const picture = req.file.filename;
    const check = await categorySchema.findOne({ title });
    if (check) {
      res.json({ success: false, message: "Category already exists!" });
    } else {
      const newCategory = await new categorySchema({
        title,
        picture,
      }).save();
      res.json({ success: true, message: "New category inserted!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await categorySchema.find();
    res.json({ success: true, categories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const updateCategory = async (req, res) => {
  try {
    var check = await categorySchema.findById(req.params.id);
    if (!check) {
      res.json({ success: false, message: "Category does not exists!" });
    } else {
      const { title } = req.body;
      const picture = req?.file?.filename;
      const updatedCategory = {};
      if (title) updatedCategory.title = title;
      if (picture) updatedCategory.picture = picture;
      check = await categorySchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedCategory,
        },
        { new: true }
      );
      res.json({ success: true, message: "Category updated!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

//menu crud

const insertMenu = async (req, res) => {
  try {
    const { title, description, category, price, foodType, servings } =
      req.body;
    const picture = req?.file?.filename;
    const check = await menuSchema.findOne({ title, category });
    if (check) {
      res.json({ success: false, message: "Menu already exists!" });
    } else {
      const newMenu = await new menuSchema({
        title,
        picture,
        description,
        category,
        price,
        foodType,
        servings,
        status: "Available",
      }).save();
      res.json({ success: true, message: "New menu added!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

const getMenus = async (req, res) => {
  try {
    const menus = await menuSchema.find().populate("category");
    const categories = await categorySchema.find();
    res.json({ success: true, menus, categories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const getSingleMenu = async (req, res) => {
  try {
    var check = await menuSchema.findById(req.params.id);
    if (!check) {
      res.json({ success: false, message: "Menu does not exists!" });
    } else {
      res.json({ success: true, menu: check });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

const updateMenu = async (req, res) => {
  try {
    var check = await menuSchema.findById(req.params.id);
    if (!check) {
      res.json({ success: false, message: "Menu does not exists!" });
    } else {
      const {
        title,
        description,
        category,
        price,
        foodType,
        servings,
        status,
      } = req.body;
      const picture = req?.file?.filename;
      const updatedMenu = {};
      if (title) updatedMenu.title = title;
      if (picture) updatedMenu.picture = picture;
      if (description) updatedMenu.description = description;
      if (category) updatedMenu.category = category;
      if (price) updatedMenu.price = price;
      if (foodType) updatedMenu.foodType = foodType;
      if (servings) updatedMenu.servings = servings;
      if (status) updatedMenu.status = status;
      check = await menuSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedMenu,
        },
        { new: true }
      );
      res.json({ success: true, message: "Menu updated!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderSchema
      .find()
      .populate("menus.menuId")
      .populate("customerId");
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderSchema.findById(req.params.id);
    if (!order) {
      res.json({ success: false, message: "Order does not exists!" });
    } else {
      const { paymentStatus, orderStatus } = req.body;
      const updatedOrder = {};
      if (paymentStatus) updatedOrder.paymentStatus = paymentStatus;
      if (orderStatus) updatedOrder.orderStatus = orderStatus;
      await orderSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedOrder,
        },
        {
          new: true,
        }
      );
      res.json({ success: true, message: "Order status updated!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const getCustomers = async (req, res) => {
  try {
    const customers = await customerSchema.find();
    res.json({ success: true, customers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackSchema.find();
    res.json({ success: true, feedbacks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
const getCounts = async (req, res) => {
  try {
    const customers = await customerSchema.find();
    const categories = await categorySchema.find();
    const menus = await menuSchema.find({ status: "Available" });
    const orders = await orderSchema.find();
    const filtered = orders.filter((order) => order.status != "Cancelled");
    res.json({
      success: true,
      customers: customers.length,
      categories: categories.length,
      menus: menus.length,
      orders: filtered.length,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};
module.exports = {
  registerAdmin,
  LoginAdmin,
  getProfile,
  viewCustomers,
  insertCategory,
  getCategories,
  updateCategory,
  insertMenu,
  getMenus,
  updateMenu,
  getSingleMenu,
  getOrders,
  updateOrderStatus,
  getCustomers,
  getFeedbacks,
  getCounts,
};
