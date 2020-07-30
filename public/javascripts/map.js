var mymap = L.map("main_map").setView([3.4760132, -76.5300671], 17);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

$.ajax({
  dataType: "json",
  url: "api/bicicletas",
  success: (result) => {
    let sede = "";
    console.log(result);
    result.bicicletas.forEach(function (bici) {
        if(bici.id === 1){
            sede = "Sede principal";
        }else{
            sede = "Sucursal";
        }

      L.marker(bici.ubicacion)
        .addTo(mymap)
        .bindPopup(`${bici.id}.${sede}`)
        .openPopup();
    });
  },
});
