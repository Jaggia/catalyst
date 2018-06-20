const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri : 'mongodb://localhost:27017/startingDBase',
  secret : crypto,
  db : 'startingDBase',
}

//heroku config:get MONGODB_URI
//mongodb://heroku_3kwncw54:d0k0nmi57ek6u56qd6g7emftm9@ds263460.mlab.com:63460/heroku_3kwncw54
