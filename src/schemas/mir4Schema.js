const { Schema, Types: { ObjectId }, model } = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");

const mir4Schema = new Schema({
    nickName: {
        type: String,
        required: true,
        unique: true,
    },
    selfie: {
        type: String,
        required: false
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
        default: new ObjectId("622ca14171b70a86da6d6509")
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
    },
    versionKey: false
});

mir4Schema.plugin(mongoosePaginate)

module.exports = model("mir4", mir4Schema);