'use strict'

// matching rules:
// any charactor follows '#' until '\n'  will be title
// charactor between first '\n' and the second is abstract
const re = /^#\s?([^\n]+)(?:\n([^\n]*))?/;

exports.getTitleAndAbs = content => {
    if (!content || typeof content !== 'string') {
        return;
    }

    let matches = content.match(re);
    let result;
    
    if (matches && matches.length > 1) {
        result = {
            title: matches[1],
            abs: matches[2] || ''
        };
    }
    
    return result;
}
