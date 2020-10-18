const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const {ensureAuthenticated} = require("../config/auth.js");
const User = require('../models/user.js');
const Message = require('../models/message.js');


router.get('/write', ensureAuthenticated, (req,res) => {
    res.render('write', {
        user: req.user,
    });
});

router.get('/read/:letterID', ensureAuthenticated, (req,res) => {
    let id = req.params.letterID;
    console.log(id);
    Message.findOne({_id: id}, (err, messageF) => {
        console.log(messageF.text);
        //messageJ = JSON.parse(messageF.text);
        //console.log("good");

        res.render('read', {
            user: req.user,
            message: messageF.text,
        });
    });
});

router.get('/inbox', ensureAuthenticated, (req,res) => {
    res.render('inbox', {
        user: req.user,
        inbox: req.user.inbox
    });
});

router.post('/write', ensureAuthenticated, (req, res) => {
    console.log(req.body);
    const {text} = req.body;

    const newMessage = new Message({
        user : req.user,
        text : text,
        date : Date.now(),
    });

    newMessage.save()
    .then((value)=>{
        console.log(value)
        req.flash('success_msg','Letter sent!');
        res.redirect('/letters/inbox');
    })
    .catch(value=> console.log(value));
    

    //res.render('write');
    //something something passport
    //quill getContents();
    //save to database
});


let checkForLetters = setInterval(() =>
{
    //checks for messages in the database with
    //date < 1 min from Date.now()
    let time = Date.now() - 60000;
    User.find({}).then(function(users) {
        var messageQueries = [];
      
        users.forEach(function(u) {
            Message.find({ user: { $ne: u }, date: {$gte: time} }, (err, messages) => {
                if (err) {
                    return;
                }
                if (messages.length) {
                    //alert("A letter has arrived in your inbox!");
                    messages.forEach(message => {
                       u.inbox.push(message);
                       u.save();
                       messageQueries.push(message);
                       console.log("A message has been saved");
                    });
                }
            })

            //messageQueries.push(Message.find({ user: { $ne: u }, date: {$gte: time} }));
        });
      
        return Promise.all(messageQueries);
      }).then(function(listOfMessages) {
          console.log(listOfMessages);
          console.log("end\n");
      }).catch(function(error) {
          res.status(500).send('one of the queries failed', error);
      });
    

}
, 10000);
//, 60000);

module.exports = router;