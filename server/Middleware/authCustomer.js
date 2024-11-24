const jwt = require("jsonwebtoken");
const SECRET_KEY = "foodDeliveryWebsite";

const verifyCustomer = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      res.json({ success: false, message: "Token not provided!" });
    } else {
      const customerId = await jwt.verify(token, SECRET_KEY);
      req.customer = customerId;
      next();
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error occurred!" });
  }
};

module.exports = { verifyCustomer };
