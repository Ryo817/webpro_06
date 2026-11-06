const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
let station = [
  { id:1,  code:"JE01", name:"東京駅"},
  { id:2,  code:"JE02", name:"八丁堀駅"},
  { id:3,  code:"JE03", name:"越中島駅"},
  { id:4,  code:"JE04", name:"潮見駅"},
  { id:5,  code:"JE05", name:"新木場駅"},
  { id:6,  code:"JE06", name:"葛西臨海公園駅"},
  { id:7,  code:"JE07", name:"舞浜駅"},
  { id:8,  code:"JE08", name:"新浦安駅"},
  { id:9,  code:"JE09", name:"市川塩浜駅"},
  { id:10, code:"JE10", name:"二俣新町駅"},
  { id:11, code:"JE11", name:"南船橋駅"},
  { id:12, code:"JE12", name:"新習志野駅"},
  { id:13, code:"JE13", name:"幕張豊砂駅"},
  { id:14, code:"JE14", name:"海浜幕張駅"},
  { id:15, code:"JE15", name:"検見川浜駅"},
  { id:16, code:"JE16", name:"稲毛海岸駅"},
  { id:17, code:"JE17", name:"千葉みなと駅"},
  { id:18, code:"JE18", name:"蘇我駅"},
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db2', { data: station });
});
app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.redirect('/public/keiyo_add.html');
});
let antlers = [
  { id:1,  number:1,  name:"早川友基"},
  { id:2,  number:21, name:"山田大樹"},
  { id:3,  number:29, name:"梶川裕嗣"},
  { id:4,  number:31, name:"藤井陽登"},
  { id:5,  number:2,  name:"安西幸輝"},
  { id:6,  number:3,  name:"キム・テヒョン"},
  { id:7,  number:4,  name:"千田海人"},
  { id:8,  number:5,  name:"関川郁万"},
  { id:9,  number:7,  name:"小川諒也"},
  { id:10, number:23, name:"津久井佳祐"},
  { id:11, number:25, name:"小池龍太"},
  { id:12, number:28, name:"大川佑梧"},
  { id:13, number:35, name:"元砂晏翔仁ウデンバ"},
  { id:14, number:37, name:"広瀬陸斗"},
  { id:15, number:55, name:"植田直通"},
  { id:16, number:6,  name:"三竿健斗"},
  { id:17, number:8,  name:"マテウス・ブエノ"},
  { id:18, number:10, name:"柴崎岳"},
  { id:19, number:14, name:"樋口雄太"},
  { id:20, number:24, name:"林晴己"},
  { id:21, number:27, name:"松村優太"},
  { id:22, number:9,  name:"レオ・セアラ"},
  { id:23, number:11, name:"田川亨介"},
  { id:24, number:17, name:"エウベル"},
  { id:25, number:18, name:"ヤン・マテウス"},
  { id:26, number:30, name:"吉田湊海"},
  { id:27, number:34, name:"徳田誉"},
  { id:28, number:40, name:"鈴木優磨"},
  { id:29, number:77, name:"チャヴリッチ"},
];

app.get("/antlers", (req, res) => {
  res.render('antlers', { data: antlers });
});
app.get("/antlers_add", (req, res) => {
  let id = req.query.id;
  let number = req.query.number;
  let name = req.query.name;
  let newdata = { id: id, number: number, name: name };
  antlers.push( newdata );
  res.redirect('/public/antlers_add.html');
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/janken2", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';

  let judgement = '';
  if( hand == cpu ) {
    judgement = 'あいこ';
  } else if( (hand=='グー' && cpu=='チョキ') ||
             (hand=='チョキ' && cpu=='パー') ||
             (hand=='パー' && cpu=='グー') ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken2', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));