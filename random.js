var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db = null // global variable to hold the connection
var mongoose = require('mongoose')
MongoClient.connect('mongodb://localhost:27017/INSTADB', function(err,database) {
	if(err) { console.error(err) }
    db = database // once connected, assign the connection to the global variable
    console.log('connected_2');
})

/* GET home page. */
router.get('/', function(req, res, next) {
  //TODO:::::::
  //mongoose.model('rand').
  //agafar 1 fotos aleatoria i mostrarla amb descripció i nom d'usuari.
  var filename=db.collection('InstaFotos').find({},{filename:1, _id:0}).limit( 1 ).skip( Math.random() * db.collection('InstaFotos').count() ).toString(function(err, filename) {
    console.log(JSON.stringify(filename));
});

  res.render('random', filename);
});

module.exports = router;
