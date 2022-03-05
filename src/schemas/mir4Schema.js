const { Schema, model } = require("mongoose");

const mir4Schema = new Schema({
    nickName: {
        type: String,
        required: true,
        unique: true,
    },
    poder: {
        type: Number,
        required: false,
        default: 0
    },
    nivel: {
        type: Number,
        required: false,
        default: 1
    },
    clan: {
        type: String,
        required: false,
        default: "Ninguno"
    },
    clase: {
        type: String,
        required: false,
        default: "Ninguno"
    },
    subclase: {
        type: String,
        required: false,
        default: "Ninguno"
    }
}, {
    timestamps: {
        createdAt: "Fecha cracion",
        updatedAt: "Fecha actualizacion"
    }
});

module.exports = model("mir4", mir4Schema);