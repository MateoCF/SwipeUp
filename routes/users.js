var express = require('express');
var router = express.Router();
var Remark = require("../models/remark");

// Render form for new remark
router.get('/:username', function(req, res, next) {
  console.log('User remark post Sanitization Station');
  //Sanitize input
  res.render('usersremarksform.ejs', { username: req.params.username });
});

// Save form for new remark and redirect to the user's remarks
router.post('/s/:username', function(req, res, next) {
  console.log('User remark post Sanitization Station');
  //Sanitize input for remark
  
  //Save Remark
  var remark = req.body;
  if(!remark.remark || !remark.username && remark.username == req.params.username) {
      console.log('field not present');
      res.redirect('/' + req.params.username);
  } else {
      var newRemark = new Remark({
          remark: remark.remark,
          username: remark.username,
      });
      newRemark.save(function(err, Remark){
          if(err) {
              res.render('index', { title: 'Error', thanks: 'Database Error, try again later'})
          } else {
          //Then redirect and thanks to index page
            res.render("index", { title: "Thanks!", thanks: "Thanks for that comment!"});
          }
      });
  }
});




//On 'new user' for username sanitize input for username ....
router.get('/admin/:username', function(req, res, next) {
  console.log('User remark post Sanitization Station');
  
    //Add sanitization from url and MondoDB query filters
    var username = req.params.username
    Remark.find({ username: username}, function(err, response) {
        if(err) {
            res.render("newuseradmin", { error: 'No remarks found...yet ;)', remarks: '', username: username });
        } else {
            res.render("newuseradmin", { error: '', remarks: response.remark, username: username });
        }
    });
});

//Show all remarks in admin location

router.get('/admin/:username', function(req, res, next) {

});


module.exports = router;
