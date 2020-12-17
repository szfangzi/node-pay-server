'use strict';

const auth = require('./middleware/auth');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/app/wx/login', controller.app.wx.login);
  router.post('/app/wx/microAppPayOrder', auth, controller.app.wx.microAppPayOrder);
  router.post('/app/wx/recieveMessage', controller.app.wx.recieveMessage);
  router.post('/app/order/searchUserOrderList', auth, controller.app.order.searchUserOrderList);
};
