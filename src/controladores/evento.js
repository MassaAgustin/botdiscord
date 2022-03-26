const eventoSchema = require('../schemas/eventoSchema');

const obtEventos = async () => {

    return await eventoSchema.find({});
}

const obtenerEventos = async (req, res) => {

    const eventos = await obtEventos();

    res.status(200).json({
        success: true,
        eventos: eventos
    });
}


module.exports = {
    obtEventos,
    obtenerEventos
}