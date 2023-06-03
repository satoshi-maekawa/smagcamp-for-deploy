import React from 'react';
import campImg from '../image/campIcon.svg';
import picture from '../image/picture.svg';

export const ItemList = (props) => {
  const { putBringItem, setPutBringItem } = props;
  let user = localStorage.getItem('user');
  const logout = () => {
    props.pageChange('Login');
    localStorage.removeItem('user');
  };
  const isBringChange = (e) => {
    const targetId = Number(e.target.id);
    let targetCheck = e.target.checked;
    if (e.target.closest('label').className === 'toggle-button-002') {
      targetCheck = !targetCheck;
    }
    const result = putBringItem.map((el) => {
      return el.id === targetId ? { ...el, isBring: targetCheck } : el;
    });
    setPutBringItem(result);
  };

  const showTable = (e) => {
    const targetTable = e.target.nextElementSibling;
    targetTable.classList.toggle('none');
  };

  const putBringList = async () => {
    try {
      const res = await fetch('http://localhost:8080/changeBringItems', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putBringItem),
      });
      const result = await res.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <label className="toggle-button-002">
        <input type="checkbox" className="allItemBringCheck"></input>
      </label> */}
      <div className="headerBrock">
        <p>Welcome {user}</p>
        <button className="btn logOutBtn" onClick={logout}>
          Log out
        </button>
      </div>
      <div className="mainBrock">
        {props.allItems.map(
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
                      <th>持ってく？</th>
                    </tr>
                  </thead>

                  <tbody>
                    {el.map((el2, index2) => (
                      <tr key={el2.id}>
                        <td align="center">
                          <img src={picture} alt="pictureImg" className="btn pictureBtn"></img>
                        </td>
                        <td align="center">
                          <p className="allItemName">{el2.itemName}</p>
                        </td>
                        <td align="center">
                          <label
                            className={!el2.isBring ? 'toggle-button-001' : 'toggle-button-002'}
                          >
                            <input
                              id={el2.id}
                              type="checkbox"
                              className="allItemBringCheck"
                              onChange={isBringChange}
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
        <button className="btn liftBtn">全解除</button>
        <button onClick={() => props.pageChange('ItemRegistration')} className="btn">
          アイテム追加
        </button>
        <img
          src={campImg}
          alt="campImage"
          className="campImg"
          onClick={() => {
            props.pageChange('BringList');
            // props.getPreparationList();
            // console.log('preparationList:', props.preparationList);
            putBringList();
          }}
        ></img>
      </div>
    </>
  );
};
