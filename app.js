const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');


var bodyParser = require('body-parser')
var mainRouter = require('./routes/router');

require('dotenv').config();
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB,{ useUnifiedTopology:true, useNewUrlParser:true });
const db = mongoose.connection;
db.on('error',console.error.bind(console,"mongo connection error"));

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(session({secret:"cats",resave:false,saveUninitialized:true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: false}));

app.use('/',mainRouter);

app.listen(3000,()=>console.log('app listening on port 3000'));