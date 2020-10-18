const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts')
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://dyuan2001:OzZb82ILndheENzV@cluster0.lt7pk.mongodb.net/encourage?retryWrites=true&w=majority";
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const http = require('http').Server(app);
require("./config/passport")(passport)

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

const directory: string = path.join(__dirname, '/public');
server.use('/public', express.static(directory));
   
//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
//app.use('/chat', require('./routes/chat'));
app.get('/chat', function(req,res) {
    res.render('chat');
});



//chat
io.sockets.on('connection', function(socket) {
    console.log('working');
    socket.on('username', function(username) {
        console.log('username working');
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
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
    process.exit( );
  })


/*async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);

app.get('/hey', (req, res) => res.send('ho!'));
*/
