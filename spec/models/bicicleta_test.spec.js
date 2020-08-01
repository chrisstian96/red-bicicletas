const Bicicleta = require("../../models/bicicleta");
const { bicicleta_delete_post } = require("../../controllers/bicicleta");
beforeEach(() => {
  Bicicleta.allBicis = [];
});
describe("Bicicleta.allBicis", () => {
  it("comienza vacia", () => {
    expect(Bicicleta.allBicis.length).toBe(0);
  });
});

describe("Bicicleta.add", () => {
  it("Agreagamos una", () => {
    expect(Bicicleta.allBicis.length).toBe(0);

    var bicicleta = new Bicicleta(2, "blanca", "urbana", [3.472, -76.537]);
    Bicicleta.add(bicicleta);

    expect(Bicicleta.allBicis.length).toBe(1);
    expect(Bicicleta.allBicis[0]).toBe(bicicleta);
  });
});

describe("Bicicleta.findById", () => {
  it("Debe devolver la bici con id 1", () => {
    expect(Bicicleta.allBicis.length).toBe(0);

    var aBici = new Bicicleta(1, "Verde", "Urbana");
    var aBici2 = new Bicicleta(2, "Naranja", "Todoterreno");
    var aBici3 = new Bicicleta(3, "Gris", "Pista");

    Bicicleta.add(aBici);
    Bicicleta.add(aBici2);
    Bicicleta.add(aBici3);

    var targetBici = Bicicleta.findById(1);
    expect(targetBici.id).toBe(1);
    expect(targetBici.color).toBe(aBici.color);
    expect(targetBici.modelo).toBe(aBici.modelo);
  });
});

describe("Bicicleta.Delete", () => {

  it("Debe eliminar la bicicleta agregada actualmente", () => {
    var aBici = new Bicicleta(1, "Verde", "Urbana");
    
    Bicicleta.add(aBici);

    expect(Bicicleta.allBicis.length).toBe(cantidad_bicicletas);
   

    Bicicleta.removeById(aBici.id);
    expect(Bicicleta.allBicis.length).toBe(0);
  });
});
