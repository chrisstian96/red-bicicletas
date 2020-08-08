const Bicicleta = require("../../models/bicicleta");
const request = require("request");
const server = require("../../bin/www");
const mongoose = require("mongoose");
const base_url = "http://localhost:3000/api/bicicletas";

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
      else console.log("Bicicleta vacia");
      done();
    });
  });

  describe("GET BICICLETAS /", () => {
    it("Status 200", (done) => {
      request.get(base_url, function(error, response, body) {
        var result = JSON.parse(body).bicicletas;
        expect(response.statusCode).toBe(200);
        expect(result.length).toBe(0);

        done();
      });
    });
  });

  describe("POST BICICLETAS /create", () => {
    it("Status 200", (done) => {
  
    const options = {
      headers: { "content-Type:": "application/json" },
      url: "http://localhost:3000/api/bicicletas/create",
      body: { 
        "code": 10, 
        "color": "rojo", 
        "modelo" :"urbana", 
        "lat": -34, 
        "log": -54 
      }

    }

      request.post(options,
        
        function(error, response, body){
          console.log('POST',response);
          expect(response.statusCode).toBe(200);
          var bici = JSON.parse(body).bicicleta;
          expect(bici.ubicacion[0]).toBe(-34);
          expect(bici.ubicacion[1]).toBe(-54);
          expect(bici.color).toBe("rojo");

          done();
        }
      );
    });
  });

  describe("Bicicleta API delete", () => {
    it("Delete 204", () => {
      var a = Bicicleta.createInstance(1, "Negro", "Urbana", [-34.564, 72.89]);
      Bicicleta.add(a, function (err, newBici) {
        var headers = { "Content-Type:": "application/json" };
        var idBici = a.code;
        request.delete(
          {
            headers: headers,
            url: `${base_url}/delete`,
            body: idBici,
          },
          function(err, response, body) {
            console.log('DELETE',response);
            expect(response.statusCode).toBe(204);
          }
        );
      });
    });
  });
});
