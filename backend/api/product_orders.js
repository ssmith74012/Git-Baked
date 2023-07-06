const productOrdersRouter = require("express").Router();

const {
  addProductToOrder,
  getAllProductOrders,
  updateProductOrder,
  destroyProductOrder,
} = require("../db/product_orders");

//Add product to order:

productOrdersRouter.post("/", async (req, res) => {
  try {
    const { product_id, price, order_id, quantity } = req.body;
    const productOrder = await addProductToOrder({
      product_id: product_id,
      price: price,
      order_id: order_id,
      quantity: quantity,
    });
    return res.send(productOrder);
  } catch (error) {
    console.error(error);
  }
});

//Get all product orders:

productOrdersRouter.get("/", async (req, res) => {
  try {
    const productOrders = await getAllProductOrders();
    return res.send(productOrders);
  } catch (error) {
    console.error(error);
  }
});
//PATCH all products orders:
productOrdersRouter.patch("/cartproductId", async (req, res) => {
  try {
    const { product_id, cartquantity, order_id } = req.body;
    const updateCart = await updateProductOrder({
      product_id: product_id,
      cartquantity: cartquantity,
      order_id: order_id,
    });
    return res.send(updateCart);
  } catch (error) {
    console.error(error);
  }
});

//DELETE product orders:
productOrdersRouter.delete("/:cartproductId", async (req, res) => {
  try {
    const id = req.params.cartproductId;
    const deleteItem = await destroyProductOrder(id);
    res.send(deleteItem);
  } catch (error) {
    console.error(error);
  }
});

module.exports = productOrdersRouter;
