const { Schema, model } = require("mongoose");

const horarioSchema = new Schema({
    evento: {
        type: Schema.Types.ObjectId,
        ref: "evento",
        required: true
    },
    realizacion: {
        type: Date,
        required: true
    }
}, {
    timestamps: {
        createdAt: "Fecha creacion",
        updatedAt: "Fecha actualizacion"
    }
});

module.exports = model("horario", horarioSchema);