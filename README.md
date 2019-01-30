# node.templete

### Setting
- npm install : install npm packages
- bower install : install js packages
- npm i -g nodemon (Optional) : install auto server reload module

### Config
You can add secret addtional config in config folder for keys or config overriding.

Example) export NODE_ENV='production'

You need to add production.json in config folders.
Do not add other configs to git files for security.

### Config for external service apis
cfg.google.googleAnalytics : google analytics id
cfg.google.googleSearch : google search certification url
cfg.google.googleMap : google map api key
cfg.facebook.appId : facebook pixel app id
cfg.intercom.appId : intercom app id

### Run
- npm start
- node bin/app
- npm nodemon
- nodemon bin/app

### Contact
yoonseokoh@yoonseokoh.com
