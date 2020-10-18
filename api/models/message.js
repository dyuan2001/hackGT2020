const mongoose = require('mongoose') , Schema = mongoose.Schema
const MessageSchema  = new mongoose.Schema({
    user :
    { 
        type: Schema.Types.ObjectId, 
        ref: 'User' }
    ,
    text :{
    type  : String,
        required : true
    },
    date: {
        type: Number,
        default: Date.now(),
    }
});
const Message = mongoose.model('Message',MessageSchema);

module.exports = Message;