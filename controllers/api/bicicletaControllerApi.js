const Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res){
    Bicicleta.find({}, function(err, bicicletas){
        res.status(200).json({
            bicicletas: bicicletas
        });
    });
}

exports.bicicleta_create = function(req, res){
    var bici = Bicicleta.createInstance(req.body.code, req.body.color, req.body.modelo)
    bici.ubicacion = [req.body.lat, req.body.log];

    bici.save(function(err){ 
            res.status(200).json({
            title: "Confirmación de la operación",
            message: "El registro ha sido guardado correctamente",
            bicicleta: bici
        });
    });  
}
exports.bicicleta_show = function(req, res){
    Bicicleta.findByCode(req.body.code, function(err){
        if(err) console.log(err);
        else res.status(200).send();
    });
    
}
exports.bicicleta_delete = function(req, res){
    Bicicleta.deleteByCode(req.body.code, function(err){
        if(err) console.log(err);
        else res.status(204).send(); 
    });
    
}
