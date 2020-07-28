var Bicicleta = function(id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.ubicacion = ubicacion;
    this.modelo = modelo;
}

Bicicleta.prototype.toString = function(){
    return `id: ${this.id} \n modelo: ${this.modelo} \n color: ${this.color} \n ubicacion: ${ubicacion}`;
}
Bicicleta.allBicis = [];
Bicicleta.add = function(aBici){
    Bicicleta.allBicis.push(aBici);
}
let a = new Bicicleta(1,'rojo','urbana',[-34.6012424, -58.3861497]);
let b = new Bicicleta(2,'blanca','urbana',[-34.596932, -58.3808287]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;