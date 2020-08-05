const {Schema, model} = require('mongoose');

const bicicletaSchema = new Schema({
      code: Number,
      color: String,
      modelo: String,
      ubicacion: {
        type: [Number],
        index: { 
          type: '2dsphere',
          sparse: true
        }
      }
});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
  return new this({
    code: code,
    color: color,
    modelo: modelo,
    ubicacion: ubicacion
  });

};

bicicletaSchema.methods.toString = function () {
  return `code: ${this.id} \n modelo: ${this.modelo} \n color: ${this.color} \n ubicacion: ${ubicacion}`;
};

bicicletaSchema.statics.allBicis = function(cb){
    return this.find({},cb);
};

bicicletaSchema.statics.add = function(aBici, cb){
  this.create(aBici, cb);
};

bicicletaSchema.statics.findByCode = function(aCode, cb){
  return this.findOne({ code: aCode }, cb);
}

bicicletaSchema.statics.deleteByCode = function(aCode, cb){
  return this.deleteOne({ code: aCode }, cb);
}


module.exports = model('Bicicleta',bicicletaSchema);
