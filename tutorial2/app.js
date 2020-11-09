const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
// production-config.js をインポートする(MySQLパスワード情報)
const productionConfig = require('./production-config');

const app = express();

// publicフォルダ内のファイルを読み込めるようにする
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


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

// indexに接続された時の処理
app.get('/', (req, res) => {
  res.render('index.hbs');
  connection.query(
    'SELECT * FROM users',
    (error, results) => {
      console.log(results);
    }
  );
});

// booksに接続された時の処理
app.get('/books', (req, res) => {
  res.render('books', {title: 'Hello!!!', message: 'World'});
});

// indexでsubmitされて、booksへ遷移した時の処理
app.post('/books', function(req, res, next) {
  console.log(req.body);
  console.log('ユーザ名：' + req.body.userName);
  const userName = req.body.userName;
  res.render('books', {userName: userName});
});



app.listen(3000);
