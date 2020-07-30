const Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res){
    res.render('bicicletas',{bicis:Bicicleta.allBicis})
}

exports.bicicleta_create = function(req, res){
    res.render('bicicletas/create')
}

exports.bicicleta_store = function(req, res){
    const bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo )
    bici.ubicacion = [req.body.lat, req.body.log];
    console.log(bici);
    Bicicleta.add(bici);
    res.redirect('/bicicletas');
}

exports.bicicleta_show = function(req, res){
    const bici = Bicicleta.findById(req.params.id);
    res.render('bicicletas',{bici});
}

exports.bicicleta_edit = function(req, res){
    const bici = Bicicleta.findById(req.params.id);
    res.render('bicicletas/update',{bici});
}

exports.bicicleta_update = function(req , res) {
    const bici = Bicicleta.findById(req.params.id);
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.log];
    res.redirect('/bicicletas');
}

exports.bicicleta_delete_post = function(req, res){
    Bicicleta.removeById(req.body.id);
    res.redirect('/bicicletas');

}