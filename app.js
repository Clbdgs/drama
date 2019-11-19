let  Koa = require('koa');
let  cors = require('koa-cors');
let  fs = require('fs');
var path = require('path');
let mongoose = require('mongoose');
let session = require('koa-session');
let bodyParser = require('koa-bodyparser');
let logger = require('koa-logger');
let staticFiles  = require('koa-static');

const app = new Koa();
const controller = require('./controller');

const db = 'mongodb://127.0.0.1:27017';
mongoose.connect(db);
app.use(staticFiles('public'));
app.use(bodyParser());
app.use(logger());
app.use(session(app));
app.use(cors());
app.use(controller());
// app.use(router.routes()).use(router.allowedMethods());

// 监听3000端口
app.listen(4000);
console.log('app started at port 4000...');