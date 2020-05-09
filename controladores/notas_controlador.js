"use strict";
var modelo= require('../modelos/model_notas');

exports.find = (req, res) => {
  modelo.notas.find({$text:{$search:req.query.texto}})
	.exec(function(err,doc){
	if (err || doc == null) {
          res.status(404).send('Not found');
        return;}
	res.json({doc});
  	});
  };
exports.all = (req, res) => {
  modelo.categorias.find({}, function(err,cat){ 
      modelo.notas.find().sort('fecha').limit().exec(function(err, doc){
        if (err || doc == null) {
          res.status(404).send('Not found');
        return;
        } 
        res.json({doc , cat });
      });
    });
  };

exports.crear = (req, res) => {
  
		modelo.categorias.findOne({name: req.body.categoria},function(err,doc){
			if (err) {
				res.status(404).send('Not found'); 
				return
			}
			if (doc){  
				var nota = new modelo.notas({
						titulo : req.body.titulo,
						texto : req.body.texto,
						//como la categoria existe cogemos su _id
						categoria : doc._id 
						});
				nota.save(function(err){
					if (err) throw err;
						res.redirect('/nota/' + nota._id); //respuesta del servidor si todo ha ido bien
				});
				

			} else {
    			var cat = new modelo.categorias({
					_id : new mongoose.Types.ObjectId(),
					name : req.body.categoria
				});
				cat.save(function(err){
					if (err) {
						res.status(404).send('hubo un error al salvar la categoria'); 
						return;
					}
					//Probar con modelo.notas(req.body) primero cambiar el valor de body.categoria
					var nota = new modelo.notas({
						titulo : req.body.titulo,
						texto : req.body.texto,
						categoria : cat._id 
					});
					nota.save(function(err){
						if (err) {
							res.status(404).send('hubo un error al salvar la nota');
						    return;
							}
  					res.json({titulo : req.body.titulo, texto : req.body.texto, categoria : cat._id });
					});
				});
				};
			});

};
exports.leer = (req, res) => {
  modelo.notas.find({_id:req.params.id}).populate('categoria').exec(function(err, doc){
		if (err || doc == null) {
			res.status(404).send('Not found');
			return;
		} 
  res.json({doc});
});
};

exports.editar = (req, res) => {
  //Cambiar por findOne
  		modelo.notas.find({_id:req.params.id}).exec(function(err, doc){
			if (err || doc == null) {
				res.status(404).send('Not found');
				return;
			} 
  res.json({doc});  
});
};
exports.eliminar = (req, res) => {modelo.notas.findByIdAndRemove({_id:req.params.id})
								.exec(function(err, doc){    
									if(err) {return res.json(500, {message: 'id no existe, nada que eliminar'})};    
									return res.json(200, {message: 'Nota eliminada correctamente'})
									}) 
			//res.send('Nota eliminada correctamente......');
		 
}
