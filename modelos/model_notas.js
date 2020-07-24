var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/NOTAS', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
 
var notasSchema = new mongoose.Schema({
    id: Number,
    titulo: String,
    categoria: {type: mongoose.Schema.Types.ObjectId,  ref:'categorias'},
    //se coloca un getter para que solo saque la fecha y no la hora. por defecto introduce el time actual
    fecha: {type : Date, get: function(f){return f.toLocaleDateString()}, default: Date.now },
    texto: String,
    // Coloco un setter para que elimine cualquier tag de html
    resumen: {type : String,
     set : function(text){return text.replace(/<[^<]+>/g,'').slice(0, 200) + '............'}
    }
});
//notasSchema.set('toObject',{getters:true}); <== investigar
var catSchema = new mongoose.Schema({
    
    name: String,
    
});

exports.notas = mongoose.model('nota', notasSchema);
exports.categorias = mongoose.model('categorias', catSchema);
