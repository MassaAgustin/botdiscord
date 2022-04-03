const participanteSchema = require('../schemas/participanteSchema');

const participacionesEvento = async (idMir4) => {
    return await participanteSchema.find({ mir4: idMir4 }).populate("evento");
}

const getParticipacionesEventoByMir4 = async (req, res) => {

    const participaciones = await participacionesEvento(req.params.id);

    res.status(200).json(participaciones);
}

module.exports = {
    participacionesEvento,
    getParticipacionesEventoByMir4
}