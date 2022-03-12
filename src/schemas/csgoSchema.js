const { Schema, model } = require("mongoose");

const csgoSchema = new Schema({
    nickName: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

//module.exports = model("csgo", csgoSchema);