var router = require('express').Router();

//rutas para notas

//buscador full text
//router.post('/buscar',function (req, res) {});
  

/*
 * /notas/     GET    - READ ALL
 * /notas/     POST   - CREATE
 * /notas/:id  GET    - READ ONE
 * /notas/:id  PUT    - UPDATE
 * /notas/:id  DELETE - DELETE
 */


//listara todas las categorias y las notas

router.get('/index', function (req, res,){});

//estudiar CRUD para categorias

//rutas para nota
//implementara un controlador CRUD
  router.route('/')
    .get(function (req, res,){})
    .post(function (req, res,){});
    
  router.route('/:id')
    .get(function (req, res,){})
    .put(function (req, res,){})
    .delete(function (req, res,){})
  
  //para poder usar los metodos put y delete habra que usar method-override
  
  module.exports = router;
