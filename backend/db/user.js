const { client } = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ email, username, password, admin }) {
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    if (admin) {
      const response = await client.query(
        `
      INSERT INTO users(email, username, password, admin)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `,
        [email, username, hashPassword, admin]
      );
      const user = response.rows[0];
      delete user.password;
      return user;
    } else {
      const response = await client.query(
        `
        INSERT INTO users(email, username, password) 
        VALUES($1, $2, $3)
        RETURNING *;
      `,
        [email, username, hashPassword]
      );

      const user = response.rows[0];

      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
}

const getAllUsers = async () => {
  try {
    const response = await client.query(`
    SELECT * FROM users;
    `);
    const users = response.rows;
    return users;
  } catch (error) {
    console.error(error);
  }
};

async function getUserByUsername({ username }) {
  try {
    const response = await client.query(
      `
        SELECT * FROM users
        WHERE username =$1;
      `,
      [username]
    );
    const user = response.rows[0];
    return user;
  } catch (error) {
    throw error;
  }
}

const getUser = async ({ username, password }) => {
  try {
    const response = await client.query(
      `
    SELECT * FROM users
    WHERE username = $1
    `,
      [username]
    );
    const user = response.rows[0];

    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
};
async function getUserById(id) {
  try {
    const response = await client.query(
      `
  SELECT * FROM users
  WHERE id=$1
  `,
      [id]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createUser,
  getUserByUsername,
  getUser,
  getUserById,
  getAllUsers,
};
