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
        console.log('diary date: ' + JSON.stringify(diaryDate));
        
        if (diaryDate === null) {
            reject('format error from filename of diary');
            return;
        }

        Diary
            .build({
                dateString: diaryDate.dateString,
                raw: file.buffer.toString(),
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

        let query = ['id', 'raw', 'dateString', 'createdAt', 'updatedAt'];

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
