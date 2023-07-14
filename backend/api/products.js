const productsRouter = require("express").Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
} = require("../db");
const multer = require("multer");

const upload = multer({ dest: "public/images" });

//GET ALL PRODUCTS

productsRouter.get("/", async (req, res) => {
  try {
    console.log("getting all products!");
    const products = await getAllProducts();
    return res.send(products);
  } catch (error) {
    res.status(500).send({ error });
  }
});

//CREATE PRODUCT

productsRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("creating a products!");
    const { user_id, title, description, price, quantity, category_id } =
      req.body;
    console.log(typeof quantity);
    const product = await createProduct({
      user_id: user_id,
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      image: req.file.filename,
      category_id: category_id,
    });

    return res.send(product);
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
});

//UPDATE PRODUCT

productsRouter.patch("/:id", async (req, res) => {
  try {
    const { id, title, description, price, quantity } = req.body;
    const updatedProduct = await updateProduct({
      id: id,
      title: title,
      description: description,
      price: price,
      quantity: quantity,
    });
    return res.send(updatedProduct);
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
});

productsRouter.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    console.error(error);
  }
});

module.exports = productsRouter;
