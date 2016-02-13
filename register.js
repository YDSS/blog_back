/**
 * @file 注册babel register，运行时编译es5,
 *  真实app入口为main.js
 */
require('babel-core/register');
// ace的node版本太低，没有原生Promise，用es6-promise作为polyfill
require('es6-promise').polyfill();

require('./main');
