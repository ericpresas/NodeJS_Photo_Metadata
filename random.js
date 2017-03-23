var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db = null // global variable to hold the connection
var mongoose = require('mongoose')

 MongoClient.connect('mongodb://localhost:27017/INSTADB', function(err,database) {
    if(err) { console.error(err) }
       console.log('connected to mongodb 2')
       db = database // once connected, assign the connection to the global variable
})
/* GET home page. */
router.get('/', function(req, res, next) {
  //TODO:::::::
  //mongoose.model('rand').
  var str_res = null
  var filename = null;
  //agafar 1 fotos aleatoria i mostrarla amb descripció i nom d'usuari.
  db.collection('InstaFotos').find({},{filename:1, _id:0}).limit( 1 ).skip(Math.floor(Math.random() * 40 )).toArray(function(err, filename) {
    console.log('------------------------------------');
    console.log(filename);
    console.log('+++++++');

    str_res=JSON.stringify(filename[0].filename);
    str_res=str_res.substring(35,113);
    str_res = str_res.replace(/\\/g, "/");
    str_res = str_res.replace("//", "/");
    str_res = str_res.replace("//", "/");
    str_res = str_res.replace("//", "/");
    console.log(str_res);
    //db.close();
    res.render('random', {result: str_res});
});
  
  
});

module.exports = router;
