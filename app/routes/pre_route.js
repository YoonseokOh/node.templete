/*
 * Function : pre-route.js
 *
 * Description :
 *
 * Copyright (c) 2019, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

module.exports = function(express) {
  const uid = require('uid-safe');
  const utilCtrls = require('../controllers/util');

  if (cfg.env === 'development') {
    express.use(function (req, res, next) {
      console.log(decodeURI(req.originalUrl));
      next();
    });
  }

  express.use(function (req, res, next) {
    // User token for tracking log (including guest)
    if (!req.cookies[cfg.token.session]) {
      const userToken = uid.sync(24);
      res.cookie(cfg.token.session, userToken, {
        maxAge: 1 * cfg.parameters.time.month2msec
      });
    }

    utilCtrls.clientPreProcessing(req, res);

    // GET -> POST
    req.clientInfo.params = Object.assign({}, req.query, req.body);

    if (cfg.debug.preroute) {
      console.log('\n\n[route] req.clientInfo');
      console.log(req.clientInfo);
    }

    req.clientRes = {
      layout: req.clientInfo.isMobile? layout.mobile : layout.pc,
      userAgent: req.clientInfo.isMobile? 'mobile' : 'pc',
      isLocal: req.clientInfo.isLocal || false,
      lang: req.clientInfo.lang || cfg.parameters.default.lang,
      params: req.clientInfo.params
    };

    next();
  });
};
