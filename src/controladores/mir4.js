const mir4Model = require('../schemas/mir4Schema');


const getListadoJugadores = async (req, res) => {
    const { } = req.body;

    const listadoJugadores = await mir4Model.find({});

    res.status(200).json(listadoJugadores);
}

module.exports = {
    getListadoJugadores
}