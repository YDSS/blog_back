'use strict';

const views = require('../util/views');

exports.index = function* () {
    this.body = yield views('index', {
        content: 'Welcome Home'
    });
};
