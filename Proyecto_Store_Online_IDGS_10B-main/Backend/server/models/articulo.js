const mongoose = require('mongoose'); //libreria para la BD
const uniqueValidator = require('mongoose-unique-validator');//libreria de validacion

let Schema = mongoose.Schema;

let articuloSchema = new Schema({
    Nombre:{
        type:String,
        required:[true,'ingresa el nombre del articulo']
    },
    Descripcion:{
        type:String,
        required:[true,'ingresa la descripcion del articulo']
    },
    Precio:{
        type:Number,
        required:[true,'ingresa el precio de el articulo']
    },
    Img:{
        type:String,
        required:[true,'ingresa la ruta de la imgen']
    },
    Estado:{
        type:Boolean,
        default:true
    }

})
articuloSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Articulo', articuloSchema); 