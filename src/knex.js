// knexの橋渡し用
const config = require("../knexfile");
const knex = require("knex");
// const environment = process.env.DATABASE_URL ? "production" : "development";
const environment = process.env.REACT_APP_DATABASE_URL ? "production" : "development";

module.exports = knex(config[environment]);