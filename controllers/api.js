const Koa  = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
//自动解析参数
app.use(bodyParser());

let mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1:27017/my_database';
mongoose.connect(db);

require('../models/theate')
require('../models/counter')
var Theate = mongoose.model('Theate');
var Counter = mongoose.model('Counter');


var addTheate = async (ctx, next) => {
    let postData= ctx.request.body;
    var theate = new Theate({
        name:postData.name,
        director:postData.director,
        actors:postData.actors,
        type:postData.type,
        country:postData.country,
        season:postData.season,
        number:postData.number,
    });

    await theate.save();
    ctx.body = {
        success:true
    }
    // var theateid =await getNextSequenceValue("theateid").then(async(data)=>{
    //
    //
    //
    // }).then(function(){
    //     ctx.body = {
    //         success:true
    //     }
    // })
    // let postData= ctx.request.body;
    //
    // var theate = new Theate({
    //     theateid:1,
    //     name:postData.name,
    //     director:postData.director,
    //     actors:postData.actors,
    //     type:postData.type,
    //     country:postData.country,
    //     season:postData.season,
    //     number:postData.number,
    // })
    //
    // await theate.save();
    // ctx.body = {
    //     success:true
    // }

}
var getTheate = async (ctx, next) => {
    const req  = await Theate.find();
    try {
        if (JSON.stringify(req) === '[]') {    //如果去找返回是个空数组，意思是没找到，code返回为-2
            code = -2
        }else{   //找到了返回0
            code=0
        }
    } catch (error) {  //报错返回-1
        code = -1
    }
    ctx.body = {
        code,
        req
    }
}
var postTheate = async (ctx, next) => {
    ctx.response.type = 'application/json';
    ctx.response.body = {
        products: products
    };
}

function getNextSequenceValue(sequenceName){
    return new Promise((resolve,reject)=>{
         Counter.findOneAndUpdate(
            {id:sequenceName},
             {$inc:{sequence_value:1}},
            {new:true},
        ).exec(function(err,data){
            console.log('---------------',err);
            resolve(data.sequence_value);
        });
    })

}
module.exports = {
    'GET /nc/theate/all': getTheate,
    'POST /nc/theate': addTheate
}