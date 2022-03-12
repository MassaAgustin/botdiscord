const { Schema, model } = require("mongoose");

const axieSchema = new Schema({
    nickName: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

//module.exports = model("axie", axieSchema);