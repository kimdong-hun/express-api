const jwt = require('jsonwebtoken');
const users = require('../db/user');

const validUser = (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    res.status(401).send('access token이 없습니다.');
  }

  try {
    const { username } = jwt.verify(access_token, 'secret');
    const userInfo = users.find((user) => user.username === username);
    if (!userInfo) {
      throw 'user info가 없습니다.';
    }

    next();
  } catch (err) {
    res.status(401).send('유효한 access token이 아닙니다.');
  }
};

module.exports = {
  validUser
};
