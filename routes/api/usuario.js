const {Router} = require('express');
const router = Router();
const usuarioController = require('../../controllers/api/usuarioControllerApi');

router.get('/', usuarioController.usuarios_list);
router.post('/reservar',usuarioController.usuario_reservar);
router.post('/create',usuarioController.usuarios_create);

module.exports = router;