/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

const footballSchema = new Schema({
  nonCompetitive : {
    proShuttle : {
      segment1 : {type  : Number, required : true},
      segment2 : {type  : Number, required : true},
      segment3 : {type  : Number, required : true},
      segment4 : {type  : Number, required : true}
    },
    threeConeDrill : {
      segment1 : {type  : Number, required : true},
      segment2 : {type  : Number, required : true},
      segment3 : {type  : Number, required : true},
      segment4 : {type  : Number, required : true}
    },
    dashes : {
      fiveYard : {type  : Number, required : true},
      tenYard : {type  : Number, required : true},
      twentyYard : {type  : Number, required : true},
      thirtyYard : {type  : Number, required : true},
      fortyYard : {type  : Number, required : true}
    },
    sixtyYardConeDrill : {
      segment1 : {type  : Number, required : true},
      segment2 : {type  : Number, required : true},
      segment3 : {type  : Number, required : true},
      segment4 : {type  : Number, required : true}
    },
  },
  inGameMetrics : {
    WR : {
      snaps : {
        to5Yard : {type : Number, required : true},
        to10Yard : {type : Number, required : true}
      }
    }
  }
});

module.exports = mongoose.model('Football', footballSchema);

module.exports.createFootballSchema = function(newFootballSchema, callback){
  newFootballSchema.save(callback);
}

