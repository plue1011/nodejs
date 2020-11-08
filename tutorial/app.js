const express = require('express');
const mysql = require('mysql');
// production-config.js をインポートする(MySQLパスワード情報)
const productionConfig = require('./production-config');

const app = express();

// mysqlの設定情報
const connection = mysql.createConnection({
  host: productionConfig.db.host,
  user: productionConfig.db.user,
  password: productionConfig.db.password,
  database: productionConfig.db.database
});

// MySQLへの接続チェック
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  res.render('hello.hbs');
  connection.query(
    'SELECT * FROM users',
    (error, results) => {
      console.log(results);
    }
  );
});

app.listen(3000);
