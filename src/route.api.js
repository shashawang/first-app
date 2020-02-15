var express = require('express');
var PostModel = require('./models/post');
var router = express.Router();
var bcrypt = require('bcrypt');//bcrypt 这个库用来对密码做hash求值，将密码的 hash 值存在数据库中
var UserModel = require('./models/user');
var config = require('./config');

//匹配路由和处理函数，还需要在调度文件中挂载该文件（调用app.use关联路由和该文件）
/* GET users lists. */
router.get('/users', function(req, res, next) {//同理，没有挂载路径的中间件，通过该路由的每个请求都执行该中间件；指向具体请求的，执行路由对应中间件
  res.send('respond with a resource');        
});

/* GET posts lists */
router.get('/posts', function (req, res, next) {
  PostModel.find({}, {}, function (err, posts) {
    if (err) {
      next(err);
    } else {
      res.json({ postsList: posts });
    }
  });
});                                           

/* POST create post */  //接受数据保存到数据库里，不需要渲染，所以放到api路由里；但不和另一个create页面放一起，路由是不是不太对
router.post('/posts', function(req, res, next) { 
  var title = req.body.title;
  var content = req.body.content;
  console.log([title,content])

  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.authorId = res.locals.currentUser._id;
  console.log(authorId);
  post.save(function (err, doc) {
    if (err) {
      next(err);
    } else {
      res.json({post: doc}); // 注意这里
    }
  });
});


/* POST posts */
/* router.post('/posts', function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  res.send({title, content}); // 收到数据后，又把数据返回给了请求方
}); */

/* GET posts lists */ 
 router.get('/posts', function(req, res, next) {
  PostModel.find({}, {}, function (err, posts) {
    if (err) {
      next(err);
      return;
    }

    res.json({ postsList: posts });
  });
}) 

/* GET one post */
router.get('/posts/:id', function (req, res, next) {
  var id = req.query.id;

  PostModel.findOne({_id: id}, function(err, post) {
    if (err) {
      next(err);
      return;
    }

    res.json({ success: true, post });
  });
});

/* PATCH edit post */
router.patch('/posts', function(req, res, next) {
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({ _id: id }, { title, content }, function(err) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true });
    }
  });
});

/* POST signup user */
router.post('/signup', function(req, res, next) {
  var name = req.body.name;
  var pass = req.body.pass;
  var rePass = req.body.rePass;

  if (pass !== rePass) {
    return errorHandle(new Error('两次密码不对'), next);
  }

  var user = new UserModel();
  user.name = name;
  user.pass = bcrypt.hashSync(pass, 10);
  user.save(function(err) { //两次密码填写一样，保存用户信息
    if (err) {
      next(err);
    } else {
      res.end();
    }
  });
});

/* POST signin user */
router.post('/signin', function(req, res, next) {
  var name = req.body.name || '';
  var pass = req.body.pass || '';

  UserModel.findOne({ name }, function(err, user) {
    if (err || !user) {
      return next(new Error('找不到用户'));
    } else {
      var isOk = bcrypt.compareSync(pass, user.pass);
      if (!isOk) {
        return next(new Error('密码不对'));
      } 

      // var authToken = user._id;
      const token = jwt.encode(
        {
          _id: user._id,
          name: user.name,
          isAdmin: user.name === config.admin ? true : false,
          // exp: moment().add('days', 30).valueOf(),
        },
        config.jwtSecret
      );

      var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30, // cookie 有效期30天
        signed: true,
        httpOnly: true
      };

      res.cookie(config.cookieName, authToken, opts);
      // res.end();
      res.json({ token });
    }
  });
});

module.exports = router;