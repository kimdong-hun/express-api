const express = require('express');
const router = express.Router();
const database = require('../db/database');

router.get('/', function (req, res) {
  res.send(database);
});

router.get('/:id', function (req, res) {
  const id = req.params.id;
  const data = database.find((el) => el.id === Number(id));
  res.send(data);
});

router.post('/', function (req, res) {
  const title = req.body.title;
  database.push({
    id: database.length + 1,
    title
  });
  res.send('값 추가가 정상적으로 완료되었습니다.');
});

router.put('/', function (req, res) {
  const id = req.body.id;
  const title = req.body.title;
  database[id - 1].title = title;
  res.send('값 수정이 정상적으로 완료되었습니다.');
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;
  database.splice(id - 1, 1);
  res.send('값 삭제가 정상적으로 완료되었습니다.');
});

module.exports = router;
