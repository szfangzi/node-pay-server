'use strict';

const auth = require('./middleware/auth');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/app/wx/login', controller.app.wx.login);
  router.post('/app/user/login', controller.app.user.login);
  router.post('/app/wx/microAppPayOrder', auth, controller.app.wx.microAppPayOrder);
  router.post('/app/wx/nativePayOrder', auth, controller.app.wx.nativePayOrder);
  router.post('/app/wx/scanCodePayOrder', auth, controller.app.wx.scanCodePayOrder);
  router.post('/app/wx/updateOrderStatus', auth, controller.app.wx.updateOrderStatus);
  router.post('/app/wx/recieveMessage', controller.app.wx.recieveMessage);
  router.post('/app/order/searchUserOrderList', auth, controller.app.order.searchUserOrderList);
  router.post('/app/zfb/login', controller.app.zfb.login);
  router.post('/app/zfb/microAppPayOrder', auth, controller.app.zfb.microAppPayOrder);
  router.post('/app/zfb/recieveMicroMessage', controller.app.zfb.recieveMicroMessage);
};
