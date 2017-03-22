var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db = null // global variable to hold the connection

MongoClient.connect('mongodb://localhost:27017/test', function(err,database) {
    if(err) { console.error(err) }
    db = database // once connected, assign the connection to the global variable
})
/* GET home page. */
router.get('/', function(req, res, next) {
  //TODO:::::::
  //agafar 1 fotos aleatoria i mostrarla amb descripció i nom d'usuari.

  res.render('random', { title: 'Express' });
  res=db.InstaFotos.find().limit( 1 ).skip( _rand() * db.InstaFotos.count() )
});

module.exports = router;
