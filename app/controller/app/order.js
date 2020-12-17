'use strict';

const { ok } = require('../../util/result');
const Controller = require('egg').Controller;

class OrderController extends Controller {
  async searchUserOrderList() {
    const { ctx, app } = this;
    const orders = await app.mysql.select('tb_order', { where: { user_id: ctx.userId } });
    if (!orders) return ok('订单为空', ctx);
    ok({ list: orders }, ctx);
  }
}

module.exports = OrderController;
