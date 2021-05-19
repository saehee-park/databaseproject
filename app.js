var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
const { sequelize } = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
var pmEvaluationRouter = require('./routes/pm_evaluation');
var peerEvaluationRouter = require('./routes/peer_evaluation');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


sequelize.sync({ force: false })
  .then(() => {
    console.log('Connection has been established successfully.');
  }).catch((err) => {
    console.log('Unable to connect to the database:', err);
  });



// Testing database connection?

// Version.1 - 테이블 없으면 테이블 생성한다고 계속 log 보냄;
async function connectionTesting() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24* 60 * 60 * 1000 } // 24 hours
}));
app.use(flash());

app.use(function(req, res, next) {
  res.locals.currentUser = req.session.user;
  res.locals.authorization = req.session.authorization;
  res.locals.flashMessages = req.flash();
  next();
});


// 라우터 연결
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/peer_evaluation', peerEvaluationRouter);
app.use('/pm_evaluation', pmEvaluationRouter);

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
