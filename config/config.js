var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'documents'
    },
    port: 3000,
    db: 'mongodb://localhost/express'
  },

  test: {
    root: rootPath,
    app: {
      name: 'documents'
    },
    port: 3000,
    db: 'mongodb://localhost/documents-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'documents'
    },
    port: 3000,
    db: 'mongodb://localhost/documents-production'
  }
};

module.exports = config[env];
