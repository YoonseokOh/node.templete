/*
 * Function : app.js
 *
 * Description : Main app
 *
 * Copyright (c) 2019, Yoonseok Oh.
 * Licensed under yoonseok oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const minify = require('express-minify');
const logger = require('morgan');

const app = express();

// Set global constants
require('./app/datas/globals/constants');

// view engine setup
const hbs = require('./app/views/hbs_customize'); // custermized hbs
app.set('trust proxy', 'loopback');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app/views'));

// Add middle-wares
app.use(logger('dev'));
app.use(minify());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public direct url check (css/icon/img/js)
app.use(express.static(path.join(__dirname, 'public')));

// Set pre router
require('./app/routes/pre_route')(app);

const indexRouter = require('./app/routes/index');

app.use('/', indexRouter);

// Set post router
require('./app/routes/post_route')(app);

module.exports = app;
