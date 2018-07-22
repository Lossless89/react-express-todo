const mongoose = require('mongoose'),
crypto = require('crypto');

const secret = 'my super secret',
cipher = crypto.createCipher('aes192', secret),
decipher = crypto.createDecipher('aes192', secret);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .then(user => {
      
      if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }

      let decrypted = decipher.update(user.password, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      
      if (decrypted === password) {
        return callback(null, user);
      } else {
        return callback(null, null);
      }
    })
    .catch(err => {
      return callback(err);
    });
}    

UserSchema.pre('save', function(next) {
  const user = this;
  let encrypted = cipher.update(user.password, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  user.password = encrypted;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;