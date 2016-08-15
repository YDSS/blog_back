'use strict';

const path = require('path');
const koa = require('koa');
const serve = require('koa-serve');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConf = require('../webpack.config');

const app = koa();
const router = require('./route');
const port = 3000;
// dev prod
const env = process.env['NODE_ENV'];

app.use(serve('public'));
// body parser
app.use(koaBody());

if (env === 'development') {
    // 编译webpack
//     let webpackInstance = webpackDevMiddleware(webpack(webpackConf));
//     app.use(webpackInstance);
    // dev日志
    app.use(logger());
}
// route
app.use(router.routes());

app.listen(port);
console.log(`server start on ${port}`);
