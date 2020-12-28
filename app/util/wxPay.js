'use strict';

const { WXPayConstants, SignType } = require('./wxPayConstants');
const WXPayUtil = require('./wxPayUtil');
const WXPayRequest = require('./wxPayRequest');

class WXPay {
  constructor(config, notifyUrl, useSandbox) {
    this.appId = config.appId;
    this.appSecret = config.appSecret;
    this.key = config.key;
    this.mchId = config.mchId;
    this.certPath = config.certPath;
    this.notifyUrl = notifyUrl;
    this.useSandbox = useSandbox;
    if (useSandbox) {
      this.signType = SignType.MD5; // 沙箱环境
    } else {
      this.signType = SignType.MD5;
    }
    this.wxPayRequest = new WXPayRequest(config);
  }

  async unifiedOrder(reqData) {
    let url = '';
    if (this.useSandbox) {
      url = WXPayConstants.SANDBOX_UNIFIEDORDER_URL_SUFFIX;
    } else {
      url = WXPayConstants.UNIFIEDORDER_URL_SUFFIX;
    }
    if (this.notifyUrl) reqData.notify_url = this.notifyUrl;
    const resXML = await this.requestWithoutCert(url, this.fillRequestData(reqData));
    return this.processResponseXml(resXML);
  }

  async microPay(reqData) {
    let url = '';
    if (this.useSandbox) {
      url = WXPayConstants.SANDBOX_MICROPAY_URL_SUFFIX;
    } else {
      url = WXPayConstants.MICROPAY_URL_SUFFIX;
    }
    if (this.notifyUrl) reqData.notify_url = this.notifyUrl;
    const resXML = await this.requestWithoutCert(url, this.fillRequestData(reqData));
    return this.processResponseXml(resXML);
  }

  requestWithoutCert(urlSuffix, reqData) {
    const msgUUID = reqData.nonce_str;
    const reqBody = WXPayUtil.mapToXml(reqData);
    return this.wxPayRequest.requestWithoutCert(urlSuffix, msgUUID, reqBody);
  }

  processResponseXml(resXML) {
    return WXPayUtil.xmlToMap(resXML);
  }

  fillRequestData(reqData) {
    reqData.appid = this.appId;
    reqData.mch_id = this.mchId;
    reqData.nonce_str = WXPayUtil.generateNonceStr();
    reqData.sign_type = this.signType;
    reqData.sign = WXPayUtil.generateSignature(reqData, this.key, this.signType);
    return reqData;
  }

  async orderQuery(reqData) {
    let url = '';
    if (this.useSandbox) {
      url = WXPayConstants.SANDBOX_ORDERQUERY_URL_SUFFIX;
    } else {
      url = WXPayConstants.ORDERQUERY_URL_SUFFIX;
    }
    const resXML = await this.requestWithoutCert(url, this.fillRequestData(reqData));
    return this.processResponseXml(resXML);
  }

}

module.exports = WXPay;
