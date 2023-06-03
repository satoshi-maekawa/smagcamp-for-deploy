const { tab } = require("@testing-library/user-event/dist/tab");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("itemTbl", function (table) {
        table.integer("id").primary();
        table.string("itemName", 64).notNullable();
        table.boolean("isBring").notNullable();
        table.bigInteger("accunt_id").notNullable();
        table.foreign("accunt_id").references("accuntTbl.id");
        table.bigInteger("categoryName_id").notNullable();
        table.foreign("categoryName_id").references("categoryTbl.id");
        table.bigInteger("itemPhoto_id").notNullable();
        table.foreign("itemPhoto_id").references("itemphotoTbl.id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("itemTbl");
};
