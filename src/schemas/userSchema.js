const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = model("user", userSchema);