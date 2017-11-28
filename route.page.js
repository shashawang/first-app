var express = require('express');
var router = express.Router();
var PostModel = require('./models/post')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET posts page. 删掉*/
/* GET posts lists */ 
router.get('/posts', function(req, res, next) {
  PostModel.find({}, {}, function (err, posts) {
    if (err) {
      res.json({ success: false });
      return;
    }

    res.json({ success: true, postsList: posts });
  });
});


/* GET posts edit page. */
router.get('/posts/create', function(req, res, next) {
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
    res.render('show', {post}); //具体id怎么和post数据对应呢？
  });
});

module.exports = router;

