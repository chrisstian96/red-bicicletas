const mongoose = require("mongoose");
const Bicicleta = require("../../models/bicicleta");

describe("Testing Bicicletas", function () {
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
    Bicicleta.deleteMany({}, function (err, success) {
      if (err) console.log(err);
      done();
    });
  });

  describe("Bicicleta.createInstance", () => {
    it("Crea una instancia de Bicicletas", () => {
      let bici = Bicicleta.createInstance(1, "verde", "urbana", [-35.4, -27.6]);

      expect(bici.code).toBe(1);
      expect(bici.color).toBe("verde");
      expect(bici.modelo).toBe("urbana");
      expect(bici.ubicacion[0]).toEqual(-35.4);
      expect(bici.ubicacion[1]).toEqual(-27.6);
    });
  });

  describe("Bicicleta.allBicis", () => {
    it("Comienza vacia", (done) => {
      Bicicleta.allBicis((err, bicis) => {
        expect(bicis.length).toBe(0);
        done();
      });
    });
  });

  describe("Bicicleta.add", () => {
    it("Agrega una bici", (done) => {
      var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
      Bicicleta.add(aBici, (err, bicis) => {
        if (err) console.log(err);
        Bicicleta.allBicis((err, bicis) => {
          expect(bicis.length).toEqual(1);
          expect(bicis[0].code).toEqual(aBici.code);
          done();
        });
      });
    });
  });

  describe("Bicicleta.findByCode", () => {
    it("Debe devolver la bici con code 1", (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        expect(bicis.length).toBe(0);

        var aBici = new Bicicleta({
          code: 1,
          color:"verde",
          modelo:"urbana"
        });
        Bicicleta.add(aBici, function (err, newBici) {
          if (err) console.log(err);

          var aBici2 = new Bicicleta({
            code: 2,
            color: "roja",
            modelo: "urbana"
          });
          Bicicleta.add(aBici2, function (err, newBici) {
            if (err) console.log(err);
            Bicicleta.findByCode(1, function (err, targetBici) {
              expect(targetBici.code).toBe(aBici.code);
              expect(targetBici.color).toBe(aBici.color);
              expect(targetBici.modelo).toBe(aBici.modelo);

              done();
            });
          });
        });
      });
    });
  });
});
