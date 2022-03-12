const clanModel = require("../schemas/clanSchema");


const obtenerClanes = async (req, res) => {
    const listadoClanes = await clanModel.find({});

    res.status(200).json(listadoClanes);
}

module.exports = {
    obtenerClanes
}