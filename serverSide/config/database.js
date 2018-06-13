const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri : 'mongodb://localhost:27017/startingDBase',
  secret : crypto,
  db : 'startingDBase',
}
