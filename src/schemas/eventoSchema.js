const { Schema, model } = require("mongoose");

const eventoSchema = new Schema({
    nombre: {
        type: String,
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