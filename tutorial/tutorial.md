# 準備
## nodebrewの導入
- nodeのバージョンを管理するツール
ターミナル上で、実行していく。
```
$ brew install nodebrew
$ nodebrew setup
```
成功していると、
```
Fetching nodebrew...
Installed nodebrew in $HOME/.nodebrew

========================================
Export a path to nodebrew:

export PATH=$HOME/.nodebrew/current/bin:$PATH
========================================
```
nodebrewを使うために、nodebrewのパスを通す。

__zshを使用している場合__
```
$ vim ~/.zshrc
```
`i`を押して、INSERTモードにして、
```
export PATH=$HOME/.nodebrew/current/bin:$PATH
```
を貼り付け、`esc`を押して、`:wq`で、保存して、vimを終了します。

その後、変更を反映するため、以下を実行します。
```
$ source ~/.zshrc
```

## node.jsのインストール
nodebrewに現在インストールされているnodeのバージョンの確認をする。
```
$ nodebrew ls
```
```
not installed

current: none
```
現在は、何もインストールされていないことが確認できる。よって、以下でインストールしていく。今回は、最新版をインストールする。

```
$ nodebrew install latest
```

以下のように、バージョンを確認し、バージョンを指定してインストールすることもできる。
```
$ nodebrew ls-remote
v0.0.1    v0.0.2    v0.0.3    v0.0.4    v0.0.5    v0.0.6    

v0.1.0    v0.1.1    v0.1.2    v0.1.3
...

$ nodebrew install v15.1.0
```

```
$ nodebrew ls
v15.1.0

current: none
```
currentがnoneであることから、このままでは、node.jsを使用できない。よって、使用するためには、以下のように設定する必要がある。
```
$ nodebrew use v15.1.0
use v15.1.0

$ nodebrew ls
v15.1.0

current: v15.1.0
```
nodeコマンドとnpmコマンドができるか確認する。
```
$ node -v
v15.1.0

$ npm -v
7.0.8
```
※ not foundのエラーが出た場合は、ターミナルを再起動する。

## npmで環境を構築する
今回は、作業ディレクトリをtutorialとする
```
$ cd tutorial
$ npm init --yes
$ ls
package.json
```
package.jsonが追加される。

必要なパッケージをインストールする。([express](https://www.npmjs.com/package/express), [hbs](https://www.npmjs.com/package/hbs))
```
$ npm install express hbs
$ ls
node_modules		package.json
package-lock.json
```

## Hello World
### hbsの準備
hbs(Handlebars) : javascriptの値を参照して、HTMLを生成できる。それ以外は、ほとんどhtmlと一緒である。
```
tutorial
├── node_modules
├── package.json
├── package-lock.json
└── views <- 追加する
    └── hello.hbs <- 追加する
```
```
$ mkdir views
$ touch views/hello.hbs
$ vim views/hello.hbs
```
`i`を押して、INSERTモードにして、
```
<h1>Hello World</h1>
```
を貼り付け、`esc`を押して、`:wq`で、保存して、vimを終了します。

### javascriptの準備

```
$ touch app.js
$ vim app.js
```

`i`を押して、INSERTモードにして、

```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.render('hello.hbs');
});

app.listen(3000);
```
を貼り付け、`esc`を押して、`:wq`で、保存して、vimを終了します。  

```
$ node app.js
```
上記を実行後、ブラウザ上で`localhost:3000`にアクセスすると、Hello Worldが出力されるはずである。  
サーバを終了するには、[control]+[C]でできる。

ファイルの変更ごとに、サーバを再起動する必要がある。以下のnodemonを使用すると、煩わしい作業がいらなくなる。

__nodemonのインストール__
```
$ npm install -g nodemon
```

__サーバの起動__
```
従来
$ node app.js
↓
新規
$ nodemon app.js
```
これにより、ファイルを変更し、ブラウザを再読み込みするだけで、変更が適用される。

## 参考

> [1]https://prog-8.com/docs/nodejs-new-application

> [2]https://qiita.com/kyosuke5_20/items/c5f68fc9d89b84c0df09

# データベース
## mysqlのインストール
今回は、mysqlの5.7バージョンを使用する。
```
$ brew install mysql@5.7

```

インストール後は、mysqlのパスを通す。
```
$ echo 'export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"' >> ~/.zshrc
$ source ~/.zshrc
$ mysql --version
mysql  Ver 14.14 Distrib 5.7.32, for osx10.15 (x86_64) using  EditLine wrapper
```
上記のように出力されれば完了である。

## パスワードの設定
__MySQLの起動__
```
$ brew services start mysql@5.7
...
==> Successfully started `mysql@5.7` (label: homebrew.mxcl.mysql@5.7)
```
__MySQLのパスワードの設定__
```
$ mysql_secure_installation
```
途中で、`Would you like to setup VALIDATE PASSWORD plugin?`と聞かれるので、[Enter]を押す。  
その後、パスワードの設定があり、その後は、[Enter]を押していく。`All done!`が出力されて、終了する。

## ログイン
```
$ brew services start mysql@5.7
$ mysql --user=root --password
Enter password: パスワードを入力する

mysql> <- これが出力されていれば、ログインが成功している
```

## ログアウト
以下で、ログアウトできる。
```
mysql> exit;
Bye
```

## MySQLの停止
以下で、停止できる。
```
$ brew services stop mysql@5.7
```
## 参考
> [1]https://prog-8.com/docs/mysql-env

# MySQLの操作方法

## データベースとテーブルの作成
データベースとテーブルを作成していく。

MySQLに接続する。
```
$ brew services start mysql@5.7
$ mysql --user=root --password
Enter password: パスワードを入力する
```
### データベースの操作
まずは、データベースの一覧を確認する。
```sql
mysql> SHOW databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)
```

プロジェクトごとにデータベースを構築するため、今回は、nodejsというデータベースを作成する。
```sql
mysql> CREATE DATABASE nodejs;
mysql> SHOW databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| nodejs             |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)
```

データベースは、以下で消去できる。
```sql
mysql> DROP DATABASE データベース名;
```

### テーブルの作成
使用するデータベースを指定する。
```sql
mysql> USE nodejs;
Database changed
```
現在、nodejsというデータベースには、テーブルが存在していないことがわかる。
```sql
mysql> SHOW tables;
Empty set (0.00 sec)
```
usersというテーブルを作成する。
```sql
mysql> CREATE TABLE users (id INT AUTO_INCREMENT, name TEXT, PRIMARY KEY (id));
```

__users__

| id | name |
|:--:|:----:|
| 1  | heno |
| 2  | heno |
| 3  | mohe |
| 4  |  ji  |

```sql
mysql> SHOW tables;
+------------------+
| Tables_in_nodejs |
+------------------+
| users            |
+------------------+
1 row in set (0.00 sec)
```

試しに、「へのへのもへじ」というユーザを追加する。
```sql
mysql> INSERT INTO users(name) VALUES ('へのへのもへじ');
Query OK, 1 row affected (0.01 sec)

mysql> SELECT * FROM users;
+----+-----------------------+
| id | name                  |
+----+-----------------------+
|  1 | へのへのもへじ          |
+----+-----------------------+
1 row in set (0.00 sec)
```

## 参考
> [1]https://prog-8.com/docs/mysql-database-setup

# MySQL + Node.jsの連携
## mysqlパッケージのインストール
作業フォルダへ移動してから、mysqlをインストールする。
```
$ cd tutorial
$ npm install mysql
```
## 連携
- app.js
```javascript
const express = require('express');
const mysql = require('mysql');  // 追加

const app = express();

// 追加
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '[設定したパスワード]',
  database: 'nodejs'
});

app.get('/', (req, res) => {
  res.render('hello.hbs');
  // 追加
  connection.query(
    'SELECT * FROM users',
    (error, results) => {
      console.log(results);
    }
  );
  //
});

app.listen(3000);
```
上記のように`app.js`を変更し、以下でサーバを立ち上げる。
```
$ nodemon app.js;
success
```
ここで、http://localhost:3000/ にアクセスすると、コンソール上で、以下のように出力される。
```
[ RowDataPacket { id: 1, name: 'へのへのもへじ' } ]
```
よって、MySQLと連携できることを確認することができた。

## 参考
> https://prog-8.com/docs/nodejs-mysql

# githubでの管理
githubで管理するに当たって、このままでは、パスワード情報がapp.jsに記載されてしまっているため、処理を行う必要がある。  

```
tutorial
├── node_modules
├── package.json
├── package-lock.json
├── views
│   └── hello.hbs
├── production-config.js <- 追加
└── .gitignore <- 追加
```
パスワード情報が記載されているproduction-config.jsを作成し、app.jsで読み込みを行う。

- production-config.js
```javascript
module.exports = {
  db: {
    host    : 'ホスト',
    user    : 'ユーザ',
    password: 'パスワード',
    database: 'データベース名'
  }
};
```

- app.js

```javascript
// production-config.js をインポートする(MySQLパスワード情報)
const productionConfig = require('./production-config');

// mysqlの設定情報
const connection = mysql.createConnection({
  host: productionConfig.db.host,
  user: productionConfig.db.user,
  password: productionConfig.db.password,
  database: productionConfig.db.database
});
```

- .gitignore
```
production-config.js
```
これによって、production-config.jsがpushされることがなくなる。



## 参考
> [1]https://neos21.hatenablog.com/entry/2017/12/19/080000