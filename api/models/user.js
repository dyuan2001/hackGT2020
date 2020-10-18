const mongoose = require('mongoose');
const {Message} = require('./message').schema;
const UserSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  email :{
    type  : String,
        required : true
    } ,
    password :{
        type  : String,
        required : true
    } ,
    date :{
        type : Date,
        default : Date.now
    },
    inbox: {
        type: [Message],
    }
});
const User = mongoose.model('User',UserSchema);

module.exports = User;