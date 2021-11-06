const userModel = require("../../../schemas/userSchema");
const lolModel = require("../../../schemas/lolSchema");
const csgoModel = require("../../../schemas/csgoSchema");
const axieModel = require("../../../schemas/axieSchema");

const userExists = async (id) => {

    const user = await userModel.findOne({ userID: id }).populate("lol").populate("csgo").populate("axie");

    console.log(user);

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

const associateLolAccount = async (user_id, nickName) => {

    const lolAccount = await lolModel.create({
        nickName: nickName
    });

    const userUpdated = await userModel.findByIdAndUpdate({ user_id }, {
        $set: { lol: lolAccount._id }
    }, {
        new: true,
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
        new: true,
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
        new: true,
        upsert: true
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