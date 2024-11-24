const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  registerAdmin,
  LoginAdmin,
  viewCustomers,
  insertCategory,
  getCategories,
  updateCategory,
  getProfile,
  insertMenu,
  getMenus,
  updateMenu,
  getSingleMenu,
  getOrders,
  updateOrderStatus,
  getCustomers,
  getFeedbacks,
  getCounts,
} = require("../Controllers/adminController");
const { verifyAdminToken } = require("../Middleware/authAdmin");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads/admin");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", registerAdmin);
router.post("/login", LoginAdmin);
router.get("/getProfile", verifyAdminToken, getProfile);
//category
router.post(
  "/insertCategory",
  verifyAdminToken,
  upload.single("picture"),
  insertCategory
);
router.put(
  "/updateCategory/:id",
  verifyAdminToken,
  upload.single("picture"),
  updateCategory
);
router.get("/getCategories", verifyAdminToken, getCategories);
//menu
router.post(
  "/insertMenu",
  verifyAdminToken,
  upload.single("picture"),
  insertMenu
);
router.put(
  "/updateMenu/:id",
  verifyAdminToken,
  upload.single("picture"),
  updateMenu
);
router.get("/getMenus", verifyAdminToken, getMenus);
router.get("/getSingleMenu/:id", verifyAdminToken, getSingleMenu);

router.get("/getOrders", verifyAdminToken, getOrders);
router.get("/getCounts", verifyAdminToken, getCounts);
router.get("/getCustomers", verifyAdminToken, getCustomers);
router.get("/getFeedbacks", verifyAdminToken, getFeedbacks);
router.put("/updateOrderStatus/:id", verifyAdminToken, updateOrderStatus);
module.exports = router;
