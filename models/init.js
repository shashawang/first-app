//在数据库文件夹中建一个文件，用mongoose连上mongoodb，还要在调度核心文件中引入
var mongoose = require('mongoose');//引入模块

mongoose.connect('mongodb://localhost:27017/firstapp', {

  //直接安装mongodb并启动后，端口号默认是27017，如果通过docker安装，端口号会是其他。这边抄的L15代码
  useMongoClient: true
});  //包括路径参数（端口号/数据库名）和链接的数据库

