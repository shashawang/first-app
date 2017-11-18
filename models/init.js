//在数据库文件夹中建一个文件，用mongoose连上mongoodb，还要在调度核心文件中引入
var mongoose = require('mongoose');//引入模块

mongoose.connect('mongodb://localhost:32770/firstapp', {
  useMongoClient: true
});  //包括路径参数（端口号/数据库名）和链接的数据库