const Bicicleta = require("../../models/bicicleta");
const request = require("request");
const server = require("../../bin/www");

beforeEach(() => {
  console.log('testeando...');
  Bicicleta.allBicis = [];
});

describe("Bicicleta API", () => {
    describe("GET BICICLETAS /", () => {
      it("Status 200", () => {
        expect(Bicicleta.allBicis.length).toBe(0);
  
        var a = Bicicleta(1, "Negro", "Urbana", [-34.564, 72.89]);
        Bicicleta.add(a);
  
        request.get(
          "http://localhost:3000/api/bicicletas",
          (error, response, body) => {
            expect(response.statusCode).toBe(200);
          }
        );
      });
    });
  });

describe("POST BICICLETAS /create", () => {
  it("Status 200", (done) => {
    var headers = { "content-type": "application/json" };
    var aBici =
      '{ "id": 10, "color": "rojo", "modelo" :"urbana", "lat": -34, "lng": -54 }';
    request.post(
      {
        headers: headers,
        url: "http://localhost:3000/api/bicicletas/create",
        body: aBici,
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        expect(Bicicleta.findById(10).color).toBe("rojo");
        done();
      }
    );
  });
});



describe("Bicicleta API delete", () => {
  it("Delete 204", () => {
    expect(Bicicleta.allBicis.length).toBe(0);

    var a = Bicicleta(1, "Negro", "Urbana", [-34.564, 72.89]);
    Bicicleta.add(a);

    request.delete(
      "http://localhost:3000/api/bicicletas/delete",
      (error, response, body) => {
        expect(request.statusCode).toBe(204);      }
    );
  });
});
