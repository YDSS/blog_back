var app = require('./app');
var http = require('http');

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

// 阿里云不允许自己绑定端口，listen传空值就可以
// server.listen();
server.listen(3000);
console.log('server start on port: ' + server.address().port);
