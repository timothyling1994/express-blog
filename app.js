const express = require('express');
//var routes = require('./routes/index');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

var bodyParser = require('body-parser');

var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
var postRouter = require('./routes/post');
//var commentRouter = require('./routes/comment');


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
app.use('/admin', passport.authenticate('jwt', {session: false}), adminRouter);
app.use('/user', userRouter);
//app.use('/post/:id/comment',commentRouter);
app.use('/post', postRouter);


app.listen(3000,()=>console.log('app listening on port 3000'));