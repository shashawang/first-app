var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var PostSchema = new Schema({   //构建表模型
    title: String,
    content: String,     //模型的两个字段
    authorId: String, // 添加作者ID,直接抄ObjectId会报错滴，string是保留字？为啥老师写就没报错？？
});

var PostModel = mongoose.model('Post', PostSchema);     //关联（并新建）表和模型

module.exports = PostModel;