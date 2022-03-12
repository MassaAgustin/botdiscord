const { Schema, model } = require("mongoose");

const clanSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    alianzas: {
        type: [ this ],
        default: [],
        required: false
    }
}, {
    timestamps: {
        createdAt: "Fecha creacion",
        updatedAt: "Fecha actualizacion"
    }
});

module.exports = model("clan", clanSchema);