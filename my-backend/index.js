const express = require("express");
const mongoose = require("mongoose");

const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const dotenv = require("dotenv");
const {
  authenticateMiddleware,
} = require("./middlewares/authenticateMiddleware");

dotenv.config({ path: "./.env" });
console.log(process.env.port);

const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully!");
  });

const Product = require("./models/products");
const User = require("./models/user");
const Order = require("./models/order");

const callMultipleproducts = require("./routes/carts/callproducts");
const addtoCart = require("./routes/carts/addcart");
const placedOrder = require("./routes/order/addorder");
const addnewProduct = require("./routes/product/addproduct");
const showallProduct = require("./routes/product/allproduct");
const deletefromProduct = require("./routes/product/deleteproduct");
const deleteuserData = require("./routes/user/deleteuser");
const userLogin = require("./routes/user/login");
const userLogout = require("./routes/user/logout");
const orderdetailbyID = require("./routes/order/orderDetID");
const allorderHistory = require("./routes/order/orderhistory");
const showproductbyID = require("./routes/product/productID");
const removefromCart = require("./routes/carts/removecart");
const showcartItem = require("./routes/carts/showcart");
const usersignUp = require("./routes/user/signup");
const updatedproductDetails = require("./routes/product/updateproduct");
const showuserDetails = require("./routes/user/userdetails");

app.use(express.json());
app.use("api/carts", callMultipleproducts);
app.use("/api/carts/auth", authenticateMiddleware, addtoCart);
app.use("/api/order/auth", authenticateMiddleware, placedOrder);
app.use("/api/product", addnewProduct);
app.use("/api/product", showallProduct);
app.use("/api/product/auth", authenticateMiddleware, deletefromProduct);
app.use("/api/user/auth", authenticateMiddleware, deleteuserData);
app.use("/api/user", userLogin);
app.use("/api/user", userLogout);
app.use("/api/order", orderdetailbyID);
app.use("/api/order/auth", authenticateMiddleware, allorderHistory);
app.use("/api/product", showproductbyID);
app.use("/api/carts/auth", authenticateMiddleware, removefromCart);
app.use("/api/carts/auth", authenticateMiddleware, showcartItem);
app.use("/api/user", usersignUp);
app.use("/api/product", updatedproductDetails);
app.use("/api/user/auth", authenticateMiddleware, showuserDetails);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on ${port}!`);
});
