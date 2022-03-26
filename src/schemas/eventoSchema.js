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
    horario: {
        type: Date,
        required: true,
        unique: true
    }
}, {
    timestamps: {
        createdAt: "Fecha creacion",
        updatedAt: "Fecha actualizacion"
    }
});

module.exports = model("evento", eventoSchema);