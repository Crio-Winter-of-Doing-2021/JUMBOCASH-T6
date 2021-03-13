var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sequelize = require('./config/database');
// require('./src/models/index');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var entityRouter = require('./routes/entity');
var transactionRouter = require('./routes/transaction');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// DB connection
sequelize.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/entity', entityRouter);
app.use('/transaction', transactionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT;

// for setting the db with seed value, and starting the server
sequelize.sync({force:true}).then(() => {
  app.listen(PORT, console.log(`Server started on port ${PORT}`));

  require('./src/seed/seedDb');
}).catch(err => console.log("Error: " + err));

// for resetting the db, and starting the server
// sequelize.sync().then(() => {
//   app.listen(PORT, console.log(`Server started on port ${PORT}`));
// }).catch(err => console.log("Error: " + err));


