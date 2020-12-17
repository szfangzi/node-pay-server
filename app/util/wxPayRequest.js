'use strict';

const axios = require('axios');
const { WXPayConstants } = require('./wxPayConstants');

class WXPayRequest {
  constructor(config) {
    this.appId = config.appId;
    this.appSecret = config.appSecret;
    this.key = config.key;
    this.mchId = config.mchId;
    this.certPath = config.certPath;
  }

  requestWithoutCert(urlSuffix, msgUUID, reqBody) {
    return this.request(urlSuffix, msgUUID, reqBody, false);
  }

  async requestOnce(domain, urlSuffix, msgUUID, data, useCert) {
    // BasicHttpClientConnectionManager connManager;
    if (useCert) {
      //   // 证书
      //   char[] password = config.getMchID().toCharArray();
      //   InputStream certStream = config.getCertStream();
      //   KeyStore ks = KeyStore.getInstance("PKCS12");
      //   ks.load(certStream, password);
      //
      //   // 实例化密钥库 & 初始化密钥工厂
      //   KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
      //   kmf.init(ks, password);
      //
      //   // 创建 SSLContext
      //   SSLContext sslContext = SSLContext.getInstance("TLS");
      //   sslContext.init(kmf.getKeyManagers(), null, new SecureRandom());
      //
      //   SSLConnectionSocketFactory sslConnectionSocketFactory = new SSLConnectionSocketFactory(
      //     sslContext,
      //     new String[]{"TLSv1"},
      //   null,
      //     new DefaultHostnameVerifier());
      //
      //   connManager = new BasicHttpClientConnectionManager(
      //     RegistryBuilder.<ConnectionSocketFactory>create()
      //     .register("http", PlainConnectionSocketFactory.getSocketFactory())
      //     .register("https", sslConnectionSocketFactory)
      //     .build(),
      //     null,
      //     null,
      //     null
      //     );
      //     }
    } else {
      const url = 'https://' + domain + urlSuffix;
      const res = await axios.post(url, data, {
        headers: {
          contentType: 'text/xml',
          userAgent: ' ' + this.mchId,
        },
      });
      return res.data;
      //
      //       RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(readTimeoutMs).setConnectTimeout(connectTimeoutMs).build();
      //       httpPost.setConfig(requestConfig);
      //
      //       StringEntity postEntity = new StringEntity(data, "UTF-8");
      //       httpPost.addHeader("Content-Type", "text/xml");
      //       httpPost.addHeader("User-Agent", USER_AGENT + " " + config.getMchID());
      //       httpPost.setEntity(postEntity);
      //
      //       HttpResponse httpResponse = httpClient.execute(httpPost);
      //       HttpEntity httpEntity = httpResponse.getEntity();
      //       return EntityUtils.toString(httpEntity, "UTF-8");
    }

  }

  request(urlSuffix, msgUUID, data, useCert) {
    const domain = WXPayConstants.DOMAIN_API;
    return this.requestOnce(domain, urlSuffix, msgUUID, data, useCert);
  //   Exception exception = null;
  //   long elapsedTimeMillis = 0;
  //   long startTimestampMs = WXPayUtil.getCurrentTimestampMs();
  //   boolean firstHasDnsErr = false;
  //   boolean firstHasConnectTimeout = false;
  //   boolean firstHasReadTimeout = false;
  //   IWXPayDomain.DomainInfo domainInfo = config.getWXPayDomain().getDomain(config);
  //   if(domainInfo == null){
  //     throw new Exception("WXPayConfig.getWXPayDomain().getDomain() is empty or null");
  //   }
  //   try {
  //     String result = requestOnce(domainInfo.domain, urlSuffix, uuid, data, connectTimeoutMs, readTimeoutMs, useCert);
  //     elapsedTimeMillis = WXPayUtil.getCurrentTimestampMs()-startTimestampMs;
  //     config.getWXPayDomain().report(domainInfo.domain, elapsedTimeMillis, null);
  //     WXPayReport.getInstance(config).report(
  //       uuid,
  //       elapsedTimeMillis,
  //       domainInfo.domain,
  //       domainInfo.primaryDomain,
  //       connectTimeoutMs,
  //       readTimeoutMs,
  //       firstHasDnsErr,
  //       firstHasConnectTimeout,
  //       firstHasReadTimeout);
  //     return result;
  //   }
  //   catch (UnknownHostException ex) {  // dns 解析错误，或域名不存在
  //     exception = ex;
  //     firstHasDnsErr = true;
  //     elapsedTimeMillis = WXPayUtil.getCurrentTimestampMs()-startTimestampMs;
  //     WXPayUtil.getLogger().warn("UnknownHostException for domainInfo {}", domainInfo);
  //     WXPayReport.getInstance(config).report(
  //       uuid,
  //       elapsedTimeMillis,
  //       domainInfo.domain,
  //       domainInfo.primaryDomain,
  //       connectTimeoutMs,
  //       readTimeoutMs,
  //       firstHasDnsErr,
  //       firstHasConnectTimeout,
  //       firstHasReadTimeout
  //     );
  //   }
  // catch (ConnectTimeoutException ex) {
  //     exception = ex;
  //     firstHasConnectTimeout = true;
  //     elapsedTimeMillis = WXPayUtil.getCurrentTimestampMs()-startTimestampMs;
  //     WXPayUtil.getLogger().warn("connect timeout happened for domainInfo {}", domainInfo);
  //     WXPayReport.getInstance(config).report(
  //       uuid,
  //       elapsedTimeMillis,
  //       domainInfo.domain,
  //       domainInfo.primaryDomain,
  //       connectTimeoutMs,
  //       readTimeoutMs,
  //       firstHasDnsErr,
  //       firstHasConnectTimeout,
  //       firstHasReadTimeout
  //     );
  //   }
  // catch (SocketTimeoutException ex) {
  //     exception = ex;
  //     firstHasReadTimeout = true;
  //     elapsedTimeMillis = WXPayUtil.getCurrentTimestampMs()-startTimestampMs;
  //     WXPayUtil.getLogger().warn("timeout happened for domainInfo {}", domainInfo);
  //     WXPayReport.getInstance(config).report(
  //       uuid,
  //       elapsedTimeMillis,
  //       domainInfo.domain,
  //       domainInfo.primaryDomain,
  //       connectTimeoutMs,
  //       readTimeoutMs,
  //       firstHasDnsErr,
  //       firstHasConnectTimeout,
  //       firstHasReadTimeout);
  //   }
  // catch (Exception ex) {
  //     exception = ex;
  //     elapsedTimeMillis = WXPayUtil.getCurrentTimestampMs()-startTimestampMs;
  //     WXPayReport.getInstance(config).report(
  //       uuid,
  //       elapsedTimeMillis,
  //       domainInfo.domain,
  //       domainInfo.primaryDomain,
  //       connectTimeoutMs,
  //       readTimeoutMs,
  //       firstHasDnsErr,
  //       firstHasConnectTimeout,
  //       firstHasReadTimeout);
  //   }
  //   config.getWXPayDomain().report(domainInfo.domain, elapsedTimeMillis, exception);
  //   throw exception;
  }
}

module.exports = WXPayRequest;
