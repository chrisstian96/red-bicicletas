const {Router} = require('express');
const router = Router();
const bicicletaController = require('../controllers/bicicleta');

router.route('/')
      .get(bicicletaController.bicicleta_list);

router.route('/:id/show')
      .get(bicicletaController.bicicleta_show)

router.route('/create')
      .get(bicicletaController.bicicleta_create)
      .post(bicicletaController.bicicleta_store);

router.route('/:id/update')
      .get(bicicletaController.bicicleta_edit)
      .post(bicicletaController.bicicleta_update);

router.post('/:id/delete',bicicletaController.bicicleta_delete_post);

module.exports = router;