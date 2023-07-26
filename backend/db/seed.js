const {
  client,
  createUser,
  createProduct,
  getUsers,
  createOrders,
  createProductOrders,
  getUserById,
} = require("./");

const { createReview } = require("./reviews");

const data = require("./data");

const createDB = async () => {
  try {
    console.log("Creating Tables");
    await client.query(
      `
    DROP TABLE IF EXISTS product_orders;
    DROP TABLE IF EXISTS categories CASCADE; 
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;    
    DROP TABLE IF EXISTS reviews CASCADE;
    
    CREATE TABLE categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
        
    );
    
    CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     username VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     admin BOOLEAN DEFAULT 'false'  
    );
        
    CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL NOT NULL,
    quantity INT NOT NULL,
    image VARCHAR (255),
    category_id INT REFERENCES categories(id)
  );
    
    CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        status VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES products(id),
      user_id INT REFERENCES users(id),
      comment TEXT 
    );
    
    CREATE TABLE product_orders(
        id SERIAL PRIMARY KEY,
        product_id INT REFERENCES products(id),
        cartprice DECIMAL NOT NULL,
        order_id INT REFERENCES orders(id),
        cartquantity INT NOT NULL,
        cartuser_id INT REFERENCES users(id)
    );
        `
    );
  } catch (error) {
    console.error(error);
  }
};

async function createInitialUser() {
  try {
    const usersToCreate = [
      {
        email: "admin@gmail.com",
        username: "admin",
        password: "password",
        admin: true,
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createInitialReviews() {
  try {
    await createReview({
      productId: 1,
      userId: 1,
      comment: "This thing is cool",
    });
  } catch (error) {
    console.error(error);
  }
}

async function createCategories() {
  try {
    const categories = [
      { name: "cookies" },
      { name: "bagels" },
      { name: "cakes" },
    ];
    for (let category of categories) {
      await client.query(
        `
        INSERT INTO categories (name) VALUES ($1)`,
        [category.name]
      );
    }
  } catch (error) {
    console.error("Error creating category!");
    throw error;
  }
}
async function createInitialProducts() {
  try {
    const products = data.products;

    products.forEach(async (product) => {
      await createProduct({
        user_id: product.user_id,
        title: product.name,
        description: product.description,
        price: product.price,
        quantity: 50,
        category_id: product.category_id,
        image: product.image,
      });
    });
  } catch (error) {
    throw error;
  }
}
async function createInitialOrder() {
  try {
    // const [user] = await getAllUsers();
    await createOrders({
      user_id: 1,
      status: "pending",
    });
  } catch (error) {
    throw error;
  }
}
async function createProductOrder() {
  try {
    await createProductOrders({
      product_id: 1,
      cartprice: 100.0,
      order_id: 1,
      cartquantity: 10,
    });
  } catch (error) {
    throw "No Product Order";
  }
}
const seedDB = async () => {
  try {
    client.connect();
    await createDB();
    await createInitialUser();
    console.log("Created User");
    await createCategories();
    console.log("Created Categories");
    await createInitialProducts();
    console.log("Created products");
    await createInitialOrder();
    console.log("Created Order");
    await createProductOrder();
    console.log("Created Product Order");
    await createInitialReviews();
    console.log("Created Reviews");
    console.log("Done!!!");
  } catch (error) {}
};

seedDB();
