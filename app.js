var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var exphbs  = require('express-handlebars');

const db = require("./models");

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var reviewRouter = require('./routes/review');

var app = express();

db.sequelize.sync();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/review', reviewRouter);

module.exports = app;
