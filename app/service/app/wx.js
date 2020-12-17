'use strict';

const Service = require('egg').Service;
class WxService extends Service {
  async getOpenId(code) {
    const result = await this.ctx.curl('https://api.weixin.qq.com/sns/jscode2session',
      {
        dataType: 'json',
        method: 'POST',
        data: {
          appid: 'wx4cb8e9621950da45',
          secret: '6ed52c564f2593e916b379c3d06583eb',
          grant_type: 'authorization_code',
          js_code: code,
        },
      });
    return result.data;
  }

}

module.exports = WxService;
