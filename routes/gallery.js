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

  //PODRIEM AGAFAR ALEATORI AQUI PERQUÈ NO ESTIGUI SENSE CAP FOTO AL PRINCIPI

  var photos = ["images_insta/11195725_554405951365808_1346992064_n.jpg", "images_insta/11189145_499587246856169_257039100_n.jpg","images_insta/11189306_1828726267353132_1879988525_n.jpg"]  
  var users = ["pepito", "animal", "loleiro"]

  var publications = {};

  publications.list = new Array();

  for (var i = 0; i < photos.length; i++) {
      var temp_photo = photos[i];
      var temp_usr = users[i];
console.log(temp_photo)
      publications.list.push({
          "photo" : temp_photo,
          "user"  : temp_usr
          //S'ha d'afegir la descripció
      });
  }
//  console.log(publications)
  res.render('gallery', publications);
});

router.post('/', function(req, res, next) {
  //TODO::::::::
  //Aqui, hem de fer la query d'alguna manera i despres enviar nom del arxiu i descripció. 
  //Rebem els params del form
  var usr= req.body.username
  var tags= req.body.tag
  var fullname = req.body.fullname

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
  var query = {};
  query.list = new Array();

  //Query al mongo , OJUUUU COM LI POSEM EL CONTAINS #TAGS AL TEXT

  if (tags.toString() !="" && usr.toString() !="" && fullname.toString() !="" ){
    query.list.push({
      "informacio.user.username": usr,
      "informacio.caption.text": new RegExp('' + tags),
      "informacio.user.fullname" : fullname
    });
    
    console.log(query);
    //  console.log(tags);
    
      
  }else if (tags.toString() =="" && usr.toString() !="" && fullname.toString() =="" ){
    query.list.push({
      "informacio.user.username": usr
    });      
  }else if(tags.toString() !="" && usr.toString() =="" && fullname.toString() =="" ){
    query.list.push({
      "informacio.caption.text": new RegExp('' + tags)
    });
  }else if(tags.toString() =="" && usr.toString() =="" && fullname.toString() !="" ){
    query.list.push({
      "informacio.user.fullname" : fullname
    });
  }else{
    db.collection('InstaFotos').find({},{filename:1,"informacio.user.username":1,"informacio.caption.text":1, _id:0}).limit( 9 ).skip(Math.floor(Math.random() * 30 )).toArray(function(err, filename) {
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
        name[i]=JSON.stringify(filename[i].informacio.user.full_name);
        usr_name[i]=JSON.stringify(filename[i].informacio.user.username);
        usr_name[i]=usr_name[i].replace('"',"");
        usr_name[i]=usr_name[i].replace('"',"");
        textos[i]=JSON.stringify(filename[i].informacio.caption.text);
        //str_res_path[i] = str_res_path[i].replace('"', "");
        temp_photo = str_res_path[i];
        temp_usr = usr_name[i];
        temp_text= textos[i];
       console.log(temp_photo);
       console.log(temp_usr);
       publications.list.push({
         "photo" : temp_photo,
          "user"  : temp_usr,
          "text": temp_text    //S'ha d'afegir la descripció
          });
    }
    res.render('gallery', publications)
  });
  }


db.collection('InstaFotos').find({ $or: query.list} ,{filename:1, "informacio.user.full_name":1, "informacio.user.username":1, "informacio.caption.text":1}).toArray(function(err, filename){
    //iterem sobre els resultats agafant la informació i fent una "neteja" dels paths per tema barres windows i path realtiu
    for (i in filename){
        str_res_path[i]=JSON.stringify(filename[i].filename);
        str_res_path[i]=str_res_path[i].substring(47,str_res_path[i].lastIndexOf(".jpg")+4);
        str_res_path[i] = str_res_path[i].replace(/\\/g, "/");
        str_res_path[i] = str_res_path[i].replace("//", "/");
        str_res_path[i] = str_res_path[i].replace("//", "/");
        str_res_path[i] = str_res_path[i].replace("//", "/");
        name[i]=JSON.stringify(filename[i].informacio.user.full_name);
        usr_name[i]=JSON.stringify(filename[i].informacio.user.username);
        usr_name[i]=usr_name[i].replace('"',"");
        usr_name[i]=usr_name[i].replace('"',"");
        textos[i]=JSON.stringify(filename[i].informacio.caption.text);
        //str_res_path[i] = str_res_path[i].replace('"', "");
        temp_photo = str_res_path[i];
        temp_usr = usr_name[i];
        temp_text= textos[i];
       console.log(temp_photo);
       console.log(temp_usr);
       publications.list.push({
         "photo" : temp_photo,
          "user"  : temp_usr,
          "text": temp_text    //S'ha d'afegir la descripció
          });

      //  console.log(str_res_path);
       // console.log(usr_name);
    }

  console.log(publications)
  res.render('gallery', publications);
});
   // console.log(request.body.user.email);

//retornem els resultats

});
module.exports = router;
