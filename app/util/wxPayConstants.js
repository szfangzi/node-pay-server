'use strict';

const SignType = {
  MD5: 'MD5',
  HMACSHA256: 'HMACSHA256',
};

const WXPayConstants = {

  DOMAIN_API: 'api.mch.weixin.qq.com',
  DOMAIN_API2: 'api2.mch.weixin.qq.com',
  DOMAIN_APIHK: 'apihk.mch.weixin.qq.com',
  DOMAIN_APIUS: 'apius.mch.weixin.qq.com',

  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS',
  HMACSHA256: 'HMAC-SHA256',
  MD5: 'MD5',

  FIELD_SIGN: 'sign',
  FIELD_SIGN_TYPE: 'sign_type',

  WXPAYSDK_VERSION: 'WXPaySDK/3.0.9',
  // static USER_AGENT : WXPAYSDK_VERSION +
  // " (" + System.getProperty("os.arch") + " " + System.getProperty("os.name") + " " + System.getProperty("os.version") +
  // ") Java/" + System.getProperty("java.version") + " HttpClient/" + HttpClient.class.getPackage().getImplementationVersion(),

  MICROPAY_URL_SUFFIX: '/pay/micropay',
  UNIFIEDORDER_URL_SUFFIX: '/pay/unifiedorder',
  ORDERQUERY_URL_SUFFIX: '/pay/orderquery',
  REVERSE_URL_SUFFIX: '/secapi/pay/reverse',
  CLOSEORDER_URL_SUFFIX: '/pay/closeorder',
  REFUND_URL_SUFFIX: '/secapi/pay/refund',
  REFUNDQUERY_URL_SUFFIX: '/pay/refundquery',
  DOWNLOADBILL_URL_SUFFIX: '/pay/downloadbill',
  REPORT_URL_SUFFIX: '/payitil/report',
  SHORTURL_URL_SUFFIX: '/tools/shorturl',
  AUTHCODETOOPENID_URL_SUFFIX: '/tools/authcodetoopenid',

  // sandbox
  SANDBOX_MICROPAY_URL_SUFFIX: '/sandboxnew/pay/micropay',
  SANDBOX_UNIFIEDORDER_URL_SUFFIX: '/sandboxnew/pay/unifiedorder',
  SANDBOX_ORDERQUERY_URL_SUFFIX: '/sandboxnew/pay/orderquery',
  SANDBOX_REVERSE_URL_SUFFIX: '/sandboxnew/secapi/pay/reverse',
  SANDBOX_CLOSEORDER_URL_SUFFIX: '/sandboxnew/pay/closeorder',
  SANDBOX_REFUND_URL_SUFFIX: '/sandboxnew/secapi/pay/refund',
  SANDBOX_REFUNDQUERY_URL_SUFFIX: '/sandboxnew/pay/refundquery',
  SANDBOX_DOWNLOADBILL_URL_SUFFIX: '/sandboxnew/pay/downloadbill',
  SANDBOX_REPORT_URL_SUFFIX: '/sandboxnew/payitil/report',
  SANDBOX_SHORTURL_URL_SUFFIX: '/sandboxnew/tools/shorturl',
  SANDBOX_AUTHCODETOOPENID_URL_SUFFIX: '/sandboxnew/tools/authcodetoopenid',

};

module.exports = {
  WXPayConstants,
  SignType,
};
