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
  res.render(`${req.clientRes.userAgent}/index.hbs`, req.clientRes);
});

/* test */
router.all('/ping', function(req, res, next) {
  const data = require('../models/local/jsons/temp');

  res.json(new ApiRes(true, 'Success', 'pong', data));
});

module.exports = router;
