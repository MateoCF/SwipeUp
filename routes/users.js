var express = require('express');
var router = express.Router();
var Remark = require("../models/remark");
var xssFilters = require('xss-filters');


  // var firstname = req.query.firstname; //an untrusted input collected from user
  // res.send('<h1> Hello, ' + xssFilters.inHTMLData(firstname) + '!</h1>');


// Render form for new remark
router.get('/:username', function(req, res, next) {
  //Sanitize input
  var username = xssFilters.inHTMLData(req.params.username).substring(0, 50);
  res.render('usersremarksform.ejs', { username: username });
});

// Save form for new remark and redirect to the user's remarks
router.post('/s/:username', function(req, res, next) {
  //Sanitize input for remark
  var bodyRemark = xssFilters.inHTMLData(req.body.remark).substring(0, 300);
  var bodyUsername = xssFilters.inHTMLData(req.body.username).substring(0, 50);
  var paramUsername = xssFilters.inHTMLData(req.params.username).substring(0, 50);
  //Save Remark
  if(bodyRemark.length == 0 || bodyUsername.length == 0 && bodyUsername == paramUsername) {
      res.redirect('/' + paramUsername);
  } else {
      var newRemark = new Remark({
          remark: bodyRemark,
          username: bodyUsername
      });
      newRemark.save(function(err, Remark){
          if(err) {
              console.log(err);
              res.render('index', { thanks: 'Database Error, try again later'})
          } else {
          //Then redirect and thanks to index page
            res.render("index", { thanks: "Thanks for that remark!"});
          }
      });
  }
});

//Delete Remark 

router.get('/delete/:id', function(req, res, next) {
    if(Remark.findById(req.params.id)) {
      Remark.findByIdAndRemove({ _id: xssFilters.inHTMLData(req.params.id) }, function(err, oldremark){
          if(err) {
            console.log(err);
            res.render('index', { thanks: "Database Error/Couldn't be deleted"})
          } else {
            res.redirect('back');
          }
      });
    }
});

//On 'new user' for username sanitize input for username ....
router.get('/admin/:username', function(req, res, next) {
  
    //Add sanitization from url and MondoDB query filters
    var username = xssFilters.inHTMLData(req.params.username);
    if(!req.params.username.length == 0) {
    Remark.find({ username: username }, function(err, response) {
        if(err) {
            res.render("newuseradmin", { error: 'No remarks found...yet ;)', username: username });
        } else {
            res.render("newuseradmin", {remarks: response, username: username });
        }
    });
    } else {
      res.render('index', { error: 'No input'})
    }
});


module.exports = router;
