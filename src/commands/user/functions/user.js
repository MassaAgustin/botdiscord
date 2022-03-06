const userModel = require("../../../schemas/userSchema");
const lolModel = require("../../../schemas/lolSchema");
const csgoModel = require("../../../schemas/csgoSchema");
const axieModel = require("../../../schemas/axieSchema");
const mir4Model = require("../../../schemas/mir4Schema");
const eventoModel = require("../../../schemas/eventoSchema");
const expedicionModel = require("../../../schemas/expedicionSchema");
const desafioModel = require("../../../schemas/desafioSchema");

const NAME_EXPEDICION = "Expedicion";
const NAME_DESAFIO = "Desafio";

const userExists = async (id) => {

    const user =
        await userModel
            .findOne({ userID: id })
            .populate('mir4', '-_id -__v');

    return user;
}

const crearParticipacionEvento = async (evento, mir4) => {

    const existEvent = await eventoModel.findOne({ nombre: evento });

    if (!existEvent) throw new Error(`No existe el evento ${evento}`);

    let participacionCreada = null;

    switch (evento) {
        case NAME_EXPEDICION:
            participacionCreada = await crearExpedicion(existEvent._id, mir4);
            break;
        case NAME_DESAFIO:
            participacionCreada = await crearDesafio(existEvent._id, mir4);
            break;
    }

    return participacionCreada.save();
}

const getParticipantesEvento = async (evento, dia, mes, anio) => {

    const existEvent = await eventoModel.findOne({ nombre: evento });
    if (!existEvent) throw new Error(`No existe el evento ${evento}`);

    let participantes = null;

    console.log({ evento, dia, mes, anio })

    switch (evento) {
        case NAME_EXPEDICION:
            participantes = await getParticipantesExpedicion(existEvent._id, dia, mes, anio);
            break;
        case NAME_DESAFIO:
            participantes = await getParticipantesDesafio(existEvent._id, dia, mes, anio);
    }


    for (let i = 0; i < participantes.length; i++) {

        participantes[i] = participantes[i].mir4.nickName;
    }

    console.log(participantes);

    return participantes;
}

const getParticipantesDesafio = async (idEvento, dia, mes, anio) => {

    console.log({ idEvento });



    const participantes =
        await desafioModel
            .find({ evento: idEvento })
            .select('mir4 -_id')
            .populate('mir4', '-_id -__v');


    return participantes;
}

const getParticipantesExpedicion = async (idEvento, dia, mes, anio) => {

    const participantes =
        await expedicionModel
            .find({ evento: idEvento, Participacion: `${anio}-${mes}-${dia}` })
            .populate('mir4', '-_id -__v');

    return participantes;
}

const crearDesafio = (idEvento, idMir4) => {
    return desafioModel.create({ evento: idEvento, mir4: idMir4 });
}

const crearExpedicion = (idEvento, idMir4) => {
    return expedicionModel.create({ evento: idEvento, mir4: idMir4 });
}


const getCantidadUsuarios = async () => {

    return await userModel.find({}).countDocuments();
}

const getCantidadUsuariosMir4 = async () => {

    return await mir4Model.find({}).countDocuments();
}

const getAccountMir4 = async (nickName) => {

    return mir4Model.findOne({ nickName: nickName }, '-_id -__v');
}

const createUser = async (id, username) => {

    const newUser = await userModel.create({
        userID: id,
        userName: username,
    });

    newUser.save();

    return newUser;
}

const associateLolAccount = async (user_id, nickName) => {

    const lolAccount = await lolModel.create({
        nickName: nickName
    });

    const userUpdated = await userModel.findByIdAndUpdate({ user_id }, {
        $set: { lol: lolAccount._id }
    }, {
        upsert: true
    });

    return lolAccount;
}

const associateCsgoAccount = async (user_id, nickName) => {

    const csgoAccount = await csgoModel.create({
        nickName: nickName
    });

    const userUpdated = await userModel.findByIdAndUpdate({ user_id }, {
        $set: { csgo: csgoAccount._id }
    }, {
        upsert: true
    });

    return csgoAccount;
}

const associateAxieAccount = async (user_id, nickName) => {

    const axieAccount = await axieModel.create({
        nickName: nickName
    });

    const userUpdated = await userModel.findByIdAndUpdate({ user_id }, {
        $set: { axie: axieAccount._id }
    }, {
        upsert: true
    });

    return axieAccount;
}

const associateMir4Account = async (user, nickName) => {

    let mir4Account = await mir4Model.findOne({ nickName: nickName });

    if (!mir4Account) {
        mir4Account = await mir4Model.create({
            nickName: nickName
        });
    }

    if (!user.mir4) {

        const userUpdated =
            await userModel
                .updateOne(
                    {
                        _id: user._id
                    },
                    {
                        $set: { mir4: mir4Account._id }
                    }
                );
    }

    return mir4Account;
}

module.exports = {
    createUser,
    userExists,
    associateLolAccount,
    associateCsgoAccount,
    associateAxieAccount,
    associateMir4Account,
    getAccountMir4,
    getCantidadUsuarios,
    getCantidadUsuariosMir4,
    crearParticipacionEvento,
    getParticipantesEvento
}