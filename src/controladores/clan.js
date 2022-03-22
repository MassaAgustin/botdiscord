const clanModel = require("../schemas/clanSchema");
const { getClases } = require("./mir4");

const _obtenerClanes = async () => {
    return await clanModel.find({});
}


const obtenerClanes = async (req, res) => {

    res.status(200).json(await _obtenerClanes());
}

const obtenerClanesYClases = async (req, res) => {

    try {
        res.status(200).json({
            clanes: await _obtenerClanes(),
            clases: getClases(),
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

module.exports = {
    obtenerClanes,
    obtenerClanesYClases
}