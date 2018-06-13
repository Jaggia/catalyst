/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

const baseballSchema = new Schema({
  pitchSpeed : { type  : Number, required : true }
});

module.exports = mongoose.model('Baseball', baseballSchema);

module.exports.createBaseballSchema = function(newBaseballSchema, callback){
  newBaseballSchema.save(callback);
}
