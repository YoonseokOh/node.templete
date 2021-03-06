/*
 * Function : index.js
 *
 * Description : main route
 *
 * Copyright (c) 2019, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

const express = require('express');
const router = express.Router();

// Google search
if (cfg.google.googleSearch) {
  router.get(`/${cfg.google.googleSearch}.html`, (req, res, next) => {
    res.render(`common/commom/google_search.hbs`);
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.clientInfo.isMobile) {
    res.render(`mobile/index.hbs`, req.clientRes);
  } else {
    res.render(`pc/index.hbs`, req.clientRes);
  }
});

/* test */
router.all('/ping', function(req, res, next) {
  const data = require('../models/local/jsons/temp');

  res.json(new ApiRes(true, 'Success', 'pong', data));
});

/* GET home page. */
router.all('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
