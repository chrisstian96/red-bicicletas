const Reserva = require('./reserva');
const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
    nombre: String,
});

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva= new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
    console.log(reserva);
    reserva.save(cb);
}

module.exports = model('Usuario', usuarioSchema);
