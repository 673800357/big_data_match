const express = require('express');
const path = require('path');
const app = express();

const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { User, History } = require("./mysql/index");
app.use(express.static(path.join(__dirname, 'build')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//添加历史
app.post('/history/add', (req, res) => {
  const { user, question } = req.body;
  History.create({ user, question }).then(ok => res.json({ status: 'ok' })).catch(e => res.json({ status: 'error' }));
});
//查询历史提问
app.get("/history/get", (req, res) => {
  const { user } = req.query;
  History.findAll({ where: { user } }).then(result => res.json({ status: 'ok', result })).catch(e => res.json({ status: 'error' }));
});
//用户注册
app.post("/user/regist", (req, res) => {
  const { user, password } = req.body;
  console.log(user, password)
  User.findAll({ where: { user } }).then(data => {
    console.log(data)
    if (data.length !== 0) {
      console.log(data)
      res.json({ status: 'error', message: '用户名已经存在' })
    } else {
      User.create({ user, password }).then(ok => res.json({ status: 'ok',user }))
    }
  }).catch(e => { res.json({ status: 'error',message:e.toString() })});

});
//用户登录
app.post("/user/login", (req, res) => {
  const { user, password } = req.body;
  console.log(user, password)
  User.findOne({ where:{user} }).then(result => {
    if (result.password === password) {
      res.json({ status: 'ok',user })
    } else {
      res.json({ status: 'error', message: '用户名或密码错误' });
    }
  }).catch(e => res.json({ status: 'error', message: e.toString()}));
})
app.listen(9000);