let mongoose = require('mongoose');

let subscribeSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    }
});
let Subscribe = module.exports = mongoose.model('subscribe', subscribeSchema)