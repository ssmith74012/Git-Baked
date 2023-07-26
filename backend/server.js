const express = require("express");

const apiRouter = require("express").Router();
const usersRouter = require("./api/users");
const ordersRouter = require("./api/orders");
const productsRouter = require("./api/products");
const getProductsRouter = require("./api/products");
const reviewsRouter = require("./api/reviews");
const productOrdersRouter = require("./api/product_orders");
const { getUserById } = require("./db/user");

const { client } = require("./db/client");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const server = express();
server.use(cors());
server.use(express.json());
const JWT_SECRET = "myfavouritecolourisblue";

server.use(async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    return next();
  }
  console.log("the token is", token);
  const decodedToken = jwt.verify(token, JWT_SECRET);
  console.log("the decoded token is", decodedToken);
  const user = await getUserById(decodedToken.id);
  delete user.password;
  req.user = user;
  return next();
});

server.use("/users", usersRouter);
server.use("/orders", ordersRouter);
server.use("/products", productsRouter);
server.use("/getProducts", getProductsRouter);
server.use("/reviews", reviewsRouter);
server.use("/productorders", productOrdersRouter);

server.listen(3001, () => {
  client.connect();
  console.log("The server is up on port 3001");
});
