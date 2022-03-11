const { Router } = require('express');
const mir4Controlador = require('../controladores/mir4');

const router = Router();

router.get('/' , mir4Controlador.getListadoJugadores);

module.exports = router;