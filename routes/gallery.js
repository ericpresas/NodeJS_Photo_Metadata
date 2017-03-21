var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  res.render('gallery', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  //TODO::::::::
  //Aqui, hem de fer la query d'alguna manera i despres enviar nom del arxiu i descripció.  
  res.render('gallery', { title: 'Express' });
});
module.exports = router;
