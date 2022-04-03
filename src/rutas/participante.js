const { Router } = require('express');
const participanteControlador = require('../controladores/participante');

const router = Router();


router.get('/:id', participanteControlador.getParticipacionesEventoByMir4);

module.exports = router;