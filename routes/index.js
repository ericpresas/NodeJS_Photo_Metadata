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

/* GET home page. */
router.get('/', function(req, res, next) {

  //agafar 3 fotos aleatories i ficarles al slider, també s'ha d'agafar
  //el nom d'usuari i la descripció. s'ha de passar un json amb tota aquesta info.

  //mongoose.model('rand').
  //declarem les variables on posarem els resultats
  var name = [];
  var usr_name = new Array();
  var str_res_path= new Array();
  var textos = [];
  var temp_photo=null;
  var temp_usr=null
  var temp_text=null
  var publications = {};
  publications.list = new Array();
  //agafar 3 fotos aleatoria i mostrarla amb descripció i nom d'usuari.
  db.collection('InstaFotos').find({},{filename:1,"informacio.caption.text":1, _id:0}).limit( 3 ).skip(Math.floor(Math.random() * 30 )).toArray(function(err, filename) {
    console.log('------------------------------------');
    console.log(filename);
    console.log('+++++++');
//PROCESSAT DE PATHS
    for (i in filename){
	    str_res_path[i]=JSON.stringify(filename[i].filename);
	    str_res_path[i]=str_res_path[i].substring(47,str_res_path[i].lastIndexOf(".jpg")+4);
	    str_res_path[i] = str_res_path[i].replace(/\\/g, "/");
	    str_res_path[i] = str_res_path[i].replace("//", "/");
	    str_res_path[i] = str_res_path[i].replace("//", "/");
	    str_res_path[i] = str_res_path[i].replace("//", "/");
	    textos[i]=JSON.stringify(filename[i].informacio.caption.text);
	    temp_photo = str_res_path[i];
	    temp_text= textos[i];
	    console.log(temp_photo);
	    console.log(temp_usr);
	    publications.list.push({
	     "photo" : temp_photo,
	      "text": temp_text   
      });
	  }
	  res.render('index', publications)
	});
});

module.exports = router;
