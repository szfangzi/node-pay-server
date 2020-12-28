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
    zfb: {
      gateway: 'https://openapi.alipaydev.com/gateway.do',
      microApp: {
        appId: '2017052600932272',
        publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk3iyJAEgDLfsq7u2BEwQNEUQ9wspPgqZwG/IA8Y+TGvv7y2XAHR/wOHkKoz0mG0wqIw7E9UUgtHuwbK+LC19bVAUvCWiV8AMgA9GtZZQ6kVBiRNq5zcxJAjMkZQfM0dPTlaAeHvrK1ED2mBAL6KTh0Oe4u4i45FW7L27HT2M7hoWTFUgtZ+bqmRL6MFQRn5wU3SEkFiX9jd0MuWD23VSZO8SaN/B5SB1HrjMpzT9vPQC2Is9mBihnlzxvHYfRAZNC0EG62cN/udWjEtreySVu8R0iWyig1RJAp+xrgUW2UJo0Dd1uhG87YvW872wEOetqzJ5Uum3m0B3spHvB20PtwIDAQAB\n',
        privateKey: 'MIIEpAIBAAKCAQEAk3iyJAEgDLfsq7u2BEwQNEUQ9wspPgqZwG/IA8Y+TGvv7y2XAHR/wOHkKoz0mG0wqIw7E9UUgtHuwbK+LC19bVAUvCWiV8AMgA9GtZZQ6kVBiRNq5zcxJAjMkZQfM0dPTlaAeHvrK1ED2mBAL6KTh0Oe4u4i45FW7L27HT2M7hoWTFUgtZ+bqmRL6MFQRn5wU3SEkFiX9jd0MuWD23VSZO8SaN/B5SB1HrjMpzT9vPQC2Is9mBihnlzxvHYfRAZNC0EG62cN/udWjEtreySVu8R0iWyig1RJAp+xrgUW2UJo0Dd1uhG87YvW872wEOetqzJ5Uum3m0B3spHvB20PtwIDAQABAoIBAH0xyOHiBqhleEmu2O46+MK3I5jm48Nk0nRZMU9q/DZ6p73AUWI0hMRlwQMSmQ/SGq3sJrdGfNw2ht/v85yjnciwZHn55SFjy/jnfxrnmpfX5bQORQI3i8NQqQKp4fbxgfU6YGRopxQl+gRpE/Scq2v4zylOC1Zwa4Ad7nz7ZOo49Mqo2yOZY0np/4up5Pg8OAu7aB2EIDajhv4BptKF2X7ij0QPYdU10Xh3YDPlD1lZ4phXegZdUdhyH9MNDApYKZuQV68Vm2XLEq7hMsoFFXibz+F4UT/S0LOMa42NBh7pDvRrgX8t4kxio6huhp+Hv9etVjpkOOpLRA/2cVH1cTECgYEA3IKMUlYHEEWCDnuWtaw7CeSQJiVZkU2irjrkJvcv6kFK/yaA4/XrsaMFKpzFWx5GKCCC/JdBluEo+2oCQUkMO14ulkivlv7HKIiCK6tDYCePXYdUltTAMKX9NJkkZI9lnJMtT8hLXxUO+aFWp0Nad0X3vmavaWneVZl/Ie5yB8kCgYEAqzTQ2HBZ6anG6mOfE8DGYM5aKo681Wc2Wkh8zS87TpSZ+Ytqx7LLEdUCFfyNiaRwVfnq0pZz67bBuu7RUEYT2/sN6BdnM/QqNVJhddWYVkNX+ECJYWOM1il0VA6RFkiFz8wv6T3U9HiZD5JlWHDx7qaUiIWZa9Fo1xZVV9xBG38CgYEA1QblqvFjF4we7gDlgxMlYhRGUiPJGL/Ixssr+Jza1FNJsZ8v64p7rXvRFO6pFrLzkfZ+tKkneyyAnAo4rXt1brE5DoSf5Z6zJmxiXO+yQmVVckS4KpLULOte535/EwsZXh8tKiNU9UFx2yXLggFml02n3nBzS8I0QbvtfwlNbkkCgYEAhe+NqqVKUdg1+0vwOP3ItBb6xuxfoftatAqdR8+5b+IlCuocoRmob8zaEuU+vP1dvIUFRbXZ/f89U8ZdDZWlF6Ux3e3hGO3cz1YhVJPC10lb2qRyVTQSC8DmdpPmwS3/MO8mVCvBG3f1Fg+LJUNGoVLERIFv4r8ya4HXRiLS9HUCgYBX7I8sYdyOxe5a0QhBEqobteHQX3iIcKuLJEZmqw/DBewCxxUiqDi7tHw+VA0p7PTpgP7FsCToFqks47NjShtwjyjmzDXh4YE44f069axI4KCwtGsU5YqFo6iljCszMuKEQd3J3UC99xADExTZGRFC6xzFnxUZXhxPSKVnG5ziTA==',
      },
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
