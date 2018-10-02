var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var session = require('express-session');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
    }));

const server = app.listen(1337);
const io = require('socket.io')(server);


app.get('/', function (req, res){
    res.render('index');
})

var users = [];
var all_lines = [];

io.on('connection', function(socket){
    
    socket.on('new_name', function(data){
        users.push({name: data.name});
        console.log(data.name);
        console.log(users);
        console.log(all_lines);
        io.emit('show_all', {lines: all_lines});

    });

    socket.on('message_sent', function(data){
        console.log(data.name, data.message);
        all_lines.push({name: data.name, message: data.message});
        io.emit('add_to_chat', {name: data.name, message: data.message});
    })



})