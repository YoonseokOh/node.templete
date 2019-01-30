/*
 * Function : post-route.js
 *
 * Description :
 *
 * Copyright (c) 2019, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

"use strict";

module.exports = function(express) {
  const createError = require('http-errors');

  // catch 404 and forward to error handler
  express.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  express.use(function(err, req, res, next) {
    if (cfg.env !== 'production') {
      console.error('\n\n[error] post route');
      console.error(err);
    }

    // set locals, only providing error except production
    res.locals.message = err.message;
    res.locals.error = cfg.env !== 'production'? err : {};

    // render the error page
    res.status(err.status || 500);

    if (req.clientInfo.isAjax) {
      res.json(res.locals);
    } else {
      res.render('common/common/error.hbs');
    }
  });
};
