'use strict'
var mongoose = require('mongoose');


var TheateSchema = new mongoose.Schema({
    theateid:String,
    name:String,
    director:String,
    actors:[],
    type:String,
    country:String,
    season:Number,
    number:Number,
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