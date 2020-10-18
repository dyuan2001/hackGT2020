const mongoose = require('mongoose')
const MessageSchema  = new mongoose.Schema({
  name :
    { 
        type: Schema.Types.ObjectId, 
        ref: 'User' }
  ,
  text :{
    type  : String,
        required : true
    }
});
const Message = mongoose.model('Message',MessageSchema);

module.exports = Message;