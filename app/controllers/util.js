/*
 * Function : util.js
 *
 * Description :
 *
 * Copyright (c) 2019, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

module.exports = (function () {
  function clientPreProcessing(req, res) {
    const regexMobile = /Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/;
    const regexTablet = /Tablet|iPad|GT-P1000|Nexus 7/;

    // client header
    req.clientInfo = {};

    // Host
    req.clientInfo.host = req.headers.host;

    // UserAgent
    req.clientInfo.userAgent = req.header('user-agent');
    req.clientInfo.userIp = req.headers['x-forwarded-for'] || (req.connection && (req.connection.remoteAddress || req.connection.socket.remoteAddress)) || (req.socket && req.socket.remoteAddress) || '';

    // Check Mobile
    req.clientInfo.isMobile = (regexMobile.test(req.header('user-agent')) || regexTablet.test(req.header('user-agent')));
    req.clientInfo.isTablet = (regexTablet.test(req.header('user-agent')));

    // Check bot
    req.clientInfo.isBot = (req.clientInfo.userAgent && req.clientInfo.userAgent.indexOf('Googlebot') > -1);

    // For 3rd party log
    req.clientInfo.isLocal = (req.clientInfo.host.indexOf('localhost') > -1 || req.clientInfo.host.indexOf('127.0.0.1') > -1);

    // Check Ajax
    req.clientInfo.isAjax = !!(req.xhr || req.headers.ajax);

    // Check lang
    if (req.cookies.lang && cfg.parameters.langAvailable[req.cookies.lang]) {
      req.clientInfo.lang = req.cookies.lang;
    } else {
      res.cookie('lang', cfg.parameters.default.lang, {maxAge: 12 * cfg.parameters.time.month2msec});
      req.clientInfo.lang = cfg.parameters.default.lang;
    }

    // User token for tracking log (including guest) in a year
    req.clientInfo.cookies = {};
    // Added uuid for client
    if (!req.cookies[cfg.client.cookie.uuid]) {
      const clientUUID = Date.now() * 1000 + parseInt(Math.random() * 1000, 10);
      req.clientInfo.cookies[cfg.client.cookie.uuid] = clientUUID;
      res.cookie(cfg.client.cookie.uuid, clientUUID, {maxAge: 12 * cfg.parameters.time.month2msec});
    } else {
      req.clientInfo.cookies[cfg.client.cookie.uuid] = req.cookies[cfg.client.cookie.uuid];
      res.cookie(cfg.client.cookie.uuid, req.cookies[cfg.client.cookie.uuid], {maxAge: 12 * cfg.parameters.time.month2msec});
    }

    // uuid session count
    let uuidCount = 0;
    if (!req.cookies[cfg.client.cookie.count] || !Number(req.cookies[cfg.client.cookie.count])) {
      uuidCount = 1;
    } else {
      uuidCount = Number(req.cookies[cfg.client.cookie.count]) + 1;
    }
    req.cookies[cfg.client.cookie.count] = uuidCount;
    req.clientInfo.cookies[cfg.client.cookie.count] = uuidCount;
    res.cookie(cfg.client.cookie.count, uuidCount, {maxAge: 12 * cfg.parameters.time.month2msec});
  }

  return {
    clientPreProcessing
  };
})();
