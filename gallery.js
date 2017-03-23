var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var db = null // global variable to hold the connection


 MongoClient.connect('mongodb://localhost:27017/INSTADB', function(err,database) {
    if(err) { console.error(err) }
       console.log('connected to mongodb 2')
       db = database // once connected, assign the connection to the global variable
})
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.get('/', function(req, res, next) {

  res.render('gallery', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  //TODO::::::::
  //Aqui, hem de fer la query d'alguna manera i despres enviar nom del arxiu i descripció. 
  var usr= req.body.username
  var str_res_path=[];
    console.log(usr);
    db.collection('InstaFotos').find({"informacio.user.username": usr},{filename:1, "informacio.user.full_name":1, "informacio.user.username":1, "informacio.caption.text":1}).toArray(function(err, filename){
    
for (i in filename){
    str_res_path[i]=JSON.stringify(filename[i].filename);
    str_res_path[i]=str_res_path[i].substring(35,str_res_path[i].lastIndexOf('"'));
    str_res_path[i] = str_res_path[i].replace(/\\/g, "/");
    str_res_path[i] = str_res_path[i].replace("//", "/");
    str_res_path[i] = str_res_path[i].replace("//", "/");
    str_res_path[i] = str_res_path[i].replace("//", "/");
    //str_res_path[i] = str_res_path[i].replace('"', "");
    console.log(str_res_path[i]);
    //console.log(filename);
}

    });
   // console.log(request.body.user.email);

  res.render('gallery', { title: 'Express' });
});
module.exports = router;
