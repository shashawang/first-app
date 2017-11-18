var express = require('express');
var PostModel = require('./models/post');
var router = express.Router();

//匹配路由和处理函数，还需要在调度文件中挂载该文件（调用app.use关联路由和该文件）
/* GET users lists. */
router.get('/users', function(req, res, next) {//同理，没有挂载路径的中间件，通过该路由的每个请求都执行该中间件；指向具体请求的，执行路由对应中间件
  res.send('respond with a resource');        
});                                           

/* GET posts lists */
router.get('/posts', function(req, res, next) {
  res.json({postsList: ['文章1', '文章2', '文章3']});
});

/* POST posts */
router.post('/posts', function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  res.send({title, content}); // 收到数据后，又把数据返回给了请求方
});

/* POST create post */
router.post('/posts/create', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;

  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.save(function (err, doc) {
    res.json({success: true});
  });
});

/* GET posts lists */
router.get('/posts', function(req, res, next) {
  PostModel.find({}, {}, function (err, posts) {
    if (err) {
      res.json({ success: false });
      return;
    }

    res.json({ success: true, postsList: posts });
  });
})

module.exports = router;