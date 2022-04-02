const { Schema, model } = require("mongoose");

const eventoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        enum: ["Desafio", "Expedicion"]
    },
    clan: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "clan"
    },
    duracion: {
        type: Number,
        default: 60
    },
    dia: {
        type: Number,
        required: true,
        min: 1,
        max: 31
    },
    hora: {
        type: Number,
        required: true,
        min: 0,
        max: 23
    },
    minuto: {
        type: Number,
        required: true,
        min: 0,
        max: 59
    }
}, {
    timestamps: {
        createdAt: "Fecha creacion",
        updatedAt: "Fecha actualizacion"
    }
});

module.exports = model("evento", eventoSchema);