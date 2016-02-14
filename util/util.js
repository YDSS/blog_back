// matching rules:
// any charactor follows '#' until '\n'  will be title
// charactor between first '\n' and the second is abstract
class Util {
    static getTitleAndAbs(content) {
        if (!content || typeof content !== 'string') {
            return null;
        }

        let re = /^#\s?([^\n]+)(?:\n*([^\n]*))?/;
        let matches = content.match(re);
        
        if (matches && matches.length > 1) {
            return {
                title: matches[1],
                abs: matches[2] || ''
            };
        }
        else {
            return null;
        }
    }
}

export default Util;
