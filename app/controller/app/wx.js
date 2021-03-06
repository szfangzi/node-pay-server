'use strict';

const { ok, error } = require('../../util/result');
const Controller = require('egg').Controller;
const WXPay = require('../../util/wxPay');
const WXPayUtil = require('../../util/wxPayUtil');
const AuthUtil = require('../../util/auth');
const { WXPayConstants } = require('../../util/wxPayConstants');
const { SignType } = require('../../util/wxPayConstants');

class WxController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { code, nickname, photo } = ctx.request.body;
    const { openid } = await ctx.service.app.wx.getOpenId(code);
    if (!openid) {
      return error('临时登陆凭证错误', ctx);
    }
    const user = { open_id: openid };
    let sqlRes = await app.mysql.get('tb_user', user);
    let userId = 0;
    // 找不到user就是没注册，先注册
    if (!sqlRes) {
      Object.assign(user, { nickname, photo, create_time: new Date(), type: 2 });
      sqlRes = await app.mysql.insert('tb_user', user);
      if (sqlRes.insertId) {
        userId = sqlRes.insertId;
      }
    } else {
      userId = sqlRes.user_id;
    }
    const token = AuthUtil.createToken(userId, app.config.jwt);
    ok({ token }, ctx);
  }

  // 小程序支付
  async microAppPayOrder() {
    const { ctx, app } = this;
    const { orderId } = ctx.request.body;
    let sqlRes = await app.mysql.get('tb_user', { user_id: ctx.userId });
    if (!sqlRes) {
      return error('用户不存在', ctx);
    }
    const openid = sqlRes.open_id;
    sqlRes = await app.mysql.get('tb_order', { user_id: ctx.userId, status: 1, id: orderId });
    if (!sqlRes) {
      return error('不是有效订单', ctx);
    }
    const amount = sqlRes.amount;
    const orderCode = sqlRes.code;
    const myWXPayConfig = app.config.wx;

    // 有待开发
    // 验证购物券是否有效
    // 验证团购活动是否有效

    try {
      // 向微信平台发出请求，创建支付订单
      const wxPay = new WXPay(myWXPayConfig);
      const payParams = {
        body: '订单备注',
        out_trade_no: orderCode.substring(1) + WXPayUtil.generateNonceStr()[0],
        total_fee: amount,
        spbill_create_ip: '127.0.0.1',
        notify_url: 'http://jp-tyo-dvm-2.sakurafrp.com:19641/app/wx/recieveMessage',
        trade_type: 'JSAPI',
        openid,
      };
      const resPayOrder = await wxPay.unifiedOrder(payParams);
      if (resPayOrder.return_code === WXPayConstants.FAIL) return error(resPayOrder.return_msg, ctx);
      if (resPayOrder.result_code === WXPayConstants.FAIL) return error(resPayOrder.err_code_des, ctx);
      const prepay_id = resPayOrder.prepay_id;
      if (prepay_id) {
        await app.mysql.update('tb_order', { id: 1, prepay_id, payment_type: 1 });
        const appId = app.config.wx.appId;
        const timeStamp = Date.now().toString();
        const nonceStr = WXPayUtil.generateNonceStr();
        const packageStr = `prepay_id=${prepay_id}`;
        const signType = SignType.MD5;
        const paySign = WXPayUtil.generateSignature({
          appId,
          timeStamp,
          nonceStr,
          package: packageStr,
          signType,
        }, app.config.wx.key);
        return ok({ prepay_id, timeStamp, paySign, nonceStr, package: packageStr }, ctx);
      }
      return error('订单创建失败!', ctx);

    } catch (e) {
      return error('微信支付模块故障!', ctx);
    }

  }

  // native支付
  async nativePayOrder() {
    const { ctx, app } = this;
    const { orderId } = ctx.request.body;
    let sqlRes = await app.mysql.get('tb_user', { user_id: ctx.userId });
    if (!sqlRes) {
      return error('用户不存在', ctx);
    }
    sqlRes = await app.mysql.get('tb_order', { user_id: ctx.userId, status: 1, id: orderId });
    if (!sqlRes) {
      return error('不是有效订单', ctx);
    }
    const amount = sqlRes.amount;
    const orderCode = sqlRes.code;
    const myWXPayConfig = app.config.wx;
    try {
      // 向微信平台发出请求，创建支付订单
      const wxPay = new WXPay(myWXPayConfig);
      const payParams = {
        nonce_str: WXPayUtil.generateNonceStr(),
        body: '订单备注',
        out_trade_no: orderCode.substring(2) + WXPayUtil.generateNonceStr().substring(0, 2),
        total_fee: amount,
        spbill_create_ip: '127.0.0.1',
        notify_url: 'http://jp-tyo-dvm-2.sakurafrp.com:19641/app/wx/recieveMessage',
        trade_type: 'NATIVE',
      };
      payParams.sign = WXPayUtil.generateSignature(payParams, app.config.wx.key);
      const resPayOrder = await wxPay.unifiedOrder(payParams);
      console.log(resPayOrder);
      if (resPayOrder.return_code === WXPayConstants.FAIL) return error(resPayOrder.return_msg, ctx);
      if (resPayOrder.result_code === WXPayConstants.FAIL) return error(resPayOrder.err_code_des, ctx);
      const prepay_id = resPayOrder.prepay_id;
      if (prepay_id) {
        const codeUrl = resPayOrder.code_url;
        await app.mysql.update('tb_order', { id: 1, prepay_id });
        return ok({ codeUrl }, ctx);
      }
      return error('订单创建失败!', ctx);

    } catch (e) {
      return error('微信支付模块故障!', ctx);
    }

  }

  // 付款码支付
  async scanCodePayOrder() {
    const { ctx, app } = this;
    const { orderId, authCode } = ctx.request.body;
    let sqlRes = await app.mysql.get('tb_user', { user_id: ctx.userId });
    if (!sqlRes) {
      return error('用户不存在', ctx);
    }
    sqlRes = await app.mysql.get('tb_order', { user_id: ctx.userId, status: 1, id: orderId });
    if (!sqlRes) {
      return error('不是有效订单', ctx);
    }
    const amount = sqlRes.amount;
    const orderCode = sqlRes.code;
    const myWXPayConfig = app.config.wx;
    try {
      // 向微信平台发出请求，创建支付订单
      const wxPay = new WXPay(myWXPayConfig);
      const payParams = {
        appid: myWXPayConfig.appId,
        mch_id: myWXPayConfig.mchId,
        nonce_str: WXPayUtil.generateNonceStr(),
        body: '订单备注',
        out_trade_no: orderCode.substring(2) + WXPayUtil.generateNonceStr().substring(0, 2),
        total_fee: amount,
        spbill_create_ip: '127.0.0.1',
        auth_code: authCode,
      };
      payParams.sign = WXPayUtil.generateSignature(payParams, app.config.wx.key);
      const resPayOrder = await wxPay.microPay(payParams);
      console.log(resPayOrder);
      if (resPayOrder.return_code === WXPayConstants.FAIL) return error(resPayOrder.return_msg, ctx);
      if (resPayOrder.result_code === WXPayConstants.FAIL) return error(resPayOrder.err_code_des, ctx);
      const prepay_id = resPayOrder.transaction_id;
      if (prepay_id) {
        await app.mysql.update('tb_order', { id: 1, prepay_id, payment_type: 1 });
        return ok('付款成功', ctx);
      }
      return error('订单创建失败!', ctx);

    } catch (e) {
      return error('微信支付模块故障!', ctx);
    }
  }

  async updateOrderStatus() {
    const { ctx, app } = this;
    const { orderId } = ctx.request.body;
    const user_id = ctx.userId;
    const sqlRes = await app.mysql.get('tb_order', { user_id, id: orderId });
    if (!sqlRes) {
      return error('用户与订单不匹配', ctx);
    }
    const { appId: appid, mchId: mch_id, key } = app.config.wx;
    const orderCode = sqlRes.code;
    const reqData = {
      appid,
      mch_id,
      out_trade_no: orderCode.substring(1) + WXPayUtil.generateNonceStr()[0],
      nonce_str: WXPayUtil.generateNonceStr(),
    };

    try {
      const sign = WXPayUtil.generateSignature(reqData, key);
      reqData.sign = sign;
      const wxPay = new WXPay(app.config.wx);
      const res = await wxPay.orderQuery(reqData);
      if (res.return_code === WXPayConstants.SUCCESS && res.result_code === WXPayConstants.SUCCESS) {
        const tradeState = res.trade_state;
        if (tradeState === WXPayConstants.SUCCESS) {
          await app.mysql.update('tb_order', { id: 1, status: 2, payment_type: 1 });
          return ok('订单状态已修改', ctx);
        }
      }
      return ok('订单状态未修改', ctx);
    } catch (e) {
      throw new Error('查询支付订单失败');
    }
  }

  async recieveMessage() {
    const { ctx, app } = this;
    const buffers = [];
    ctx.req.on('data', chunk => {
      buffers.push(chunk);
    });

    ctx.req.on('end', async () => {
      const xml = Buffer.concat(buffers).toString();
      const map = WXPayUtil.xmlToMap(xml);
      if (map.return_code === WXPayConstants.SUCCESS && map.result_code === WXPayConstants.SUCCESS) {
        await app.mysql.update('tb_order', { id: 1, status: 2 });
        const buf = Buffer.from('<xml><return_code><![CDATA[SUCCESS]]></return_code> <return_msg><![CDATA[OK]]></return_msg></xml>');
        ctx.body = buf;
      }
      // {
      //   appid: 'wx4cb8e9621950da45',
      //     bank_type: 'OTHERS',
      //   cash_fee: '1',
      //   fee_type: 'CNY',
      //   is_subscribe: 'N',
      //   mch_id: '1526972031',
      //   nonce_str: 'ZUN0JB1S6OAYA4PWLOFHVCNMIZ6470AK',
      //   openid: 'oNlSI5CKp8O5HRjvrl6lK0y4NJ8k',
      //   out_trade_no: 'X0000000120160529M',
      //   result_code: 'SUCCESS',
      //   return_code: 'SUCCESS',
      //   sign: 'C6BEF0AE218D3CD64C7DC38614624E66',
      //   time_end: '20201217153754',
      //   total_fee: 1,
      //   trade_type: 'JSAPI',
      //   transaction_id: '4200000843202012174487377737'
      // } 1234

    });

  }

}

module.exports = WxController;
