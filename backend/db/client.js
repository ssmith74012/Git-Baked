const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: "gitbakeduser",
  password: "password1",
  database: "Git-Baked",
});
module.exports = { client };
