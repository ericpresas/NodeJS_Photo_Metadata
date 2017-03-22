var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //TODO:::::::
  //agafar 3 fotos aleatories i ficarles al slider, també s'ha d'agafar
  //el nom d'usuari i la descripció. s'ha de passar un json amb tota aquesta info.
  res.render('index', { title: 'Express' });
});

module.exports = router;
