const knex = require('./knex.js');
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8080;
// const PORT = 8080;

app.use('/', express.static('../public'));

// ↓local環境で開発時ブラウザのセキュリティ機能により異なるオリジン間のリクエストが制限されている。
// npm install corsでミドルウェアを入れ、以下のように使用することでエラーを回避できるそです。
app.use(cors());

// ↓受信されるリクエストボディに 'application/json'というContent-Type headerがあるときにJSONをパースするミドルウェアが追加される。
// このミドルウェアが使われるときは、JSON.parseやJSON.stringifyをしなくてもよい。
app.use(express.json());

// 登録されているアイテムを全て取得するAPI
app.get('/allItems', async (req, res) => {
  const allItems = await function () {
    return knex
      .select({
        id: 'id',
        itemName: 'itemName',
        isBring: 'isBring',
        accunt_id: 'accunt_id',
        categoryName_id: 'categoryName_id',
        itemPhoto_id: 'itemPhoto_id',
        isComp: 'isComp',
      })
      .from('itemTbl');
  };
  const result = await allItems();
  // console.log("result:", result);
  res.send(result);
});

// アイテムを新規登録するAPI
// 想定req
// {
//     "itemName": "ナイフ",
//     "categoryName_id": 3,
//     "accunt_id": 1,
//     "itemPhoto": "https://unsplash.com/ja/%E5%86%99%E7%9C%9F/z9AormQ0e90"
//  }
app.post('/addItems', async (req, res) => {
  const { itemName, categoryName_id, accunt_id, itemPhoto } = req.body;
  //ここにあとでitemphotoTblにPostするAIPを走らせて、IDを取得する
  let id;
  await knex('itemTbl')
    .max('id')
    .then((maxid) => {
      maxid === null ? (id = 0) : (id = maxid[0].max);
    });
  const addItemObj = {
    id: id + 1,
    itemName: itemName,
    isBring: false,
    accunt_id: accunt_id,
    categoryName_id: categoryName_id,
    itemPhoto_id: 1, //写真の取り込み方決まってないのでとりあえずID振っちゃう
    isComp: false,
  };
  await knex('itemTbl').insert(addItemObj);
  res.send('アイテム登録完了');
});

// itemTblのisBringの値を変更するAPI
// 想定req
// [
//     {
//     "id": 2,
//     "isBring": false
//   },
//     {
//     "id": 3,
//     "isBring": true
//   }
// ]
app.put('/changeBringItems', async (req, res) => {
  req.body.map(async (data) => {
    const { id, isBring } = data;
    await knex('itemTbl').where({ id: id }).update({ isBring: isBring });
  });
  console.log('持ち物登録リクエストデータ', req.body);
  res.send('アイテムを持ち物リストに登録or解除完了');
});

// itemTblのisBring＝Trueのアイテムを全て取得するAPI
app.get('/bringItems', async (req, res) => {
  const allItems = await function () {
    return knex
      .select({
        id: 'id',
        itemName: 'itemName',
        isBring: 'isBring',
        accunt_id: 'accunt_id',
        categoryName_id: 'categoryName_id',
        itemPhoto_id: 'itemPhoto_id',
        isComp: 'isComp',
      })
      .where({ isBring: true })
      .from('itemTbl');
  };
  const result = await allItems();
  // console.log("result:", result);
  res.send(result);
});

//この下からフロントへ未実装

// itemTblのisCompの値を変更するAPI
// 想定req
// [
//     {
//     "id": 2,
//     "isComp": false
//   },
//     {
//     "id": 3,
//     "isComp": true
//   }
// ]
app.put('/changeCompItems', async (req, res) => {
  console.log(JSON.stringify(req.body));
  req.body.map(async (data) => {
    const { id, isComp } = data;
    await knex('itemTbl').where({ id: id }).update({ isComp: isComp });
  });
  console.log('準備完了リクエストデータ', req.body);
  res.send('持ち物準備完了チェックの登録or解除完了');
});

// 持ち物リスト登録を全解除する（isBring/isComp：False）API
app.put('/releaseBringItems', async (req, res) => {
  await knex('itemTbl').update({ isBring: false, isComp: false });
  res.send('持ち物リストの全解除完了');
});

// 送られてきたIDとパスワードが一致したらTrueを返す

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}/ ⭐️⭐️`);
});
