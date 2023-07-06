const {
  createOrders,
  getProductById,
  destroyOrderById,
  getOrdersByUser,
  getAllOrders,
} = require("../db/orders");

const ordersRouter = require("express").Router();

ordersRouter.get("/:orders", async (req, res) => {
  const orders = await getAllOrders();
  res.send(orders);
});

ordersRouter.post("/", async (req, res) => {
  try {
    const { user_id, status } = req.body;
    const newOrder = await createOrders({ user_id, status });
    res.send(newOrder);
  } catch (error) {
    throw error;
  }
});

ordersRouter.get("/:userid/orders", async (req, res) => {
  console.log("Hi");
  try {
    const user = req.params.userid;
    console.log("hi");
    const orders = await getOrdersByUser(user);
    console.log(orders);
    res.send(orders);
  } catch (error) {
    console.error(error);
  }
});

ordersRouter.get("/:userid/products", async (req, res) => {
  try {
    const userId = req.params.userid;

    const products = await getProductById(userId);
    res.send(products);
  } catch (error) {
    console.error(error);
  }
});

//getting order by userid
// by order_id

//patch
//product to order
//change to active
ordersRouter.patch("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);
  const { name, description } = req.body;
  console.log(name, description);
  const updatedOrder = await getOrdersByUser({
    id: orderId,
    name,
    description,
  });
  console.log(updatedOrder);
  res.send(updatedOrder);
});
//delete Orders

ordersRouter.delete("/:ordersId", async (req, res) => {
  const id = req.params.orderId;
  const deletedOrders = await destroyOrderById(id);
  res.send(deletedOrders[0]);
});

module.exports = ordersRouter;
