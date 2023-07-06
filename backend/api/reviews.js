const reviewsRouter = require("express").Router();
const {
  createReview,
  getAllReviews,
  getReviewsByUser,
  getReviewsByProduct,
  destroyReview,
} = require("../db/reviews");

reviewsRouter.post("/", async (req, res) => {
  try {
    const { productId, userId, comment } = req.body;
    const review = await createReview({
      productId: productId,
      userId: userId,
      comment: comment,
    });
    return res.send(review);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

reviewsRouter.get("/", async (req, res) => {
  try {
    const reviews = await getAllReviews();
    return res.send(reviews);
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
});

reviewsRouter.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.username;
    const reviews = await getReviewsByUser(userId);
    return res.send(reviews);
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
});

reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedReview = await destroyReview(id);
    return res.send(deletedReview);
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
});

reviewsRouter.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await getReviewsByProduct(productId);
    return res.send(reviews);
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
});

module.exports = reviewsRouter;
