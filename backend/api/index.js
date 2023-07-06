const apiRouter = require("express").Router();
const usersRouter = require("./users");
const ordersRouter = require("./orders");
const productsRouter = require("./products");
const getProductsRouter = require("./products");
const reviewsRouter = require("./reviews");
const productOrdersRouter = require("./product_orders");

apiRouter.use("/health", (req, res) => {
  try {
    res.send({ message: "Healthy" });
  } catch (error) {
    console.error(error);
  }
});

apiRouter.use("/users", usersRouter);

apiRouter.use("/orders", ordersRouter);

apiRouter.use("/products", productsRouter);

apiRouter.use("/getProducts", getProductsRouter);

apiRouter.use("/reviews", reviewsRouter);

apiRouter.use("/productorders", productOrdersRouter);

module.exports = apiRouter;
