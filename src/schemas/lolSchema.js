const { Schema, model } = require("mongoose");

const lolSchema = new Schema({
    nickName: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

//module.exports = model("lol", lolSchema);