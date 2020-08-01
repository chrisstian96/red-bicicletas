var Bicicleta = function (id, color, modelo, ubicacion) {
  this.id = id;
  this.color = color;
  this.ubicacion = ubicacion;
  this.modelo = modelo;
};

Bicicleta.prototype.toString = function () {
  return `id: ${this.id} \n modelo: ${this.modelo} \n color: ${this.color} \n ubicacion: ${ubicacion}`;
};
Bicicleta.allBicis = [];
Bicicleta.add = function (aBici) {
  Bicicleta.allBicis.push(aBici);
};
Bicicleta.findById = function (aBiciId) {
  var aBici = Bicicleta.allBicis.find((x) => x.id == aBiciId);
  if (aBici) return aBici;
  else var noFound = new Error(`No existe una bicicleta con el id ${aBiciId}`);
  console.log(noFound);
};

Bicicleta.removeById = function (aBiciId) {
  for (var i = 0; i < Bicicleta.allBicis.length; i++) {
    if (Bicicleta.allBicis[i].id == aBiciId) {
      Bicicleta.allBicis.splice(i, 1);
      break;
    }
  }
};
/*let a = new Bicicleta(3, "rojo", "urbana", [3.476, -76.53]);
let b = new Bicicleta(2, "blanca", "urbana", [3.472, -76.537]);
let c = new Bicicleta(1, "verde", "urbana", [3.470, -76.531]);

Bicicleta.add(a);
Bicicleta.add(b);
Bicicleta.add(c);*/


module.exports = Bicicleta;
