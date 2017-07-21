var express = require('express');
var router = express.Router();
var xssFilters = require('xss-filters');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "SwipeUp" });
});

router.get('/about', function(req, res, next){
  res.render('about');
});

router.post('/', function(req, res, next){
    var username = xssFilters.inHTMLData(req.body.username).substring(0, 50)
    if(!req.body.username.length == 0) {
      res.redirect('/user/admin/' + username);
    } else {
      res.render('index', { title: "SwipeUp" });
    }
});

router.get('/user/admin', function(req, res, next) {
   res.redirect('/'); 
});

module.exports = router;
