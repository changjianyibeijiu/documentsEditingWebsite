/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588489500145_4658';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    bodyParser:{
      jsonLimit: '10mb',
      formLimit: "10mb"
    },
    static: {
      prefix: '/public/',
      dir: [ path.join(appInfo.baseDir, 'app/public') ],
    },
    cors: {
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
      credentials: true,
      origin: '*', // 允许的请求来源（* 表示允许所有的IP的请求 ）
    },

    security: {
      csrf: {
        enable: false,
      },
    },
    mongoose: {
      clients: {
        // clientId, access the client instance by app.mongooseDB.get('clientId')
        db1: {
          // url: 'mongodb+srv://root:root@cluster0-okmkn.azure.mongodb.net/file?retryWrites=true&w=majority',
          url: 'mongodb+srv://root:root@cluster0-alhg6.mongodb.net/edtionweb?retryWrites=true&w=majority',
          options: {},
        },
        // db1: {
        //   url: 'mongodb://film:film@127.0.0.1/film',
        //   options: {},
        // },
      },
    },
    jwt: {
      secret: 'biyesheji',
    },
    multipart: {
      fileSize: '50mb',
      mode: 'stream',
      fileExtensions: ['.xls', '.txt', '.jpg', '.jpeg', // image/jpeg
        '.png', // image/png, image/x-png
        '.gif', // image/gif
        '.bmp', // image/bmp
        '.wbmp', // image/vnd.wap.wbmp
        '.webp',
        '.tif',
        '.psd',
        // text
        '.svg',
        '.js', '.jsx',
        '.json',
        '.css', '.less',
        '.html', '.htm',
        '.xml',
        // tar
        '.zip',
        '.gz', '.tgz', '.gzip',
        // video
        '.mp3',
        '.mp4',
        '.avi',
      ], // 扩展几种上传的文件格式
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};