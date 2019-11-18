let  Koa = require('koa');
let  cors = require('koa-cors');
let  fs = require('fs');
let mongoose = require('mongoose');
let session = require('koa-session');
let bodyParser = require('koa-bodyparser');
let logger = require('koa-logger');


const app = new Koa();
const controller = require('./controller');

const db = 'mongodb://127.0.0.1:27017';
mongoose.connect(db);
app.use(logger());
app.use(session(app));
app.use(bodyParser());
app.use(cors());
app.use(controller());
// app.use(router.routes()).use(router.allowedMethods());

// 监听3000端口
app.listen(4000);
console.log('app started at port 4000...');