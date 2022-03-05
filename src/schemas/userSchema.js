const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    lol: {
        type: Schema.Types.ObjectId,
        ref: "lol",
        required: false,
        default: null
    },
    csgo: {
        type: Schema.Types.ObjectId,
        ref: "csgo",
        required: false,
        default: null
    },
    axie: {
        type: Schema.Types.ObjectId,
        ref: "axie",
        required: false,
        default: null
    },
    mir4: {
        type: Schema.Types.ObjectId,
        ref: "mir4",
        required: false,
        default: null
    }
}, {
    timestamps: {
        createdAt: "Fecha cracion",
        updatedAt: "Fecha actualizacion"
    }
});

module.exports = model("user", userSchema);