"use strict";
var modelo= require('../modelos/model_notas');
var pag= require('../public/lib/paginador.js');

exports.nueva = (req, res) => {
  modelo.categorias.find({}, function(err,doc){
  if (err || doc == null) {
      res.status(404).send('Not found');
      return;
    }  
    console.log(doc[0].name)
  res.render('nueva',{layout:'layouts/layout-jq-bstp', categoria:doc});
  })
};

exports.find = (req, res) => {
  modelo.notas.find({$text:{$search:req.query.texto}})
	.exec(function(err,doc){
	if (err || doc == null) {
          res.status(404).send('Not found');
        return;}
	res.render('salida_cat',{layout:'layouts/layout-jq-bstp', notas:doc, numero: doc.length});
  	});
  };

exports.cat = (req, res) => {
  let perPage = 5;
  let page = req.query.page || 1;
	modelo.categorias.findOne({_id: req.params.id}, function(err,cat){
  		if (err || cat == null) {
      		res.status(404).send('Not found');
      	return;
    	}  
  		modelo.notas.find({categoria:cat._id}).populate('categoria')
  		.find({}) // finding all documents
    	.skip((perPage * page) - perPage) // in the first page the value of the skip is 0
    	.limit(perPage) // output just 9 items
		.sort('titulo')
		.exec(function(err, doc){
			modelo.notas.countDocuments({categoria:cat._id},(err, count) => {
    			if (err || doc == null) {
      				res.status(404).send('Not found');
      				return;
        		} 
        	 //if (err) return next(err);
        	var pages = Math.ceil(count / perPage)
    		res.render('salida_cat',{layout:'layouts/layout-jq-bstp', cat:doc.categoria, notas:doc, numero: count, paginador: pag.paginador(pages,page)});
  			});
		});		
 	}); 
};

exports.all = (req, res) => {
  let perPage = 5;
  let page = req.query.page || 1;
  modelo.categorias.find({}, function(err,cat){
  modelo.notas
    .find({}) // finding all documents
    .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
    .limit(perPage) // output just 9 items
    .sort('titulo')
    .exec((err, doc) => {
      modelo.notas.countDocuments((err, count) => { // count to calculate the number of pages
       if (err || doc == null) {
          res.status(500).send('Fallo la base de datos');
        return;
        } 
        //if (err) return next(err);
        var pages = Math.ceil(count / perPage)
        res.render('salida', {layout:'layouts/layout-jq-bstp',notas: doc,categorias : cat,paginador: pag.paginador(pages,page)});
      });
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
						categoria : doc._id,
						resumen : req.body.texto 
						});
				nota.save(function(err){
					if (err) throw err;
						res.redirect('/notas/' + nota._id); //respuesta del servidor si todo ha ido bien
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
						categoria : cat._id,
						resumen : req.body.texto 
					});
					nota.save(function(err){
						if (err) {
							res.status(404).send('hubo un error al salvar la nota');
						    return;
							}
  					res.redirect('/notas/' + nota._id);
					});
				});
				};
			});
};

exports.lee = (req, res) => {
	modelo.notas.findById(req.params.id).populate('categoria')
	.exec(function(err, doc){
		if (err || doc == null) {
			res.status(404).send('Not found');
			return;
		} 
		
		if(req.query.edit == req.params.id){
			
			res.render('editor',{layout:'layouts/layout-jq-bstp', nota:doc});
			return;
		}
		
			
  		res.render('mostrar',{layout:'layouts/layout-jq-bstp', nota:doc});
    	
	});
};

exports.editar = (req, res) => {
	 //var r = req.body.texto.replace(/<[^<]+>/g,'').slice(0, 200) + '............';
  		modelo.notas.findByIdAndUpdate(req.params.id,{titulo : req.body.titulo, texto : req.body.texto, resumen : req.body.texto})
  		.exec(function(err, doc){
			if (err || doc == null) {
				res.status(404).send('Not found');
				return;
			} 
  		res.send(200, {message: 'Nota actualizada correctamente'})
    
	});
};

exports.eliminar = (req, res) => {modelo.notas.findByIdAndRemove(req.params.id)
								.exec(function(err, doc){    
									if(err) {return res.json(404, {message: 'id no existe, nada que eliminar'})};    
									return res.send(200, {message: 'Nota eliminada correctamente'})
									}) 
			//res.send('Nota eliminada correctamente......');

    
};
