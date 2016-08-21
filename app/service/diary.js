'use strict';

const sequelize = require('../db/instance');
const Diary = sequelize.import('../model/diary');
const is = require('is-type-of');

const queryAttr = [
    'id',
    'title',
    'content',
    'year',
    'month',
    'day',
    'createdAt',
    'updatedAt'
];

/**
 * 通过上传文件更新或新增单个diary
 * @param  {Object} file 若为Array则是多个文件上传
 *   单个file的属性
 *   - {string} name filename
 *   - {string} content
 * @return {Object}
 */
function* uploadSingleFile(file) {
    let diaryDate = _getDateFrom(file.name);
    if (diaryDate === null) {
        console.error('format error from filename of diary');
        return null;
    }

    let diaryInfo = _splitTitleAndContent(file.content);
    // let ret = yield Diary.upsert({
    // 查找上传的diary是否已经存在，存在则更新，不存在则创建
    return yield Diary.findOne({
        where: {
            dateString: diaryDate.dateString
        }
    })
        .then(diary => {
            if (!diary) {
                return Diary
                    .build({
                        dateString: diaryDate.dateString,
                        title: diaryInfo.title,
                        content: diaryInfo.content,
                        year: diaryDate.year,
                        month: diaryDate.month,
                        day: diaryDate.day,
                        createdAt: new Date()
                    })
                    .save();
            }
            else {
                return Diary
                    .update({
                        title: diaryInfo.title,
                        content: diaryInfo.content
                    }, {
                        where: {
                            dateString: diaryDate.dateString
                        }
                    })
                    // update只返回影响的row的数量，
                    // 为与build时返回的数据保持一致，手动加上修改后的内容
                    .then(ret => {
                        if (ret && ret[0] === 1) {
                            return {
                                id: diary.id,
                                title: diaryInfo.title,
                                content: diaryInfo.content,
                                createdAt: diary.createdAt,
                                updatedAt: new Date(),
                                year: diary.year,
                                month: diary.month,
                                day: diary.day,
                                dateString: diary.dateString
                            };
                        }
                        else {
                            throw new Error('update diary failed');
                        }
                    });
            }
        });
};
exports.uploadSingleFile = uploadSingleFile;

/**
 * 通过上传文件更新或新增多个diary,
 *   直接使用uploadSingleFile
 * @param  {Array} files
 *   单个file的属性
 *   - {string} name filename
 *   - {string} content
 * @return {Object}
 */
exports.uploadMultipleFiles = function* (files) {
    let tasks = files.map(uploadSingleFile);
    return yield tasks;
};

exports.getDiaryByDate = function* (dateString) {
    return yield Diary.findOne({
        attributes: queryAttr,
        where: {
            dateString: dateString
        }
    });
};

/**
 * 更新diary
 * @param  {string} dateString
 * @param  {string} content
 * @param  {Date} updatedDate 更新时间，前端可修改
 */
exports.updateDiary = function* (dateString, content, updatedDate) {
    let diaryInfo = _splitTitleAndContent(content);

    return yield Diary
        .update({
            title: diaryInfo.title,
            content: diaryInfo.content,
            updatedAt: updatedDate
        }, {
            where: {
                dateString: dateString
            }
        })
        .then(ret => {
            if (ret && ret[0]) {
                return !!ret[0];
            }

            return false;
        });
};

exports.getDiariesByMonth = function* (year, month) {
    return yield Diary.findAll({
        attributes: ['dateString'],
        where: {
            year: year,
            month: month
        }
    });
};

exports.getLatestDiaryByMonth = function* (year, month) {
    return yield Diary.findOne({
        attributes: queryAttr,
        where: {
            year: {
                $lte: year
            },
            month: {
                $lte: month
            }
        },
        order: [
            ['year', 'DESC'],
            ['month', 'DESC'],
            ['day', 'DESC']
        ]
    });
};

/**
 * 通过文件名解析日记的年月日
 *  日记的文件名的格式为'YYYY-MM-DD.md'
 *
 *  @param {string} filename
 *
 *  @return {Object} 日记的年月日
 */
function _getDateFrom(filename) {
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
function _splitTitleAndContent(file) {
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
