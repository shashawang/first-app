//检查登录状态
var config = require('../config');
var UserModel = require('../models/user');

function authUser(req, res, next) {
  const authToken = req.signedCookies[config.cookieName] || '';
  res.locals.currentUser = null;

  if (authToken) {
    UserModel.findOne({ _id: authToken }, function(err, user) {
      if (err) {
        next(); // 为什么这里不是next(err)：因为要检查id不是要检查错误么
      } else {
        res.locals.currentUser = user;
        next(); //为什么这里不是next(err)？？
      }
    });
  } else {
    next();
  }
}

module.exports = { authUser };