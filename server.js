const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const userRoutes = require('./routes/user');
const databaseRoutes = require('./routes/database');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/user', userRoutes);
app.use('/database', databaseRoutes);

app.listen(3000, () => {
  console.log('server on!');
});
