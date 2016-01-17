/**
 * @file 文件上传&&下载接口aciton part
 * @author ydss
 */

import fs from 'fs';
import path from 'path';
import sequelize from '../db/connectMysql';

// diary model
const Diary = sequelize.import('../models/diary');

/**
 * 上传文件
 * 
 * @param {Object} file 文件信息，multer模块生成
 * @property {string} originalname 文件名
 * @property {string} mimetype 文件类型
 * @property {Buffer} buffer 文件数据
 * 
 * @export
 */
export function upload(file) {
    return new Promise((resolve, reject) => {
        let diaryDate = getDateFrom(file.originalname);
        if (diaryDate === null) {
            reject('format error from filename of diary');
            return;
        }

        debugger
        let diaryInfo = splitTitleAndContent(file.buffer.toString()); 
        Diary
            .build({
                dateString: diaryDate.dateString,
                title: diaryInfo.title,
                content: diaryInfo.content,
                year: diaryDate.year,
                month: diaryDate.month,
                day: diaryDate.day,
                createdAt: new Date()
            })
            .save()
            .then(ret => {
                resolve(ret);
            })
            .catch(err => {
                reject(err);
                throw err;
            });
    });
}

/**
 * 通过日期查询单个日记
 *
 * @param {string} dateString diary在表中的唯一标识，格式为2015-11-22
 * @return {Promise} promise对象
 */
export function getDiaryBy(dateString) {
    return new Promise((resolve, reject) => {
        let re = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
        if (!re.test(dateString)) {
            reject('wrong format of dateString');
            return;
        }

        let query = ['id', 'title', 'content', 'dateString', 'createdAt', 'updatedAt'];

        return Diary.findOne({
            attributes: query,
            where: {
                dateString: dateString
            }
        })
            .then(ret => {
                resolve(ret);
            }, err => {
                reject(err);     
            })
            .catch(err => {
                reject(err);
                throw err;
            });
    });
}

/**
 * 按年月取当月下所有日记的dayOfMonth
 *
 * @param {string|number} year 年
 * @param {string|number} month 月
 * @return {Array}
 */
export function getDaysByMonth(year, month) {
    return new Promise((resolve, reject) => {
        let typeOfMonth = typeof month;
        let typeOfYear = typeof year;
        if ((typeOfMonth !== 'string' && typeOfMonth !== 'number')
            || (typeOfYear !== 'string' && typeOfYear !== 'number')) {
            return null;
        }

        Diary.findAll({
            attributes: ['dateString'],
            where: {
                year: +year,
                month: +month
            }
        })
            .then(ret => {
                resolve(ret);
            }, err => {
                reject(err);
            })
            .catch(err => {
                reject(err);
                throw err;
            });
    });
}

/**
 * 通过文件名解析日记的年月日
 *  日记的文件名的格式为'YYYY-MM-DD.md'
 *
 *  @param {string} filename
 *  
 *  @return {Object} 日记的年月日
 */
function getDateFrom(filename) {
    // 抽取文件名中的年月日，顺便校验文件名是否符合规范
    let re = /^(\d{4})-(\d{1,2})-(\d{1,2})\.md$/;
    let matches = filename.match(re);
    let ret = null;

    if (matches) {
        ret = {
            year: matches[1],
            month: matches[2],
            day: matches[3],
            dateString: filename.replace(/\.md$/, '')
        }
    }

    return ret;
}

/**
 * 解析日记文件内容，分离标题和剩余内容
 *
 * @param {string} file 日记内容
 *
 * @return {Object} title和content
 */
function splitTitleAndContent(file) {
    const re = /^#\s?([^\n]+)(?:\n*([\w\W]*))?/;
    let matches = file.match(re);

    if (!matches) {
        return null;
    }
    else {
        return {
            title: matches[1],
            content: matches[2] || ''
        };
    }
}
