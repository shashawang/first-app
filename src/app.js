//核心调度文件
/* process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
}); //这段代码只有5min寿命 */

require('./models/init'); //引入数据库和模块
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var config = require('./config'); 
var auth = require('./middlewares/auth');
var favicons = require('connect-favicons');
var express = require('express'),
ipfilter = require('express-ipfilter').IpFilter; //为啥前面不用var,因为前面是逗号哈哈
var connectMongodb = require('connect-mongo');
var session = require('express-session');
var domain = require('domain');

var page = require('./route.page'); //注册路由和路由文件
var api = require('./route.api');
var MongoStore = new connectMongodb(session);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //注册视图和视图文件，绑定解析引擎
app.set('view engine', 'ejs');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json()); //第三方中间件；可以在package中找到；
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.cookieName));
app.use(favicons(__dirname + '/public/img/icons'));                                                          
app.use(express.static(path.join(__dirname, 'public')));  //托管静态资源，唯一的express内置中间件

// app.use( 使用jwt替代session了
//   session({
//     secret: config.sessionSecret,
//     store: new MongoStore({
//       url: config.mongodbUrl
//     }),
//     resave: true,
//     saveUninitialized: true
//   })
// );
app.use(auth.authUser);//改用import导入这里咋写
app.use('/', page);   //分析路由；挂载到对应id的中间件
app.use('/api/v1', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) { //没有挂载路径的中间件，应用的每个请求都会执行它
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) { //执行时调用view中的error文件，在页面上打印错误信息；有四个参数；
  // set locals, only providing error in development    
  /* var d = domain.create();
  //监听domain的错误事件
  d.on('error', function (err) { */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.format({
    json() {
      res.send({error: err.toString()});
    },
    html() {
      res.render('error');
    },
    default() {
      const message = '${errorDetails';
      res.send('500 Internal server error:\n${err.toString()}');
    },
  });
});
/* }); */

module.exports = app;
