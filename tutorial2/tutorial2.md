# SQL操作
## npmで環境を構築する
今回は、作業ディレクトリをsqlとする
```
$ cd sql
$ npm init --yes
$ npm install express hbs mysql
$ npm install -g nodemon
```

## htmlの準備
### boilerplate
https://html5boilerplate.com/ から雛形のzipファイルをインストールし、解凍後、index.htmlをindex.hbsに変更し、作業フォルダに移動する。
```
tutorial2
├── node_modules
├── package.json
├── package-lock.json
├── views
│   └── index.hbs <- ここに移動する
├── production-config.js
└── .gitignore
```

index.hbs内の<body></body>内を全て消去する。
```hbs
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta property="og:title" content="">
  <meta property="og:type" content="">
  <meta property="og:url" content="">
  <meta property="og:image" content="">

  <link rel="manifest" href="site.webmanifest">
  <link rel="apple-touch-icon" href="icon.png">
  <!-- Place favicon.ico in the root directory -->

  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">

  <meta name="theme-color" content="#fafafa">
</head>

<body>
  Hello world
</body>

</html>
```

### bootstrap
https://getbootstrap.jp/ へ移動し、CDNからの参照のCSS飲みに記載されているコードをコピーする。
先ほどのindex.hbsの以下の部分へ上書きする。
```hbs
(変更前)
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/main.css">

(変更後)
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
```

これにより、bootstrapから、コピペするだけで、部品を揃えることができる。

e.g.)ボタンの設置
```hbs
<div class="container">
  <div class="d-flex justify-content-center">
    <button type="button" class="mt-3 btn btn-primary">Primary</button>
  </div>
</div>
```

### javascript
bodyタグ内に`<script src="jsファイルのパス"></script>`を記載することで、html(hbs)とjavascriptファイルを連携することができる。
```hbs
<body>
  <script src=""></script>
</body>
```

### リンク
__buttonタグの場合__
```hbs
<button type="button" class="mt-3 btn btn-primary" onclick="location.href='遷移先'">文字</button>
```

__aタグの場合__
```hbs
<a href="遷移先url">文字</a>
```

## publicフォルダの使用
app.js内に以下の記述を追加することで、publicフォルダ内のファイルを読み込めるようになる。
- app.js
```javascript
app.use(express.static('public'));
```

## html <-> javascript

### app.js -> html

- app.js
```javascript
app.get('/books', (req, res) => {
  res.render('books.hbs', {title: 'Hello!!!', message: 'World'});
});
```

- books.hbs
```hbs
<body>
  <h1>{{title}}</h1>
  <h2>{{message}}</h2>
</body>
```

### post
index.hbsの<form>を`submit`して、その情報をapp.jsでbooks.hbsに渡すように記述し、books.hbsで{{変数名}}で出力する。

- index.hbs
```hbs
<form method="post" action="/books">
  <div class="index-user_name">
    ユーザ名
    <input type="text" id="userName" name="userName" class="index-user_name_text">
  </div>
  <div class="index-enter">
    <input type="button" value="入室する" class="common-button index-enter_button" onclick="location.href='/books'">
  </div>
</form>
```

- app.js
```javascript
app.post('/books', function(req, res, next) {
  const userName = req.body.userName;
  res.render('books', {userName: userName});
});
```

- books.hbs
```hbs
<body>
  {{userName}}
</body>
```

`req.body`をするには、以下が必要である。
```javascript
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

__GETとPOSTの違い__  
[1]https://qiita.com/kanataxa/items/522efb74421255f0e0a1

## フォルダ構成

```
.
├── node_modules
├── package.json
├── package-lock.json
├── public(静的リソースを格納する)
│   ├── images
│   ├── javascript
│   └── stylesheets
├── routes(ルーティング(クライアントからの要求に対して、どのような処理を実行するかを返す処理)処理を格納する)
│   └── index.js
└── views(UIを格納する)
    └── index.hbs
```

__参照__
> https://torutsume.net/nodejsexpress/