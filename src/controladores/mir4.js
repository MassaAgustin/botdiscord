const mir4Model = require('../schemas/mir4Schema');


const getListadoJugadores = async (req, res) => {
    const { } = req.body;

    const listadoJugadores = await mir4Model.find({}).populate('clan', '-_id -__v');

    res.status(200).json(listadoJugadores);
}

const getJugadorByID = async (req, res) => {
    const { id } = req.params;

    const jugador = await mir4Model.findById(id).populate('clan', '-_id -__v');

    res.status(200).json(jugador);
}

module.exports = {
    getJugadorByID,
    getListadoJugadores
}