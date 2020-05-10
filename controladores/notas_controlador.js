"use strict";
var modelo= require('../modelos/model_notas');

exports.all = (req, res) => {

	modelo.categorias.find({}, function(err,cat){ 
      modelo.notas.find().sort('fecha').limit().exec(function(err, doc){
        if (err || doc == null) {
          res.status(500).send('Fallo la base de datos');
        return;
        } 
        res.render('salida',{layout:'layouts/layout-jq-bstp', notas : doc , categorias : cat });
      });
    });
};

exports.crear = (req, res) => {
 
};

exports.leer = (req, res) => {
    
};

exports.editar = (req, res) => {
    
};

exports.eliminar = (req, res) => {
    
};
