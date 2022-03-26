const userModel = require("../../../schemas/userSchema");
const lolModel = require("../../../schemas/lolSchema");
const csgoModel = require("../../../schemas/csgoSchema");
const axieModel = require("../../../schemas/axieSchema");
const mir4Model = require("../../../schemas/mir4Schema");
const eventoModel = require("../../../schemas/eventoSchema");
const participanteModel = require("../../../schemas/participanteSchema");

const NAME_EXPEDICION = "Expedicion";
const NAME_DESAFIO = "Desafio";

const userExists = async (id) => {

    const user =
        await userModel
            .findOne({ userID: id })
            .populate('mir4', '-__v');

    return user;
}

const crearParticipacionEvento = async (nombreEvento, mir4) => {

    const existEvent = await eventoModel.findOne({ nombre: nombreEvento, clan: mir4.clan });
    if (!existEvent) throw new Error(`Este evento no existe`);

    const horarioEvento = existEvent.horario;
    const horarioActual = new Date();

    if ((horarioEvento.getTime() > horarioActual.getTime()) && ((horarioEvento.getTime() + 1000 * 60 * 60) < horarioActual.getTime()))
        throw new Error(`El evento no ocurrió o ya paso, no puedes registrarte`);

    return await crearParticipacion(existEvent._id, mir4._id);
}

const crearParticipacion = async (idEvento, idMir4) => {

    const participacion = await participanteModel.create({
        evento: idEvento,
        mir4: idMir4
    });

    return await participacion.save();
}

const getCantidadUsuarios = async () => {

    return await userModel.find({}).countDocuments();
}

const getCantidadUsuariosMir4 = async () => {

    return await mir4Model.find({}).countDocuments();
}

const getAccountMir4 = async (nickName, id = null) => {

    const filtroMir4 = {};

    (id != null) ? filtroMir4._id = id : filtroMir4.nickName = nickName;

    return mir4Model.findOne(filtroMir4, '-_id -__v').populate('clan', '-_id -__v');
}

const createUser = async (id, username) => {

    const newUser = await userModel.create({
        userID: id,
        userName: username,
    });

    return await newUser.save();
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

const associateMir4Account = async (user, userPropsToUpdate) => {

    let mir4Account = await mir4Model.findOne({ nickName: userPropsToUpdate.nickName });
    let userUpdated = null;

    if (!mir4Account) {
        mir4Account = await mir4Model.create(userPropsToUpdate);
    } else {
        mir4Account = await mir4Model.updateOne(
            { _id: user.mir4 },
            { $set: userPropsToUpdate }
        );
    }

    if (!user.mir4) {

        userUpdated =
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

    return [mir4Account, userUpdated];
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
    crearParticipacionEvento
}