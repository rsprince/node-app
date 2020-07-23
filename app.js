const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');   // database connectivity and modeling

// CORS Set Up
const cors = require('cors');           // "Cross origin resource sharing"
// let corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200
// }

// instantiate routes
const indexRouter = require('./routes/index');
const requestsRouter = require('./routes/requests');
const assetGroupsRouter = require('./routes/asset-groups');
const assetsRouter = require('./routes/assets');

const app = express();
const db = mongoose.connect( 'mongodb://localhost/vbm', { useNewUrlParser: true, useUnifiedTopology: true } );

// Implement CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// implement routes
app.use('/', indexRouter);
app.use('/requests', requestsRouter);
app.use('/asset-groups', assetGroupsRouter);
app.use('/assets', assetsRouter);

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