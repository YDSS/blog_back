/**
 * 文件上传下载接口，数据流向article表
 * 
 * @author ydss
 */
import express from 'express';
import multer from 'multer';
import * as diaryAction from '../actions/diary';
import StatusCode from '../constant/state_code';

let router = express.Router();
let upload = multer();

/**
 * 日记上传
 */
router.post('/upload', upload.single('uploadFile'), (req, res) => {
    // multer返回单个文件放在req.file里
    let file = req.file;

    diaryAction.upload(file)
        .then(ret => {
            res.send({
                errno: 0,
                data: ret
            });
        }, err => {
            res.send({
                errno: StatusCode.UPLOAD_FAIL,
                err: err.message || err
            });
        })
        .catch(err => {
            res.send({
                errno: StatusCode.UPLOAD_FAIL,
                err: err.message || err
            });
        });
});

/**
 * 通过dateString查找单个日记
 */
router.get('/find', (req, res) => {
    // diary在数据库里的唯一标识，格式为2015-11-22
    let dateString = req.query.dateString;

    diaryAction.getDiaryBy(dateString)
        .then(diary => {
            res.type('json');
            res.send({
                errno: 0,
                data: diary
            });
        }, err => {
            res.send({
                errno: StatusCode.UPLOAD_FAIL,
                err: err.message
            });
        })
        .catch(err => {
            res.send({
                errno: StatusCode.UPLOAD_FAIL,
                err: err.message || err
            });
            throw err;
        });
});

/**
 * 通过年、月获取日记列表
 */
router.get('/findByMonth', (req, res) => {
    let {year, month} = req.query;

    diaryAction.getDaysByMonth(year, month)
        .then(ret => {
            res.type('json');
            res.send({
                errno: 0,
                data: ret
            });
        }, err => {
            res.send({
                errno: StatusCode.GET_DAYS_BY_MONTH_FAIL,
                err: err.message
            });
        })
        .catch(err => {
            res.send({
                errno: StatusCode.GET_DAYS_BY_MONTH_FAIL,
                err: err.message || err
            });
        });
});

/**
 * 通过年、月获取最近的一篇日记
 */
router.get('/findLatestDiary', (req, res) => {
    let {year, month} = req.query;

    diaryAction.getLatestDiary(year, month)
        .then(ret => {
            res.type('json');
            res.send({
                errno: 0,
                data: ret
            });
        }, err => {
            res.send({
                errno: StatusCode.GET_LATEST_DIARY_FAIL,
                err: err.message
            });
        })
        .catch(err => {
            res.send({
                errno: StatusCode.GET_LATEST_DIARY_FAIL,
                err: err.message || err
            });
        });
});

/**
 * 通过dateString更新日记
 */
router.post('/update', (req, res) => {
    let {dateString, content, date} = req.body;

    diaryAction.updateByDateString(dateString, content, date)
        .then(ret => {
            res.type('json');
            res.send({
                errno: 0,
                data: ret
            });
        }, err => {
            res.send({
                errno: StatusCode.UPDATE_DIARY_FAIL,
                err: err.message || err
            });
        })
        .catch(err => {
            res.send({
                errno: StatusCode.UPDATE_DIARY_FAIL,
                err: err.message || err
            });
        });
});

export {router as diary};
