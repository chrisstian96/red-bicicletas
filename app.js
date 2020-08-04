var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const db = mongoose.connection;



mongoose.connect('mongodb://localhost/Red-bicicletas',{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false 
});
db.on('error',console.error.bind(console, 'Error en la conexión'));
db.once('open',function(){
  console.log("mongodb esta funcionando correctamente!");
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletaApiRouter = require('./routes/api/bicicleta')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas', bicicletaApiRouter);


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

module.exports = app;
