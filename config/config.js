var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'miniville'
    },
    port: 3000,
    db: 'mysql://root:root@localhost/dumb_db'
  },

  test: {
    root: rootPath,
    app: {
      name: 'miniville'
    },
    port: 3000,
    db: 'mysql://root:root@localhost/dumb_db'
  },

  production: {
    root: rootPath,
    app: {
      name: 'miniville'
    },
    port: 3000,
    db: 'mysql://root:root@localhost/dumb_db'
  }
};

module.exports = config[env];
