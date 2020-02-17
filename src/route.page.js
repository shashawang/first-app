var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var marked = require('marked');
var config = require('./config');
var auth = require('./middlewares/auth');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET posts page. */
router.get('/', function(req, res, next) {
  res.render('posts', { title: 'posts'} );
  });

/* GET posts edit page. */
router.get('/posts/create', auth.adminRequired, function(req, res, next) {
  res.render('create');
});


/* GET homesite lists */
router.get('/homesite', function(req, res, next) {
  res.render('homesite');
});

/* GET posts show page. */
router.get('/posts/show', function (req, res, next) {
  var id = req.query.id;

  PostModel.findOne({_id: id}, function (err, post) {
    post.content = marked(post.content);
    res.render('show', {post}); //具体id怎么和post数据对应呢？
  });
});

/* GET posts edit page. */
router.get('/posts/edit', function (req, res, next) {
  var id = req.query.id;

  res.render('edit', { id });
});


/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

/* GET signin page. */
router.get('/signin', function (req, res, next) {
  res.render('signin');
});

/* GET signout */
router.get('/signout', function (req, res, next) {
  res.clearCookie(config.cookieName, { path: '/' });
  console.log("马上要退出啦");
  res.redirect('/');
  console.log("出来了没");
});

module.exports = router;

