const { Schema, model } = require("mongoose");

const memberSchema = new Schema({
    memberID: {
        type: String,
        required: true,
        unique: true,
    },
    memberName: {
        type: String,
        required: true,
        unique: true,
    },
    serverID: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = model("member", memberSchema);