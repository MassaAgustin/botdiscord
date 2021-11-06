const userModel = require("../../../schemas/userSchema");
const lolModel = require("../../../schemas/lolSchema");
const csgoModel = require("../../../schemas/csgoSchema");
const axieModel = require("../../../schemas/axieSchema");

const userExists = async (id) => {

    const user = await userModel.findOne({ userID: id }).populate("lol").populate("csgo").populate("axie");

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
        nickName: nickName
    });

    console.log(lolAccount)

    const userUpdated = await userModel.updateOne({ userID }, {
        $set: { lol: lolAccount._id }
    }, {
        upsert: true
    });

    return lolAccount;
}

const associateCsgoAccount = async (userID, nickName) => {

    const csgoAccount = await csgoModel.create({
        nickName: nickName
    });

    const userUpdated = await userModel.updateOne({ userID }, {
        $set: { "csgo": csgoAccount._id }
    }, {
        upsert: true
    });

    return csgoAccount;
}

const associateAxieAccount = async (userID, nickName) => {

    const axieAccount = await axieModel.create({
        nickName: nickName
    });

    const userUpdated = await userModel.updateOne({ userID }, {
        $set: { "axie": axieAccount._id }
    });

    return axieAccount;
}

module.exports = {
    createUser,
    userExists,
    associateLolAccount,
    associateCsgoAccount,
    associateAxieAccount
}