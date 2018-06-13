/* ===================
   Import Node Modules
=================== */
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const router = express.Router(); // Creates a new router object.
const mongoose = require('mongoose'); // Node Tool for MongoDB
const config = require('./serverSide/config/database'); // Mongoose Config
const path = require('path'); // NodeJS Package for file paths
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors');
const authentication = require('./routes/authenticationUser')(router, session); // Import Authentication Routes
const sportAuthentication = require('./routes/authenticationSport')(router, session); // Import Authentication Routes


// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});
// Session mgmt
app.use(session({
  secret: config.secret,
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    url: config.uri,
    ttl: 3600*24 // time period in seconds
  })
}));

// Middleware
app.use(cors({
  origin: 'http://localhost:4200'
}));//remove in final product erino accino erini
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname + '/dist/')); // Provide static directory for frontend
app.use('/authentication', authentication);
app.use('/sportAuthentication', sportAuthentication);

// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
  // res.sendFile(path.join(__dirname + '/src/index.html'));
});

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

// Start Server: Listen on port 8080
app.listen(process.env.PORT || 8080);
