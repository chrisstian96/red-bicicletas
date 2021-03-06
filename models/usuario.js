const Reserva = require('./reserva');
const {Schema, model} = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const validateEmail = function(email){
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};   
const usuarioSchema = new Schema({
    nombre:{
        type: String,
        trim: true,
        required:[true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        trim: true,
        require:[true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate:[validateEmail, 'Por favor ingrese un email valido'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password:{
        type: String,
        require: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, {message:'El {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save',function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva= new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
    console.log(reserva);
    reserva.save(cb);
}

module.exports = model('Usuario', usuarioSchema);
