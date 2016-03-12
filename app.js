/* global global, __dirname */
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import {index} from './routes/index';
import {users} from './routes/users';
import {article} from './routes/article';
import {diary} from './routes/diary';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 工作环境
// app.set('env', 'production');
app.set('env', 'development');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'test')));

// ace 缓存服务sdk
// let AceSessionStore = global.MemcachedStore(session);
// 
// app.use(session({
//     key: 'BLOG_SID',
//     store: new AceSessionStore({
//         prefix: 'sess',
//         expires: 365 * 24 * 60 * 60 * 1000
//     }),
//     secret: 'blog'
// }));

app.use('/', index);
// 匹配除了/api/*之外的所有链接，指向首页
app.use(/^((?!\/api\/).)*$/, (req, res) => {
    res.redirect('/');
});
app.use('/api/article', article);
app.use('/api/diary', diary);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
