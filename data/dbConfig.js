const knex = require("knex");
const knexConfig = require("../knexfile.js");

// deployment
const envirnment = process.env.NODE_ENV || "development";

// testing
// const envirnment = process.env.DB_ENV || "development"

module.exports = knex(knexConfig[envirnment]);
