var express = require('express');
var PostModel = require('./models/post');
var router = express.Router();

//匹配路由和处理函数，还需要在调度文件中挂载该文件（调用app.use关联路由和该文件）
/* GET users lists. */
router.get('/users', function(req, res, next) {//同理，没有挂载路径的中间件，通过该路由的每个请求都执行该中间件；指向具体请求的，执行路由对应中间件
  res.send('respond with a resource');        
});                                           


/* POST posts */
/* router.post('/posts', function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  res.send({title, content}); // 收到数据后，又把数据返回给了请求方
}); */

/* POST create post */  //接受数据保存到数据库里，不需要渲染，所以放到api路由里；但不和另一个create页面放一起，路由是不是不太对
router.post('/posts/create', function(req, res, next) {
  console.log("看到数据了1")
  var title = req.body.title;
  var content = req.body.content;

  var post = new PostModel();
  post.title = title;
  post.content = content;
  console.log("看到数据了2")
  post.save(function (err, doc) {
    res.json({success: true});
  });
});

/* GET posts lists */ 
/* router.get('/posts', function(req, res, next) {
  PostModel.find({}, {}, function (err, posts) {
    if (err) {
      res.json({ success: false });
      return;
    }

    res.json({ success: true, postsList: posts });
  });
}) */



module.exports = router;