'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['qq', 'weibo', 'github', 'twitter', 'facebook', 'google'];

var UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true
  },
  department: {
    type: String,
    default: 'internet'
  }, //工作单位，互联网自注册用户，默认单位：互联网 ，主要保存会员单位信息和
  contact: String, //联系信息，地址 手机号等
  resetpasskey: Schema.Types.ObjectId,
  activekey: Schema.Types.ObjectId,
  active: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'user' //user互联网自注册 oper会员单位操作员 manager协会工作人员 admin管理员
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  qq: {},
  weibo: {},
  facebook: {},
  twitter: {},
  google: {},
  github: {}
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

  // Validate email is not taken
  UserSchema
    .path('email')
    .validate(function(value, respond) {
      var self = this;
      this.constructor.findOne({
        email: value
      }, function(err, user) {
        if (err) throw err;
        if (user) {
          if (self.id === user.id) return respond(true);
          return respond(false);
        }
        respond(true);
      });
    }, 'The specified email address is already in use.');
//两个参数的校验器得到如下提示信息
// (node:30616) DeprecationWarning: Implicit async custom validators (custom validators that take 2 arguments) are deprecated in mongoose >= 4.9.0.
// See http://mongoosejs.com/docs/validation.html#async-custom-validators for more info.

//唯一性校验可参考 https://github.com/blakehaswell/mongoose-unique-validator 实现

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64,'sha1').toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
