var mongoose = require('mongoose')

var CounterSchema = new mongoose.Schema({
    id:String,
    sequence_value:Number
})
module.exports = mongoose.model('Counter',CounterSchema)