const { Schema, model } = require("mongoose");

const clanSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    alianzas: {
        type: [Schema.Types.ObjectId],
        ref: "clan",
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