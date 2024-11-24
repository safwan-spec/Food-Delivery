const express = require("express");
const connectToMongoDb = require("./db");
connectToMongoDb();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", require("./Routes/adminRoutes"));
app.use("/uploads/admin", express.static("./Uploads/admin"));
app.use("/customerUploads/admin", express.static("./Uploads/customer"));

app.use("/customer", require("./Routes/customerRoutes"));
app.use("/uploads/customer", express.static("./Uploads/admin"));
app.use("/customerUploads/customer", express.static("./Uploads/customer"));
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
  //   console.log("Server is listening on" + PORT);
});
