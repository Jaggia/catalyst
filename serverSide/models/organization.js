/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

const organizationSchema = new Schema({
  organizationname: { type: String, required: true, unique: true, lowercase : true},
  location: { type: String, required: true, unique: true, lowercase : true}
  // sport: {
  //   baseball : { type: Boolean, required: true },
  //   football : { type: Boolean, required: true }
  // }
});

module.exports = mongoose.model('Organization', organizationSchema);

module.exports.createOrganization = function(newOrganization, callback){
  newOrganization.save(callback);
}
