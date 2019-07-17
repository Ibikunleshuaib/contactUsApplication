let mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    businessType:{
        type: String,
        required: true
    }, 
    content:{
        type: String,
        required: true
    }
})

let Message = module.exports = mongoose.model('message', messageSchema)