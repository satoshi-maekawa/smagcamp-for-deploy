import React, { useRef } from 'react';
import picture from '../image/picture.svg';
const API_URL = "https://maekawa-smagcamp1.onrender.com";

export const BringList = (props) => {
  const refBringItem = useRef(props.BringItem);
  const refPutBringItem = useRef(props.putBringItem);

  const removeBringItem = (e) => {
    const targetName = e.target.closest('td').previousElementSibling.firstElementChild;
    const targetIndex = refBringItem.current.findIndex((el) =>
      el.some((el2) => el2.itemName === targetName.innerText)
    );
    const updatedBringItem = refBringItem.current.map((el, index) =>
      index === targetIndex
        ? el.map((el2) =>
            el2.itemName === targetName.innerText ? { ...el2, isComp: !el2.isComp } : el2
          )
        : el
    );
    refBringItem.current = updatedBringItem;
    // props.setBringItem(updatedBringItem);
  };

  const showTable = (e) => {
    const targetTable = e.target.nextElementSibling;
    targetTable.classList.toggle('none');
  };

  const isCompChange = (e) => {
    let putItem = refPutBringItem.current;
    console.log('putItem', putItem);
    const targetId = Number(e.target.id);
    let targetCheck = e.target.checked;
    if (e.target.closest('label').className === 'toggle-button-002') targetCheck = !targetCheck;
    let result = putItem.map((el) => {
      if (el.id === targetId) {
        return { ...el, isComp: targetCheck };
      } else {
        return el;
      }
    });
    console.log('result', result);
    refPutBringItem.current = result;
    // props.setPutBringItem(result);
  };

  const putCompleteList = async () => {
    try {
      props.setBringItem(refBringItem.current);
      props.setPutBringItem(refPutBringItem.current);
      const res = await fetch(`${API_URL}/changeCompItems`, {
      // const res = await fetch('http://localhost:8080/changeCompItems', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refPutBringItem.current),
      });
      const result = await res.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mainBrock">
        {Array.isArray(refBringItem.current) &&
          refBringItem.current
            .map((elm1) => elm1.filter((elm2) => !elm2.isComp))
            .map(
              (el, index) =>
                el.length !== 0 && (
                  <React.Fragment key={index}>
                    <p className="categoryTitle" onClick={showTable}>
                      {index === 0
                        ? 'ギア'
                        : index === 1
                        ? '食材'
                        : index === 2
                        ? '調理器具'
                        : '日用品'}
                    </p>
                    <table border="1" className="none">
                      <thead>
                        <tr>
                          <th>写真</th>
                          <th>名前</th>
                          <th>準備完了！</th>
                        </tr>
                      </thead>
                      <tbody>
                        {el
                          .filter((elm) => !elm.isComp)
                          .map((el2, index2) => (
                            <tr key={el2.id}>
                              <td align="center">
                                <img src={picture} alt="pictureImg" className="btn pictureBtn" />
                              </td>
                              <td align="center">
                                <p className="allItemName">{el2.itemName}</p>
                              </td>
                              <td align="center">
                                <label
                                  className={
                                    !el2.isComp ? 'toggle-button-001' : 'toggle-button-002'
                                  }
                                >
                                  <input
                                    id={el2.id}
                                    type="checkbox"
                                    className="allItemBringCheck"
                                    onChange={(e) => {
                                      removeBringItem(e);
                                      isCompChange(e);
                                    }}
                                  />
                                </label>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </React.Fragment>
                )
            )}
      </div>

      <div className="bottomBrock">
        <button
          onClick={() => {
            props.pageChange('CompleteList');
            putCompleteList();
          }}
        >
          完了済アイテム
        </button>
        <button onClick={() => props.pageChange('ItemList')}>戻る</button>
      </div>
    </>
  );
};
