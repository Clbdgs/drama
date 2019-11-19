'use strict'
var mongoose = require('mongoose');


var TheateSchema = new mongoose.Schema({
    theateid:String,
    name:String,
    director:String,
    actors:String,
    type:String,
    country:String,
    season:Number,
    number:Number,
    imageUrl:String,
    desc:String,
    time:String
    // meta:{
    //     createAt:{
    //         type:Date,
    //         dafault:Date.now()
    //     },
    //     updateAt:{
    //         type:Date,
    //         dafault:Date.now()
    //     },
    //
    // }
});


module.exports = mongoose.model('Theate',TheateSchema);