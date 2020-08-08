const {Router} = require('express');
const router = Router();
const bicicletaController = require('../../controllers/api/bicicletaControllerApi.js');


router.get('/',bicicletaController.bicicleta_list);
router.get('/show',bicicletaController.bicicleta_list)
router.post('/create',bicicletaController.bicicleta_create);
router.delete('/delete',bicicletaController.bicicleta_delete);

module.exports = router;