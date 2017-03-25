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
  //DECLARACIÓ DE VARIABLES
  var str_res = null
  var filename = null;
  var str_desc = null;
  var usr = null;
  var likes=null;
  var publications = {};
  publications.list = new Array();
  var comments = [];
    var commenenters = [];
  //agafar 1 fotos aleatoria i mostrarla amb descripció i nom d'usuari.
  db.collection('InstaFotos').find({},{filename:1,"informacio.caption.text":1,"informacio.user.full_name":1,"informacio.likes.count":1,"informacio.comments":1, _id:0}).limit( 1 ).skip(Math.floor(Math.random() * 30 )).toArray(function(err, filename) {
    console.log('------------------------------------');
    console.log(filename);
    console.log('+++++++');
//PROCESSAT DE PATHS
    str_res=JSON.stringify(filename[0].filename);
    str_res=str_res.substring(47,str_res.lastIndexOf(".jpg")+4);
    str_res = str_res.replace(/\\/g, "/");
    str_res = str_res.replace("//", "/");
    str_res = str_res.replace("//", "/");
    str_res = str_res.replace("//", "/");
    str_desc=JSON.stringify(filename[0].informacio.caption.text);
    usr=JSON.stringify(filename[0].informacio.user.full_name);
   for (i in filename[0].informacio.comments.data){
      comments[i]=JSON.stringify(filename[0].informacio.comments.data[i].text);
      commenenters[i]=filename[0].informacio.comments.data[i].from.full_name
      console.log(comments[i])
    console.log(filename[0].informacio.comments.data[i].from.full_name);
       publications.list.push({
      "com" : comments[i],
      "usr_com"  : commenenters[i]

      });
    }
    console.log(publications)
    likes= JSON.stringify(filename[0].informacio.likes.count);
    //db.close();
    //S'ENVIEN ELS RESULTATS
    
    res.render('random', {result: str_res, desc: str_desc, usuari: usr , like: likes,  publications: comments , autors: commenenters});
});
  
  
});

module.exports = router;
