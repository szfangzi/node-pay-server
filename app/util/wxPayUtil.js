'use strict';

const { WXPayConstants } = require('./wxPayConstants');
const CryptoJS = require('crypto-js');
const { SignType } = require('./wxPayConstants');
const parser = require('fast-xml-parser');

class WXPayUtil {
  static generateNonceStr() {
    const chars = new Array(32);
    for (let i = 0; i < chars.length; i++) {
      // 48 57 65 122
      let charCode = 48 + Math.floor(Math.random() * 35);
      if (charCode >= 57) charCode += 8;
      chars[i] = String.fromCharCode(charCode);
    }
    return chars.join('');
  }

  static generateSignature(reqData, key, signType = SignType.MD5) {
    let str = '';
    const reqDataArr = Object.entries(reqData);
    reqDataArr.sort((a, b) => {
      const aK = a[0],
        bK = b[0];
      const len = Math.min(aK.length, bK.length);
      for (let i = 0; i < len; i++) {
        if (aK[i].charCodeAt() !== bK[i].charCodeAt()) {
          return aK[i].charCodeAt() - bK[i].charCodeAt();
        }
      }
      return aK.length > bK.length ? -1 : 1;
    });
    reqDataArr.forEach(item => {
      const [ k, v ] = item;
      if (k === WXPayConstants.FIELD_SIGN) return;
      if (v.toString().trim().length > 0) {
        str += `${k}=${reqData[k]}&`;
      }
    });
    str += `key=${key}`;
    if (SignType.MD5 === signType) {
      return CryptoJS.MD5(str).toString(CryptoJS.enc.MD5).toUpperCase();
    } else if (SignType.HMACSHA256 === signType) {

    } else {
      throw new Error('sign_type 不符合规定！');
    }
    //   if (data.get(k).trim().length() > 0) // 参数值为空，则不参与签名
    //     sb.append(k).append("=").append(data.get(k).trim()).append("&");
    // }
    // sb.append("key=").append(key);
    // if (SignType.MD5.equals(signType)) {
    //   return MD5(sb.toString()).toUpperCase();
    // }
    // else if (SignType.HMACSHA256.equals(signType)) {
    //   return HMACSHA256(sb.toString(), key);
    // }
    // else {
    //   throw new Exception(String.format("Invalid sign_type: %s", signType));
    // }
  }

  static xmlToMap(xml){
    return parser.parse(xml).xml;
  }

  static mapToXml(map) {
    const items = [];
    let xml = '';
    for (const item in map) {
      const curVal = map[item];
      items.push('<' + item + '>' + curVal + '</' + item + '>');
    }
    xml = '<xml>' + items.join('') + '</xml>';
    return xml;
  }
}

module.exports = WXPayUtil;
