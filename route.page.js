var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET posts page. */
router.get('/posts', function(req, res, next) {
  res.render('posts', { title: 'posts'} );
});

/* GET posts edit page. */
router.get('/posts/create', function(req, res, next) {
  res.render('create');
});

/* GET homesite lists */
router.get('homesite', function(req, res, next) {
  res.render('homesite');
});

module.exports = router;