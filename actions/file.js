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

const STORAGE_NAME = 'blog-storage';

export function upload(file, dir) {
    return new Promise((resolve, reject) => {
        let key = getKey(file.originalname, dir);
        let storage = new global.ACESDK.STORAGE(STORAGE_NAME);
        
        storage.putObject({
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentEncoding: 'utf-8',
            Expires: 365
        },
        (err, data) => {
            if (err) {
                reject(err);
            }
            
            resolve();
        });
    });
}

export function download(filename, dir) {
    return new Promise((resolve, reject) => {
        // 反斜杠需转义才是真正的key，oss很奇怪
        let key = encodeURIComponent(getKey(filename, dir));
        let storage = new global.ACESDK.STORAGE(STORAGE_NAME);
        
        storage.getObject({
            Key: key
        },
        (err, data) => {
            if (err) {
                reject(err);
            } 
            else {
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
    });
}

// Key = dir/originalname
function getKey(filename, dir) {
    return `${dir}/${filename}`;
}