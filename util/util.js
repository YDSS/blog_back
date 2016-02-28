/**
 * @file 工具类，通用方法集
 * @author ydss
 */

/**
 * 工具类
 * @class
 *
 * @exports
 */
class Util {
    /**
     * 匹配规则：
     *  第一个不为空且以#开头的行，取#后的部分为title
     *  title行之后的第一个不为空的行，为summary
     *  title行之后的所有内容，为content
     *
     * @param {string} content 原始的markdown文本
     * @return {Object} 分离后的数据
     */
    static parseRaw(content) {
        if (!content || typeof content !== 'string') {
            return null;
        }

        let re = /^#\s?([^\n]+)((?:\n*([^\n]*))?[\w\W]*)/;
        let matches = content.match(re);
        
        if (matches && matches.length) {
            return {
                title: matches[1] || '',
                content: matches[2] || '',
                summary: matches[3] || ''
            };
        }

        return null;
    }
}

export default Util;
