'use strict';

const fs = require('fs');
const path = require('path');

const thunkify = require('thunkify');

const fsReaddir = thunkify(fs.readdir);
const fsStat = thunkify(fs.stat);

/**
 * 遍历root下的所有js模块，以树形结构返回
 * @param  {string} root 遍历的文件路径
 * @return {Object}
 *
 * @example a/b/c.js，最终返回的结果为：
 *      {
 *          a: {
 *              b: xxx // c.js的exports
 *          }
 *      }
 */
exports.traverseDir = function* (root) {
    let traversed = yield traverse(root);

    return traversed.children;

    function* traverse(pathname) {
        if (trim(pathname) === '') return null;

        let modName = path.basename(pathname, '.js');
        let stat = yield fsStat(pathname);

        if (stat.isFile() && path.extname(pathname) === '.js') {
            /**
             * @property {string} name 取文件名作为模块名
             * @property {Object} children 类型为文件则children是该模块exports，
             *                             	类型为目录则children是该目录下所有模块的集合
             */
            return {
                name: modName,
                children: require(pathname)
            };
        }

        if (stat.isDirectory()) {
            let files = yield fsReaddir(pathname);

            let gens = files.map(filename => {
                let fullFilename = `${pathname}/${filename}`;

                return function* () {
                    return yield traverse(fullFilename);
                };
            });
             // 目录里所有模块export的对象
            let children = yield gens;
            // 把{name, chilren}模式转成{name: chilren}
            let mod = {
                name: modName,
                children: {}
            };
            children.map(child => {
                // traverse方法不会require非js文件，所以child可能为空
                if (child) {
                    mod.children[child.name] = child.children;
                }
            });

            return mod;
        }
    }
}

function trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

exports.trim = trim;

/**
 * 匹配规则：
 *  第一个不为空且以#开头的行，取#后的部分为title
 *  title行之后的第一个不为空的行，为summary
 *  title行之后的所有内容，为content
 *
 * @param {string} content 原始的markdown文本
 * @return {Object} 分离后的数据
 */
exports.parseRaw = function (content) {
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
