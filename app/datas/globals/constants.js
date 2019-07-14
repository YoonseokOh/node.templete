/*
 * Function : constants.js
 *
 * Description :
 *
 * Copyright (c) 2019, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

const _ = require('lodash');
const config = require('config');

global.cfgDefault = config.get('cfg');
global.cfg = _.cloneDeep(cfgDefault);

global.layout = {
  none: 'none',
  default: 'default',
  pc: 'pc',
  mobile: 'mobile'
};

global.validPath = {
  index: true,
	error: true
};

// Api response or result type
global.ApiRes = function (status, code, message, data) {
  this.status = !!status;
  this.code = code? code : '';
  this.message = message? message : '';
  this.data = data? data : false;
};

// Exception error response for promise return
global.errorRes = function (e, code, message, data) {
  const errCode = code ? code : 'ER0001';
  return ((e instanceof ApiRes) ? e : new ApiRes(false, errCode, 'Undefined Error - ' + (message ? message : '') + e.stack.substr(0, cfg.parameters.debugStackLength), data));
};
