const userModel = require("../../../schemas/userSchema");
const lolModel = require("../../../schemas/lolSchema");
const csgoModel = require("../../../schemas/csgoSchema");
const axieModel = require("../../../schemas/axieSchema");
const mir4Model = require("../../../schemas/mir4Schema");

const userExists = async (id) => {

    const user =
        await userModel
            .findOne({ userID: id })
            .populate('mir4', '-_id -__v');

    return user;
}

const getAccountMir4 = async (nickName) => {

    return await mir4Model.findOne({ nickName: nickName }, '-_id -__v');
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
    getAccountMir4
}