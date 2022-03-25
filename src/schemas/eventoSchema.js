const { Schema, model } = require("mongoose");

const eventoSchema = new Schema({
    tipo: {
        type: Schema.Types.ObjectId,
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