const { client } = require("./client");

async function createCategories({ name }) {
    try {
        const response = await client.query(
            `
              INSERT INTO categories(name) 
              VALUES($1)
              RETURNING *;
            `,
            [name]
          );
         
          return response;
    } catch (error) {
      throw error;
    }
  }

module.exports = {createCategories};
