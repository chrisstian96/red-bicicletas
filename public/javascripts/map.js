var mymap = L.map('main_map').setView([3.4760132, -76.5300671], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


L.marker([3.4760132, -76.5300671]).addTo(mymap)
    .bindPopup('Sede principal')
    .openPopup();

L.marker([3.475, -76.528]).addTo(mymap)
    .bindPopup('Sucursal.')
    .openPopup();
    
L.marker([3.477, -76.525]).addTo(mymap)
    .bindPopup('Sucursal.')
    .openPopup();