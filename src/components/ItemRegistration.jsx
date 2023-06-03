import React, { useState } from "react";
const API_URL = "https://maekawa-smagcamp1.onrender.com";

export const ItemRegistration = (props) => {
  const [itemName, setItemName] = useState("");
  const [categoryNameId, setCategoryNameId] = useState("");

  const itemDataPost = async () => {
    //データベースにPOSTする処理
    try {
      const data = {
        itemName: itemName,
        categoryName_id: categoryNameId,
        accunt_id: 1,
        itemPhoto: null,
      };
      const res = await fetch(`${API_URL}/addItems`, {
      // const res = await fetch("http://localhost:8080/addItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.text();
      console.log(result);
      setItemName("");
      if (result === "アイテム登録完了") {
        props.fetchItem();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemNameChange = (e) => {
    console.log(e.target.value);
    setItemName(e.target.value);
    console.log(itemName);
  };

  const handleCategoryNameChange = (e) => {
    console.log(e.target.value);
    setCategoryNameId(e.target.value);
    console.log(categoryNameId);
  };

  return (
    <>
      <div className="mainBrock">
        <label>カテゴリー</label>
        <select
          className="input"
          onChange={handleCategoryNameChange}
          defaultValue=""
        >
          <option value="" disabled>
            カテゴリーを選択してください
          </option>
          <option value={1}>ギア</option>
          <option value={2}>食材</option>
          <option value={3}>調理器具</option>
          <option value={4}>日用品</option>
        </select>

        <label>アイテム名</label>
        <input
          type="text"
          className="input"
          value={itemName}
          onChange={handleItemNameChange}
        ></input>
      </div>
      <div className="bottomBrock">
        <button onClick={itemDataPost}>追加</button>
        <button onClick={() => props.pageChange("ItemList")}>戻る</button>
      </div>
    </>
  );
};
