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

const path = require('path');
const express = require('express');
const router = express.Router();
const clientIndex = path.join(__dirname, '../../dist/index.html');

// Google search
if (cfg.google.googleSearch) {
  router.get(`/${cfg.google.googleSearch}.html`, (req, res, next) => {
    res.type('text/plain').send(`google-site-verification: ${cfg.google.googleSearch}.html`);
  });
}

/* test */
router.all('/ping', function(req, res, next) {
  const data = require('../models/local/jsons/temp');

  res.json(new ApiRes(true, 'Success', 'pong', data));
});

router.get(/.*/, function(req, res, next) {
  res.sendFile(clientIndex, function(err) {
    if (err) {
      next(err);
    }
  });
});

module.exports = router;
