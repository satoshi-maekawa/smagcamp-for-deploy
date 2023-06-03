/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categoryTbl').del()
  await knex('categoryTbl').insert([
    { id: 1, categoryName: 'ギア' },
    { id: 2, categoryName: '食材' },
    { id: 3, categoryName: '調理器具' },
    { id: 4, categoryName: '日用品' }
  ]);
};
