var express = require('express');
var router = express.Router();
var Remark = require("../models/remark");

// Render form for new remark
router.get('/:username', function(req, res, next) {
  //Sanitize input
  res.render('usersremarksform.ejs', { username: req.params.username });
});

// Save form for new remark and redirect to the user's remarks
router.post('/s/:username', function(req, res, next) {
  //Sanitize input for remark
  
  //Save Remark
  var remark = req.body;
  if(!remark.remark || !remark.username && remark.username == req.params.username) {
      res.redirect('/' + req.params.username);
  } else {
      var newRemark = new Remark({
          remark: remark.remark,
          username: remark.username,
      });
      newRemark.save(function(err, Remark){
          if(err) {
              res.render('index', { title: 'SwipeUp', thanks: 'Database Error, try again later'})
          } else {
          //Then redirect and thanks to index page
            res.render("index", { title: "Thanks!", thanks: "Thanks for that remark!"});
          }
      });
  }
});

//Delete Remark 

router.get('/delete/:id', function(req, res, next) {
    if (Remark.findById(req.params.id) == true) {
      Remark.findByIdAndRemove(req.params.id, function(err, oldremark){
        if(err) {
          res.render('index', { title: "SwipeUp", error: "Database Error/Couldn't be deleted"})
        } else {
          res.render('index', { title: "Delete", thanks: oldremark.remark + " has been deleted"})
        }
      });
    } else {
        res.render('index', { title: "SwipeUp", error: "Database Error/Couldn't be deleted"})
    }
});

//On 'new user' for username sanitize input for username ....
router.get('/admin/:username', function(req, res, next) {
  
    //Add sanitization from url and MondoDB query filters
    var username = req.params.username
    Remark.find({ username: username }, function(err, response) {
        if(err || response.length == 0) {
            res.render("newuseradmin", { error: 'No remarks found...yet ;)', username: username });
        } else {
            res.render("newuseradmin", {remarks: response, username: username });
        }
    });
});

module.exports = router;
