const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { validUser } = require('../middleware/auth');
const users = require('../db/user');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/secure_data', validUser, (req, res) => {
  res.send('인증된 사용자만 쓸 수 있는 API');
});

router.post('/signup', async (req, res) => {
  const { username, password, age, birthday } = req.body;
  const hash = await argon2.hash(password);
  users.push({
    id: users.length + 1,
    username,
    password: hash,
    age,
    birthday
  });
  res.send('success');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const findUser = users.filter((users) => {
    return users.username === username;
  });
  if (findUser.length === 0) {
    res.status(403).send('해당하는 id가 없습니다.');
    return;
  }

  if (!(await argon2.verify(users[0].password, password))) {
    res.status(403).send('패스워드가 틀립니다.');
    return;
  }

  const access_token = jwt.sign({ username }, 'secret');
  res.cookie('access_token', access_token, {
    httpOnly: true
  });
  res.send('로그인 성공!');
});

module.exports = router;
