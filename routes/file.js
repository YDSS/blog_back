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

    // fs.writeFile('./test/upload.txt', data.buffer, err => {
    //     if (err) {
    //         res.end(err.message);
    //     } 
    //     else {
    //         res.end('upload success!');
    //     }
    // });
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
                err: err.message
            });
        });

    //  storage.getObject({
    //      Key: key
    //  },
    //  (err, data) => {
    //     if (err) {
    //         res.end(err.message);
    //         throw err;
    //     } 
    //     else {
    //         console.log('data\n');
    //         console.log(data);
    //         res.end(data.Body.toString());
    //     }
    //  });
});

export {router as file};
