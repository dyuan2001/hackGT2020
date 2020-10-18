const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');
const expressEjsLayout = require('express-ejs-layouts')
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://dyuan2001:OzZb82ILndheENzV@cluster0.lt7pk.mongodb.net/encourage?retryWrites=true&w=majority";
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const http = require('http').Server(app);
require("./config/passport")(passport)

const User = require('./models/user.js');
const Message = require('./models/message.js');

const server = http.listen(4000);
const io = require('socket.io').listen(server);

//mongoose
mongoose.connect('mongodb+srv://dyuan2001:OzZb82ILndheENzV@cluster0.lt7pk.mongodb.net/encourage?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));
//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));

app.use(passport.initialize());
app.use(passport.session());

   //use flash
app.use(flash());
app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
})

   
//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/letters', require('./routes/letters'));
//app.use('/inbox', require('./routes/letters/inbox'));
//app.use('/chat', require('./routes/chat'));
app.get('/chat', function(req,res) {
    res.render('chat');
});


var usernames = {};

function check_key(v)
{
	var val = '';
	
	for(var key in usernames)
    {
		if(usernames[key] == v)
		val = key;
	}
	return val;
}
//chat
io.sockets.on('connection', function(socket) {
    console.log('working');
    socket.on('username', function(username) {
        console.log('username working');
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' joined the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        console.log('disconnect working');
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        console.log('chat message working');
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

process.on( 'SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit();
  });
/*
let checkForLetters = setInterval(() =>
{
    //checks for messages in the database with
    //date < 1 min from Date.now()
    let time = Date.now() - 60000;
    User.find({}).then(function(users) {
        
        
        var messageQueries = [];
      
        users.forEach(function(u) {
            messageQueries.push(Message.find({ user: { $ne: u }, date: {$gte: time} }));
        });
      
        return Promise.all(messageQueries);
      }).then(function(listOfMessages) {
          res.send(listOfMessages);
      }).catch(function(error) {
          res.status(500).send('one of the queries failed', error);
      });
    

}
, 60000);
*/





/*async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);

app.get('/hey', (req, res) => res.send('ho!'));
*/
