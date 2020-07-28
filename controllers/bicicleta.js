const Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res){
    res.render('bicicletas',{bicis:Bicicleta.allBicis})
}

exports.bicicleta_create = function(req, res){
    res.render('bicicletas/create')
}

exports.bicicleta_store = function(req, res){
    const bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo, )
    bici.ubicacion = [req.body.lat, req.body.lng]
    Bicicleta.add(bici)

    res.redirect('/bicicletas');
}