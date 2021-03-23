var express = require('express');
var router = express.Router();

var peliculasController = require('../controllers/peliculasController');



router.get('/crear', peliculasController.crear);
router.post('/crear', peliculasController.agregar);

// listado

router.get('/', peliculasController.listado);


// detalle

router.get('/:id', peliculasController.detalle);

// update

router.get('/editar/:id', peliculasController.editar);
router.post('/editar/:id', peliculasController.actualizar);

// delete

router.post('/borrar/:id', peliculasController.borrar);


module.exports = router;