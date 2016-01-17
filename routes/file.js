/**
 * 文件上传下载接口，数据流向article表
 * 
 * @author ydss
 */
import express from 'express';
import multer from 'multer';
import * as uploadAction from '../actions/file';
import StatusCode from '../constant/state_code';

let router = express.Router();
let upload = multer();

router.post('/upload', upload.single('uploadFile'), (req, res) => {
    // multer返回单个文件放在req.file里
    let file = req.file;

    uploadAction.upload(file)
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

router.get('/find', (req, res) => {
    // diary在数据库里的唯一标识，格式为2015-11-22
    let dateString = req.query.dateString;

    uploadAction.getDiaryBy(dateString)
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

router.get('/findByMonth', (req, res) => {
    let {year, month} = req.query;

    uploadAction.getDaysByMonth(year, month)
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
            throw err;
        });
});

export {router as file};
