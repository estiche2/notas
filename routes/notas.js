var router = require('express').Router();
var notas_controlador = require ('../controladores/notas_controlador');


router.get('/pagina',function (req, res) {
 res.send(pag.paginador(9,5))
});
//rutas para notas

//buscador full text
router.get('/buscar',function (req, res) {
 notas_controlador.find(req, res)
});
  
router.get('/nueva', function (req, res){
  notas_controlador.nueva(req, res)
});
//listara las notas de una categoria
router.get('/cat/:id', function(req, res) {
 notas_controlador.cat(req, res);
});



/*
 * /notas/     GET    - READ ALL
 * /notas/     POST   - CREATE
 * /notas/:id  GET    - READ ONE
 * /notas/:id  PUT    - UPDATE
 * /notas/:id  DELETE - DELETE
 */


//listara todas las categorias y las notas




//rutas para nota
//implementara un controlador CRUD
 router.route('/')
    .get(function (req, res,){notas_controlador.all(req, res)})
    .post(function (req, res,){notas_controlador.crear(req, res)})
    
 router.route('/:id')
    .get(function (req, res,){notas_controlador.lee(req, res)})
    .put(function (req, res,){notas_controlador.editar(req, res)})
    .delete(function (req, res,){notas_controlador.eliminar(req, res)})
  
  //ruta para las categorias
  //provisional hay que crear un CRUD para las categorias
  //estudiar CRUD para categorias


  
 module.exports = router;
