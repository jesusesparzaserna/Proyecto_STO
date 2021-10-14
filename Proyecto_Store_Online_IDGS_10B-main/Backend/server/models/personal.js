const mongoose = require('mongoose'); //libreria para la BD
const uniqueValidator = require('mongoose-unique-validator');//libreria de validacion



let Schema = mongoose.Schema;

let personalSchema = new Schema({//creacion de modelo 
    Nombre:{
        type:String,
        required:[true,'ingrese su nombre ']
        },
        Usuario:{
            type:String,
            required:[true,'ingrese su Usuario ']
            },
        correo:{
            type:String,
            required:[true,'ingrse su correo por favor ']
        
        },
        contraseña:{
            type:String,
            required:[true,"ingrese su contraseña "]
        },
        role1:{
            type:String,
            default: User_Role
        },
        Estado:{
            type:Boolean,
            default:true
        }
            
    


});
personalSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Personal', personalSchema); //creacion de coleccion Personal
