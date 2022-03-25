const { Schema, model } = require("mongoose");

const desafioSchema = new Schema({
    nombre: {
        type: String,
    },
    evento: {
        type: Schema.Types.ObjectId,
        ref: "evento",
        required: true
    },
    mir4: {
        type: Schema.Types.ObjectId,
        ref: "mir4",
        required: true
    }
}, {
    timestamps: {
        createdAt: "Participacion",
        updatedAt: false
    }
});

module.exports = model("desafio", desafioSchema);