const express = require('express');
//var routes = require('./routes/index');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

var bodyParser = require('body-parser');

var adminRoute = require('./routes/admin');
var userRoute = require('./routes/user');
var postRoute = require('./routes/post');
var commentRoute = require('./routes/comment');


require('./passport');

require('dotenv').config();
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB,{ useUnifiedTopology:true, useNewUrlParser:true });
const db = mongoose.connection;
db.on('error',console.error.bind(console,"mongo connection error"));

const app = express();
const auth = require('./routes/auth');

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(session({secret:"cats",resave:false,saveUninitialized:true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: false}));

app.use('/auth', auth);
app.use('/admin', passport.authenticate('jwt', {session: false}), adminRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/comment',commentRoute);

app.listen(3000,()=>console.log('app listening on port 3000'));