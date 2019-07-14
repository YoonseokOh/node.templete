/*
 * Function : hbs-customize.js
 *
 * Description : customized function of handlebars
 *
 * Copyright (c) 2019, Yoonseok Oh.
 * Licensed under yoonseok oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

const hbs = require('handlebars');
const blocks = {};

// HTML save
hbs.registerHelper('extend', function (type, name, context) {
  if (!blocks[type]) {
    blocks[type] = {}
  }

  const block = blocks[type];

  if (!block.scriptArray) {
    block.scriptArray = []
  }

  if (!block[name]) {
    block[name] = true;
    block.scriptArray.push(context.fn(this))
  } else {
    if (cfg.debug.hbs) {
      console.log('\n\n[HBS extend] unexpected');
      console.log(type);
      console.log(name);
      console.log(context.fn(this));
    }
  }
});

// HTML insert
hbs.registerHelper('block', function (type) {
  const val = ((blocks[type] && blocks[type].scriptArray) || []).join('\n');
  blocks[type] = {};
  return val;
});

// Check equal or not
hbs.registerHelper('eq', function(a, b, options) {
  if (a === b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// Return Iterative block function
hbs.registerHelper('times', function (n, block) {
  let tmpls = '';

  for (let i = 1; i <= n; ++i) {
    tmpls += block.fn(i);
  }
  return tmpls;
});

// Get cfg
hbs.registerHelper('cfg', function(cfgPath) {
  const pathArray = typeof cfgPath === 'string'? cfgPath.split('.') : [];
  let tempCfg = cfg;
  let value = '';

  for (let i = 0; i < pathArray.length; i++) {
    if (tempCfg[pathArray[i]]) {
      if (i === pathArray.length - 1) {
        value = tempCfg[pathArray[i]];
      } else {
        tempCfg = tempCfg[pathArray[i]];
      }
    } else {
      // break
      i = pathArray.length;
    }
  }

  return value;
});

hbs.registerHelper('isActive', function(path, parmas) {
  const isActive = parmas
    .split(",")
    .some(function(item){
      return path === item
    });
  return isActive? 'on' : '';
});

// Return Iterative block function
const availLang = {
  en: false,
  ko: false,
  ch: false
};

const availPage = {

};

hbs.registerHelper('langDisplay', function (langInput, page, word) {
  let display = '';
  let lang = cfg.parameters.default.lang;

  if (cfg.debug.lang) {
    console.log('\n\n[lang] lang input');
    console.log(langInput, availLang[langInput]);
    console.log(page, availPage[page]);
    console.log(word);
  }

  if (langInput && availLang[langInput]) {
    lang = langInput;
  }

  if (page && availPage[page]) {
    const langPackage = require(`./app/models/local/langs/${page}.json`);

    if (word && langPackage && langPackage[word]) {
      if (langPackage[word][lang]) {
        display = langPackage[word][lang];
      } else if (langPackage[word].en) {
        display = langPackage[word].en;
      }
    }

    if (cfg.debug.lang) {
      console.log(langPackage[word] && langPackage[word][lang]);
      console.log(display);
    }
  }

  return display;
});
