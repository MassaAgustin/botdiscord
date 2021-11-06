const userModel = require("../../../schemas/userSchema");

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

module.exports = {
    createUser,
    userExists
}