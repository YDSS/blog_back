## 阿里云ACE环境变量配置

package.json 中与 ACE 相关的配置

配置应用入口:

`"main": "index.js",`

环境变量配置的例子:

```js
    "aceenv": {
        /* ACE环境变量，应该是阿里云取这个字段去配置真正的环境变量
            之后启动node，在node中可以用process.env.NODE_ENV取到
            本地开发时用shell的NODE_ENV代替 */
        "NODE_ENV": "production",
        "OTHERS": "value mro.."
    }
```
