'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var sendMail = require('../../components/sendemail.js');
var mongoose = require('mongoose');
var _ = require('lodash');
var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.activekey = new mongoose.Types.ObjectId;
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    sendMail(user.email,"active",user.activekey,function(err,msg){
      var mailok=false;
      if(err){
        console.log("邮件发送失败");
        mailok=false;
      }else{
        console.log("邮件发送成功",msg);
        mailok=true;
      }
      res.json({mailok:mailok,email:user.email,userid:user._id, token: token });
    });
    //res.json({ token: token });
  });
};
exports.update = function(req, res, next) {
	//pre, post middleware are not executed on findByIdAndUpdate https://github.com/Automattic/mongoose/issues/964
	//因此会导致code的save前的validate不运行检查code重复
	if (req.body._id) {
		delete req.body._id;
	}
	console.log("user update",req.body);
	User.findById(req.params.id, '-salt -hashedPassword', function(err, user) {
		if (err) {
			return handleError(res, err);
		}
		if (!user) {
			return res.send(404);
		}
		console.log(user);
		var updated = _.assign(user, req.body);
    if(req.body.resetpass){
      updated.password="123456";
      console.log("重置密码");
    }
		console.log(updated);

		updated.save(function(err,user) {
			if (err) {
				return handleError(res, err);
			}
			console.log("返回",user);
			return res.json(200, user);
		});
	});
};

exports.active = function(req,res,next){
  var key = req.params.key;
  User.findOne({activekey:key},function(err,user){
    if(err || !user){
      console.log("用户激活失败",user);
      //res.json({ message: "用户激活失败" });
      res.redirect("/login?active=no");
    }else{
      user.active = true;
      user.save(function(err,user){
        if(err){
          console.log("用户激活失败");
          res.redirect("/login?active=no");
        }else{
          console.log("用户激活成功");
          res.redirect("/login?active=yes")
        }
        //res.json({ message: "账号激活" });
      })
    }
  })
}
exports.sendactivemail =function(req,res,next){
  var userId = req.params.key;
  var mailok=false;
  User.findById(userId, function (err, user) {
    if(!user){
      res.json({mailok:mailok,email:null,userid:null });
      return;
    }
    user.activekey = new mongoose.Types.ObjectId;
    user.save(function(err, user) {
      if (err) return validationError(res, err);
      sendMail(user.email,"active",user.activekey,function(err,msg){
        if(err){
          console.log("邮件发送失败");
          mailok=false;
        }else{
          console.log("邮件发送成功",msg);
          mailok=true;
        }
        res.json({mailok:mailok,email:user.email,userid:user._id });
      });
    });
  });
}
exports.resetpass = function(req,res,next){

}
/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
function handleError(res, err) {
  return res.send(500, err);
}
