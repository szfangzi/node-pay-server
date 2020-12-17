/* eslint valid-jsdoc: "off" */

'use strict';

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
  config.keys = appInfo.name + '_1608037424076_441';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: false,
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '',
      // 数据库名
      database: 'renren_fast',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    wx: {
      appId: 'wx4cb8e9621950da45',
      appSecret: '6ed52c564f2593e916b379c3d06583eb',
      mchId: '1526972031',
      key: 'qv9Kihy5TOJxGySzFO8pd4wCMg3tn6YK',
      certPath: '',
    },
    jwt: {
      secret: 'f4e2e52034348f86b67cde581c0f9eb5[www.renren.io]', // 可以随意设置
      expire: 604800,
      header: 'token',
      algorithm: 'HS512',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
