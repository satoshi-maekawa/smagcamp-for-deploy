/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('itemTbl').insert([
    { id: 1, itemName: 'テント', isBring: false, accunt_id: 1, categoryName_id: 1, itemPhoto_id: 1, isComp: false },
    { id: 2, itemName: 'イス', isBring: false, accunt_id: 1, categoryName_id: 1, itemPhoto_id: 2, isComp: false },
    { id: 3, itemName: 'ランタン', isBring: false, accunt_id: 1, categoryName_id: 1, itemPhoto_id: 2, isComp: false },
    { id: 4, itemName: '肉', isBring: false, accunt_id: 1, categoryName_id: 2, itemPhoto_id: 2, isComp: false },
    { id: 5, itemName: 'パン', isBring: false, accunt_id: 1, categoryName_id: 2, itemPhoto_id: 2, isComp: false },
    { id: 6, itemName: 'フライ返し', isBring: false, accunt_id: 1, categoryName_id: 3, itemPhoto_id: 2, isComp: false },
    { id: 7, itemName: 'マルチグリドル', isBring: false, accunt_id: 1, categoryName_id: 3, itemPhoto_id: 2, isComp: false },
    { id: 8, itemName: '調味料', isBring: false, accunt_id: 1, categoryName_id: 3, itemPhoto_id: 2, isComp: false },
    { id: 9, itemName: '食器洗剤・スポンジ', isBring: false, accunt_id: 1, categoryName_id: 4, itemPhoto_id: 2, isComp: false },
    { id: 10, itemName: 'スキンケア', isBring: false, accunt_id: 1, categoryName_id: 4, itemPhoto_id: 2, isComp: false },
    { id: 11, itemName: 'お風呂セット', isBring: false, accunt_id: 1, categoryName_id: 4, itemPhoto_id: 2, isComp: false }

  ]);
};
