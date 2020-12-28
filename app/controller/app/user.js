'use strict';

const { ok, error } = require('../../util/result');
const Controller = require('egg').Controller;
const CryptoJS = require('crypto-js');
const AuthUtil = require('../../util/auth');

class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const resUser = await app.mysql.get('tb_user', { username });
    if (resUser.user_id) {
      const token = AuthUtil.createToken(resUser.user_id, app.config.jwt);
      if (resUser.password === CryptoJS.SHA256(password).toString()) {
        return ok({ token }, ctx);
      }
      return error('密码错误', ctx);

    }
    return error('用户不存在', ctx);
  }

}

module.exports = UserController;
