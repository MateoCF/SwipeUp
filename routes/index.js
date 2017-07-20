var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Swipeup" });
});

router.post('/', function(req, res, next){
    if(req.body.username) {
      res.redirect('/user/admin/' + req.body.username);
    } else {
      res.render('index', { title: "SwipeUp" });
    }
});

module.exports = router;
