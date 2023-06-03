
require("dotenv").config({
    path: ".env",
})
module.exports = {
    development: {
        client: "pg",
        connection: {
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: "./db/migrations",
        },
        seeds: { directory: "./db/seeds" },
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: "./db/migrations",
        },
        seeds: { directory: "./db/seeds" },
    }
};