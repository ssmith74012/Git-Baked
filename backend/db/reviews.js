const { client } = require("./client");

const getAllReviews = async () => {
  try {
    const response = await client.query(`
    SELECT * FROM reviews;
    `);
    const data = response.rows;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getReviewsByProduct = async (productId) => {
  try {
    const response = await client.query(
      `
    SELECT * FROM reviews WHERE product_id = $1;
    `,
      [productId]
    );

    const data = response.rows;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getReviewsByUser = async (userId) => {
  try {
    const response = await client.query(
      `
    SELECT * FROM reviews WHERE user_id = $1;
    `,
      [userId]
    );
    const data = response.rows;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const createReview = async ({ productId, userId, comment }) => {
  try {
    const response = await client.query(
      `
        INSERT INTO reviews (product_id, user_id, comment)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [productId, userId, comment]
    );
    const data = response.rows[0];
    return data;
  } catch (error) {
    console.error(error);
  }
};

const destroyReview = async (reviewId) => {
  try {
    const response = await client.query(
      `
    DELETE FROM reviews WHERE id = $1
    RETURNING *;
    `,
      [reviewId]
    );
    const data = response.rows;
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllReviews,
  getReviewsByProduct,
  getReviewsByUser,
  destroyReview,
  createReview,
};
