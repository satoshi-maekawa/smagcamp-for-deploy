const { tab } = require("@testing-library/user-event/dist/tab");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("accuntTbl", function (table) {
        table.integer("id").primary();
        table.string("name", 32).notNullable();
        table.string("password", 32).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("accuntTbl");
};
