'use strict';

const jwt = require('jsonwebtoken');
const { error } = require('../util/result');

async function auth(ctx, next) {
  if (!ctx.request.header.token) return error(`${ctx.request.url} 接口需要登录token才能调用！`, ctx);
  const decoded = jwt.verify(ctx.request.header.token, ctx.app.config.jwt.secret);
  if (decoded && decoded.userId) {
    ctx.userId = decoded.userId;
    return await next();
  }
  error(`${ctx.request.url} 接口需要登录token才能调用！`, ctx);
}

module.exports = auth;
