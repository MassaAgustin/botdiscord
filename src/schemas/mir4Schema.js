const { Schema, Types: { ObjectId }, model } = require("mongoose");

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
        type: Schema.Types.ObjectId,
        ref: "clan",
        required: false,
        default: ObjectId("622ca14171b70a86da6d6509")
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