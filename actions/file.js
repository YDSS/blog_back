/**
 * 文件上传 action
 */

/**
 * 文件上传
 * 
 * @param {Object} file 文件信息，multer模块生成
 * @property {string} originalname 文件名
 * @property {string} mimetype 文件类型
 * @property {Buffer} buffer 文件数据
 * 
 * @param {string} dir 目录，因为使用ace oss服务，只能用Key
 *  标识文件，dir起到namespace的作用，Key = dir/originalname
 * 
 * @export
 */

import fs from 'fs';
import path from 'path';

const STORAGE_NAME = 'blog-storage';

export function upload(file, dir) {
    return new Promise((resolve, reject) => {
        let key = getKey(file.originalname, dir);
        console.log('key is: ' + key);
        let storage = new global.ACESDK.STORAGE(STORAGE_NAME);
        console.log(storage);
        
        storage.putObject({
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentEncoding: 'utf-8',
            // 一年
            Expires: new Date().getTime() + 365 * 24 * 60 * 60 * 1000
        },
        (err, data) => {
            console.log(err);
            if (err) {
                reject(err);
            }
            
            resolve();
        });
        // fs.writeFile(path.join(__dirname, '../test/' + file.originalname), file.buffer, err => {
        //     if (err) {
        //         reject(err);
        //         throw err;
        //     }
        //     else {
        //         resolve();
        //     }
        // });
    });
}

export function download(filename, dir) {
    return new Promise((resolve, reject) => {
        let key = getKey(filename, dir);
        let storage = new global.ACESDK.STORAGE(STORAGE_NAME);
        console.log('download key: ' + key + '\n');
        
        storage.getObject({
            Key: key
        },
        (err, data) => {
            if (err) {
                reject(err);
            } 
            else {
                console.log(data);
                resolve({
                    // 文件类型
                    type: data.ContentType,
                    // 过期时间
                    expires: data.Expires,
                    // 文件数据，buffer转换成string
                    body: data.Body.toString()
                });
            }
        }); 
        
        // let filePath = path.join(__dirname, dir, filename);
        // 
        // fs.readFile(filePath, (err, file) => {
        //     if (err) {
        //         reject(err);
        //     }
        //     else {
        //         resolve(file);
        //     }
        // });
    });
}

// Key = dir/originalname
function getKey(filename, dir) {
    return `${dir}/${filename}`;
}
