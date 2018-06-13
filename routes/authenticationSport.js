const User = require('../serverSide/models/user'); // Import User Model Schema
const Organization = require('../serverSide/models/organization'); // Import User Model Schema
const Athlete = require('../serverSide/models/athlete'); // Import User Model Schema
const Recruit = require('../serverSide/models/recruit'); // Import User Model Schema
const BasketballSchema = require('../serverSide/models/sports/basketball');
const BaseballSchema = require('../serverSide/models/sports/baseball');
const FootballSchema = require('../serverSide/models/sports/football');
const jwt = require('jsonwebtoken');
const config = require('../serverSide/config/database');
const passport = require('passport');

module.exports = (router, session) => {

  /* ================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================ */
  router.use((req, res, next) => {
    const token = req.headers['authorization']; // Create token found in headers
    // Check if token was found in headers
    if (!token) {
      res.json({ success: false, message: 'No token provided' }); // Return error
    } else {
      // Verify the token is valid
      jwt.verify(token, config.secret, (err, decoded) => {
        // Check if error is expired or invalid
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
        } else {
          req.decoded = decoded; // Create global variable to use in any request beyond
          next(); // Exit middleware
        }
      });
    }
  });

  /* ==============
        Create BasketballSchema Route
     ============== */
  router.post('/createBasketballSchema', (req, res) => {
    let basketballSchema = new BasketballSchema({
      PTA2 : 0, PTM2: 0, PTA3 : 0, AST : 0, BLK : 0, DRB : 0, FTA : 0, FTM : 0, ORB : 0, PF : 0,
      STL : 0, TO : 0, ASTPG : 0, STLPG : 0, PTP2 : 0, PTP3 : 0, AST_TO_RATIO : 0, BLKPG : 0, FGP : 0,
      FGA : 0, FGM : 0, FTP : 0, GP : 0, MINPG : 0, OPP : 0, OPPG : 0, PFPG : 0, PPG : 0, RPG : 0,
      TOPG : 0, MIN : 0, PTS : 0, TRB : 0, FF : 0, TECHF : 0, DQ : 0, GS : 0, TF : 0, W : 0, L : 0, T : 0
    });

    User.findOne({ _id: req.decoded.userId }).select('organization').exec((err, organID) => {
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        if (!organID) {
          res.json({ success: false, message: 'We do not have any organizations' }); // Return error, organs was not found in db
        } else {
          BasketballSchema.createBasketballSchema(basketballSchema, function(err){
            if (err) {
              if (err.errors) {
                // Check if validation error is in the email field
                if (err.errors.PTA2) {
                  res.json({ success: false, message: err.errors.PTA2.message }); // Return error
                }
              } else {
                res.json({ success: false, message: 'Could not save BasketballSchema. Error: ', err }); // Return error if not related to validation
              }
            } else {
              res.json({ success: true, message: 'BasketballSchema registered!', organID : organID.organization,
                basketballSchemaID: basketballSchema._id }); // Return success
            }
          });
        }
      }
    })
  });


  /* ==============
        Create BaseballSchema Route
     ============== */
  router.post('/createBaseballSchema', (req, res) => {
    if (!req.body.pitchSpeed) {
      res.json({ success: false, message: 'Please provide a Pitch Speed'});
    }
    let baseballSchema = new BaseballSchema({
      pitchSpeed : req.body.pitchSpeed,
    });

    User.findOne({ _id: req.decoded.userId }).select('organization').exec((err, organID) => {
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        if (!organID) {
          res.json({ success: false, message: 'We do not have any organizations' }); // Return error, organs was not found in db
        } else {
          BaseballSchema.createBaseballSchema(baseballSchema, function(err){
            if (err) {
              if (err.errors) {
                // Check if validation error is in the email field
                if (err.errors.pitchSpeed) {
                  res.json({ success: false, message: err.errors.pitchSpeed.message }); // Return error
                }
              } else {
                res.json({ success: false, message: 'Could not save BaseballSchema. Error: ', err }); // Return error if not related to validation
              }
            } else {
              res.json({ success: true, message: 'BaseballSchema registered!', organID : organID.organization,
                      baseballSchemaID: baseballSchema._id }); // Return success
            }
          });
        }
      }
    })
  });


  /* ==============
        Create FootballSchema Route
     ============== */
  router.post('/createFootballSchema', (req, res) => {
    if (!req.body.fortyDash) {
      res.json({ success: false, message: 'Please provide a 40 YD Dash'});
    }
    let footballSchema = new FootballSchema({
      fortyDash : req.body.fortyDash,
    });

    User.findOne({ _id: req.decoded.userId }).select('organization').exec((err, organID) => {
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        if (!organID) {
          res.json({ success: false, message: 'We do not have any organizations' }); // Return error, organs was not found in db
        } else {
          FootballSchema.createFootballSchema(footballSchema, function(err){
            if (err) {
              if (err.errors) {
                // Check if validation error is in the email field
                if (err.errors.fortyDash) {
                  res.json({ success: false, message: err.errors.fortyDash.message }); // Return error
                }
              } else {
                res.json({ success: false, message: 'Could not save FootballSchema. Error: ', err }); // Return error if not related to validation
              }
            } else {
              res.json({ success: true, message: 'FootballSchema registered!', organID : organID.organization,
                footballSchemaID: footballSchema._id }); // Return success
            }
          });
        }
      }
    })
  });



  /* ==============
      Create Athlete Route
   ============== */
  router.post('/createAthlete', (req, res) => {
    if (!req.body.firstname) {
      res.json({ success: false, message: 'Please provide a first name'});
    } else {
      if (!req.body.lastname) {
        res.json({success: false, message: 'Please provide a last name'});
      }  else {
        if (!req.body.organization) {
          res.json({success: false, message: 'You must provide a organization'});
        }
      }
    }
    let athlete = new Athlete({
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      number: req.body.number,
      basketballStat : req.body.basketballStat,
      // baseballStat : req.body.baseballStat,
      // footballStat : req.body.footballStat,
      organization : req.body.organization
    });
    Athlete.createAthlete(athlete, function(err){
      if (err) {
        if (err.errors) {
          // Check if validation error is in the email field
          if (err.errors.firstname) {
            res.json({ success: false, message: err.errors.firstname.message }); // Return error
          } else {
            // Check if validation error is in the username field
            if (err.errors.lastname) {
              res.json({ success: false, message: err.errors.lastname.message}); // Return error
            } else {
              if (err.errors.basketballStat) {
                res.json({ success : false, message : err.errors.basketballStat.message});
              } else {
                 {
                  if (err.errors.organization) {
                    res.json({ success : false, message : err.errors.organization.message});
                  }
                }
              }
            }
          }
        } else {
          res.json({ success: false, message: 'Could not save athlete. Error: ', err }); // Return error if not related to validation
        }
      } else {
        res.json({ success: true, message: 'Athlete registered!', athleteFirstName: athlete.firstname }); // Return success
      }
    });
  });

  /* ==============
      Create Recruit Route
   ============== */
  router.post('/createRecruit', (req, res) => {
    if (!req.body.firstname) {
      res.json({ success: false, message: 'Please provide a first name'});
    } else {
      if (!req.body.lastname) {
        res.json({success: false, message: 'Please provide a last name'});
      }  else {
        if (!req.body.organization) {
          res.json({success: false, message: 'You must provide a organization'});
        }
      }
    }
    let recruit = new Recruit({
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      baseballStat : req.body.baseballStat,
      footballStat : req.body.footballStat,
      organization : req.body.organization
    });
    Recruit.createRecruit(recruit, function(err){
      if (err) {
        if (err.errors) {
          // Check if validation error is in the email field
          if (err.errors.firstname) {
            res.json({ success: false, message: err.errors.firstname.message }); // Return error
          } else {
            // Check if validation error is in the username field
            if (err.errors.lastname) {
              res.json({ success: false, message: err.errors.lastname.message}); // Return error
            } else {
              if (err.errors.baseballStat) {
                res.json({ success : false, message : err.errors.baseballStat.message});
              } else {
                if (err.errors.footballStat) {
                  res.json({ success : false, message : err.errors.footballStat.message});
                } else {
                  if (err.errors.organization) {
                    res.json({ success : false, message : err.errors.organization.message});
                  }
                }
              }
            }
          }
        } else {
          res.json({ success: false, message: 'Could not save recruit. Error: ', err }); // Return error if not related to validation
        }
      } else {
        res.json({ success: true, message: 'Recruit registered!', recruitFirstName: recruit.firstname }); // Return success
      }
    });
  });

  /* ===============================================================
     Route to get all athletes
  =============================================================== */
  router.get('/getAthletes', (req, res) => {
    Athlete.find({}).select('firstname lastname _id').exec((err, allAthlete) => {
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        if (!allAthlete) {
          res.json({ success: false, message: 'We do not have any athletes' }); // Return error, organs was not found in db
        } else {
          res.json({ success : true, athleteList : allAthlete})
        }
      }
    })
  });

  /* ===============================================================
    Route to get all recruits
 =============================================================== */
  router.get('/getRecruits', (req, res) => {
    Recruit.find({}).select('firstname').exec((err, allRecruit) => {
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        if (!allRecruit) {
          res.json({ success: false, message: 'We do not have any recruits' }); // Return error, organs was not found in db
        } else {
          res.json({ success : true, recruitList : allRecruit})
        }
      }
    })
  });

  /* ===============================================================
     Route to get all sports
  =============================================================== */
  router.get('/getSports', (req, res) => {
    User.findOne({ _id: req.decoded.userId }).select('sport').exec((err, allSports) => {
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        if (!allSports) {
          res.json({ success: false, message: 'We do not have any organizations' }); // Return error, organs was not found in db
        } else {
          res.json({ success : true, sportList : allSports})
        }
      }
    })
  });

  /* ===============================================================
     Route to get user
  =============================================================== */
  router.get('/getUser/:id', (req, res) => {
    console.log(req.params.id)
    User.findOne({ _id: req.params.id }).select('firstname lastname').exec((err, user) => {
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        if (!user) {
          res.json({ success: false, message: 'We do not have any users' }); // Return error, organs was not found in db
        } else {
          res.json({ success : true, user : user})
        }
      }
    })
  });

  /* ===============================================================
    Route to get one athlete
 =============================================================== */
  router.get('/getAthlete/:id', (req, res) => {
    // console.log(req.params.id)
    Athlete.findOne({ _id: req.params.id }).select('firstname lastname basketballStat').exec((err, athlete) => {
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        if (!athlete) {
          res.json({ success: false, message: 'We do not have any athletes' }); // Return error, organs was not found in db
        } else {
          res.json({ success : true, athlete : athlete})
        }
      }
    })
  });

  /* ===============================================================
    Route to get one BasketballStat
 =============================================================== */
  router.get('/getBasketballStat/:id', (req, res) => {
    console.log("bball id : ", req.params.id)
    BasketballSchema.findOne({ _id: req.params.id }).exec((err, basketballSchema) => {
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        if (!basketballSchema) {
          res.json({ success: false, message: 'We do not have any basketballSchemas' }); // Return error, organs was not found in db
        } else {
          res.json({ success : true, basketballSchema : basketballSchema})
        }
      }
    })
  });


  /* ===============================================================
  Route to change Athlete Info
=============================================================== */
  router.post('/changeAthlete', (req, res) => {
    if (!req.body.identity) {
      console.log("no ID");
    }
    Athlete.findOneAndUpdate(
      {"_id": req.body.identity},
      {
        "$set": {
          firstname: req.body.newFirstname,
        }
      },
      {"new": true, "upsert": true},
      function (err, doc) {
        if (err) {
          res.json({ success: false, message: 'Could not change athlete field' }); // Return error, organs was not found in db
          throw err;
        }
        console.log(doc);
        res.json({ success: true, firstname: doc.firstname });
      }
    );
  });

  /* ===============================================================
 Route to change BasketballSchema Info
=============================================================== */
  router.post('/changeBasketballSchema', (req, res) => {
    if (!req.body.identity) {
      console.log("no ID");
    }
    BasketballSchema.findOneAndUpdate(
      {"_id": req.body.identity},
      {
        "$set": {
          // number : req.body.number,
          PTA2 : req.body.PTA2,
          PTM2 : req.body.PTM2,
          PTA3 : req.body.PTA3,
          AST : req.body.AST,
          BLK : req.body.BLK,
          DRB : req.body.DRB,
          FTA : req.body.FTA,
          FTM : req.body.FTM,
          ORB : req.body.ORB,
          PF : req.body.PF,
          STL : req.body.STL,
          TO : req.body.TO,
          ASTPG : req.body.ASTPG,
          STLPG : req.body.STLPG,
          PTP2 : req.body.PTP2,
          PTP3 : req.body.PTP3,
          AST_TO_RATIO : req.body.AST_TO_RATIO,
          BLKPG : req.body.BLKPG,
          FGP : req.body.FGP,
          FGA : req.body.FGA,
          FGM : req.body.FGM,
          FTP : req.body.FTP,
          GP : req.body.GP,
          MINPG : req.body.MINPG,
          OPP : req.body.OPP,
          OPPG : req.body.OPPG,
          PFPG : req.body.PFPG,
          PPG : req.body.PPG,
          RPG : req.body.RPG,
          TOPG : req.body.TOPG,
          MIN : req.body.MIN,
          PTS : req.body.PTS,
          TRB : req.body.TRB,
          FF : req.body.FF,
          TECHF : req.body.TECHF,
          DQ : req.body.DQ,
          GS : req.body.GS,
          TF : req.body.TF,
          W : req.body.W,
          L : req.body.L,
          T : req.body.T
        }
      },
      {"new": false, "upsert": false},
      function (err, doc) {
        if (err) {
          res.json({ success: false, message: 'Could not change athlete field' }); // Return error, organs was not found in db
          throw err;
        }
        console.log(doc);
        res.json({ success: true, newSchema: doc});
      }
    );
  });



  return router; // Return router object to main index.js
};
