/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('itemTbl').del()
  await knex('accuntTbl').del()
  await knex('accuntTbl').insert([
    { id: 1, name: 'admin', password: 'admin' }
  ]);
};
