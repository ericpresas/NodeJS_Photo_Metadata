var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //TODO:::::::
  //agafar 1 fotos aleatoria i mostrarla amb descripció i nom d'usuari.
  res.render('random', { title: 'Express' });
});

module.exports = router;
