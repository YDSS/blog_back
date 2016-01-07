/**
 * 文件上传接口，存储在ace oss服务上
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
    let dir = req.body.dir;

    // fs.writeFile('./test/upload.txt', data.buffer, err => {
    //     if (err) {
    //         res.end(err.message);
    //     } 
    //     else {
    //         res.end('upload success!');
    //     }
    // });
    uploadAction.upload(file, dir)
        .then(() => {
            res.send({
                errno: 0
            });
        }, err => {
            res.send({
                errno: StatusCode.UPLOAD_ERROR,
                err: err.message
            });
        })
});

router.get('/download', (req, res) => {
     let filename = req.query.filename;
     let dir = req.query.dir;
     
     uploadAction.download(filename, dir)
        .then(file => {
            // 必须设置Content-Length,process方法的lengthComputable才能正常返回接收值的大小
            // express send方法可以自动计算Content-Length
            res.set('Content-Type', 'text/plain');
            res.send({
                errno: 0,
                data: file.toString()
            });
        }, err => {
            res.send({
                errno: StatusCode.UPLOAD_ERROR,
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
