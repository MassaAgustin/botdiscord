const clan = require('../controladores/clan');
const { Router } = require('express');

const router = Router();

router.use('/clases', clan.obtenerClanesYClases);


router.use('/', clan.obtenerClanes);


module.exports = router;

