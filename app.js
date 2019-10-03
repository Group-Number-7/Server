var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var locationRouter = require('./routes/location');
var battleRouter = require('./routes/battle');
var equipmentRouter = require('./routes/equipment');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/location', locationRouter);
app.use('/battle', battleRouter);
app.use('/equipment', equipmentRouter);


//Mongo Setup
var url = process.env.mongo_url

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch( (err) => {
    console.log("mongo error", err);
  })
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

module.exports = app;
