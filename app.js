var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
var app = express();


app.use(cors());
app.options('*', cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var userRollRouter = require('./routes/users_Roll');
var loginRouter = require('./routes/login');
var genderRouter = require('./routes/gender')
var menuRouter = require('./routes/menu')
var dynamicUIRouter = require('./routes/dynamicui')
var emailRouter = require('./routes/email')
var inputTypeRouter = require('./routes/inputType')
var inputDataTypeRouter = require('./routes/inputDataType')
var CountryRouter = require('./routes/country')
var StateRouter = require('./routes/state')
var DistrictRouter = require('./routes/district')
var cityRouter = require('./routes/city')

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/login', loginRouter);
app.use('/userroll', userRollRouter);
app.use('/register', registerRouter);
app.use('/gender', genderRouter);
app.use('/menu', menuRouter);
app.use('/dynamicui', dynamicUIRouter);
app.use('/email', emailRouter);
app.use('/inputType', inputTypeRouter);
app.use('/inputDataType', inputDataTypeRouter);
app.use('/country', CountryRouter);
app.use('/state', StateRouter);
app.use('/district', DistrictRouter);
app.use('/city', cityRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// io.on('connection', (socket) => {
//   console.log('called')
//   socket.on('disconnect', function () {
//     io.emit('usersActivity', {
//       user: socket.username,
//       event: 'chatLeft'
//     });
//   });

//   socket.on('setUserName', (name) => {
//     socket.username = name;
//     io.emit('usersActivity', {
//       user: name,
//       event: 'chatJoined'
//     });
//   });

//   socket.on('sendTheMessage', (message) => {
//     io.emit('message', {
//       msg: message.text,
//       user: socket.username,
//       createdAt: new Date()
//     });
//   });
// });

module.exports = app;
