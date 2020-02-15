//在数据库文件夹中建一个文件，用mongoose连上mongoodb，还要在调度核心文件中引入
var mongoose = require('mongoose');//引入模块
var config = require('../config');

mongoose.connect(config.mongodbUrl, {
  useMongoClient: true
}); //包括路径参数（端口号/数据库名）和链接的数据库

const db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})