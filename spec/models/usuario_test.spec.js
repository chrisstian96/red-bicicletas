const mongoose = require("mongoose");
const Usuario = require("../../models/usuario");
const Reserva = require("../../models/reserva");
const Bicicleta = require("../../models/bicicleta");

describe("Testing Usuarios", function () {
  beforeEach(function (done) {
    const mongoDB = "mongodb://localhost/testdb";
    const db = mongoose.connection;

    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    db.on("error", console.error.bind(console, "Error en la conexión"));
    db.once("open", function () {
      console.log("mongodb esta funcionando correctamente!");
      done();
    });
  });
  afterEach(function (done) {
    Reserva.deleteMany({}, function (err, success) {
      if (err) console.log(err);
      Usuario.deleteMany({}, function (err, success) {
        if (err) console.log(err);
        Bicicleta.deleteMany({}, function (err, success) {
          if (err) console.log(err);
          done();
        });
      });
    });
  });

  describe('Cuando un usuario reserva una bici', ()=>{
      it('Debe existir la reserva', (done)=>{
          const usuario = new Usuario({nombre: 'Camilo'});
          usuario.save();
          const bicicleta = new Bicicleta({code: 1, color:"verde", modelo: "urbana"});
          bicicleta.save();

          var hoy = new Date();
          var mañana = new Date();
          mañana.setDate(hoy.getDate() + 1);
          usuario.reservar(bicicleta.id, hoy, mañana, function(err, reserva){
              Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
                console.log(reservas[0]);                
                expect(reservas[0].bicicleta.code).toBe(1);
                expect(reservas.length).toBe(1);
                expect(reservas[0].diasDeReserva()).toBe(2);
                expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                done();

              });
          });
      });
  });
});
