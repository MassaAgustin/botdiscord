const userModel = require("../../../schemas/userSchema");
const lolModel = require("../../../schemas/lolSchema");
const csgoModel = require("../../../schemas/csgoSchema");
const axieModel = require("../../../schemas/axieSchema");

const userExists = async (id) => {

    const user = await userModel.findOne({ userID: id });

    return user;
}

const createUser = async (id, username) => {

    const newUser = await userModel.create({
        userID: id,
        userName: username,
    });

    newUser.save();

    return newUser;
}

const associateLolAccount = async (userID, nickName) => {

    const lolAccount = await lolModel.create({
        nickName
    });

    const userUpdated = await userModel.updateOne({ userID }, {
        $set: { lol: lolAccount }
    });

    return userUpdated;
}

const associateCsgoAccount = async (userID, nickName) => {

    const csgoAccount = await csgoModel.create({
        nickName
    });

    const userUpdated = await userModel.updateOne({ userID }, {
        $set: { csgo: csgoAccount }
    });

    return userUpdated;
}

const associateAxieAccount = async (userID, nickName) => {

    const axieAccount = await axieModel.create({
        nickName
    });

    const userUpdated = await userModel.updateOne({ userID }, {
        $set: { axie: axieAccount }
    });

    return userUpdated;
}

module.exports = {
    createUser,
    userExists,
    associateLolAccount,
    associateCsgoAccount,
    associateAxieAccount
}