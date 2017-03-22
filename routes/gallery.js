var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db = null // global variable to hold the connection

MongoClient.connect('mongodb://localhost:27017/INSTADB', function(err,database) {
    if(err) { console.error(err) }
    db = database // once connected, assign the connection to the global variable
})



router.get('/', function(req, res, next) {

  res.render('gallery', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  //TODO::::::::
  //Aqui, hem de fer la query d'alguna manera i despres enviar nom del arxiu i descripció.  
  res.render('gallery', { title: 'Express' });
});
module.exports = router;
