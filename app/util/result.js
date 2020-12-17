'use strict';

class Result {
  static ok(data, ctx) {
    if (!ctx) return console.error('Result的方法，ctx必传！！');
    ctx.body = {
      data,
      success: true,
      message: '成功',
    };
  }

  static error(err, ctx) {
    if (!ctx) return console.error('Result的方法，ctx必传！！');
    ctx.body = {
      success: false,
      message: err,
    };
  }
}

module.exports = Result;
