var router = require('express').Router();
var notas_controlador = require ('../controladores/notas_controlador');

//solo lo utilizo para las rutas de categoria
var modelo= require('../modelos/model_notas');


//rutas para notas

//buscador full text
router.get('/buscar',function (req, res) {
 notas_controlador.find(req, res)
});
  

/*
 * /notas/     GET    - READ ALL
 * /notas/     POST   - CREATE
 * /notas/:id  GET    - READ ONE
 * /notas/:id  PUT    - UPDATE
 * /notas/:id  DELETE - DELETE
 */


//listara todas las categorias y las notas

router.get('/index', function (req, res,){
  res.render('nueva',{layout:'layouts/layout-jq-bstp'});
});

//estudiar CRUD para categorias

//rutas para nota
//implementara un controlador CRUD
 router.route('/')
    .get(function (req, res,){notas_controlador.all(req, res)})
    .post(function (req, res,){notas_controlador.crear(req, res)});
    
 router.route('/:id')
    .get(function (req, res,){notas_controlador.lee(req, res)})
    .put(function (req, res,){notas_controlador.editar(req, res)})
    .delete(function (req, res,){notas_controlador.eliminar(req, res)})
  
  //ruta para las categorias
  //provisional hay que crear un CRUD para las categorias

//listara las notas de una categoria
router.get('/cat/:id', function(req, res) {
 modelo.categorias.findOne({_id: req.params.id}, function(err,doc){
  if (err || doc == null) {
      res.status(404).send('Not found');
      return;
    }  
  modelo.notas.find({categoria:doc._id}).populate('categoria').exec(function(err, doc){
    if (err || doc == null) {
      res.status(404).send('Not found');
      return;
    } 
    
    //res.json(doc);
    res.render('salida_cat',{layout:'layouts/layout-jq-bstp', cat:doc.categoria, notas:doc, numero: doc.length});
  });
 }); 
});

  
 module.exports = router;
