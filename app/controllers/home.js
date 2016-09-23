var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  db.Notes.findAll().then(function (notes) {
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: notes
    });
  });
});
