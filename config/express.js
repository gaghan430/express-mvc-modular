var express        = require('express');
var glob           = require('glob');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var compress       = require('compression');
var methodOverride = require('method-override');
var ECT            = require('ect');
var mongoose       = require('mongoose');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  // Setup ECT Render Template
  var ectRenderer = ECT({ 
    watch: true, 
    root: config.root + '/app/views', 
    ext : '.html',
    open: '{{',
    close: '}}',
  });
  app.set('view engine', 'html');
  app.engine('html', ectRenderer.render);
  app.set('views', config.root + '/app/views');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  // Load Models
  // app.models = require(config.root + '/app/models')(app, mongoose);
  // Load Controllers
  app.controllers = require(config.root + '/app/controllers')(app);
  // Load Routes
  require(config.root + '/app/routes.js')(app);

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};
