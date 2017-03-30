var passport = require('passport');
var QqStrategy = require('passport-qq').Strategy;

exports.setup = function (User, config) {
  passport.use(new QqStrategy({
      clientID: config.qq.clientID,
      clientSecret: config.qq.clientSecret,
      callbackURL: config.qq.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'qq.id': profile.id
      }, function(err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'qq',
            qq: profile._json
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};
