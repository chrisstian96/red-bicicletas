const {Router} = require('express');
const router = Router();
const bicicletaController = require('../controllers/bicicleta');

router.get('/',bicicletaController.bicicleta_list);
router.get('/create', bicicletaController.bicicleta_create);
router.post('/create', bicicletaController.bicicleta_store);

module.exports = router;