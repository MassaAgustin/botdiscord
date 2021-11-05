require('dotenv').config();

const discord = require('discord.js');
const clientD = new discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

clientD.commands = new discord.Collection();
clientD.events = new discord.Collection();
clientD.slash = new discord.Collection();

["commandHandler", "eventHandler", "slashHandler"].forEach((file) => {
    require(`./handlers/${file}`)(clientD, discord);
});

clientD.login(process.env.DSTOKEN);

/**
 * @brief Una vez que el bot se ha conectado a discord, se ejecuta el evento ready
 *
 * @details Se ejecuta el evento ready, que se encarga de establecer el estado custom del bot
 */
clientD.once("ready", (bot) => {

    clientD.user.setStatus("online");
    clientD.user.setActivity("#Node", { type: "STREAMING" });
});

/**
 * @brief Cuando el bot recibe una interaccion, se ejecuta el evento interaction
 *
 * @details Se ejecuta el evento interaction, que se encarga de verificar si la interaccion es slash o no.
 */

/** Próxima integracion con mongoDB */

/* const memberModel = require("./schemas/memberSchema");
const mongoose = require('mongoose');
const uriMongoose = process.env.DB;

mongoose
    .connect(uriMongoose, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).
    then(res => {
        console.log("conectado a MongoDB");
        console.log("---------------------")
    })
    .catch(err => {
        console.log(err);
    }); */

/* const existsMember = await memberModel.findOne({ memberID: message.author.id });
if (existsMember) throw new Exception("Este usuario ya existe"); * /
const createMember = async () => {
    try {
        const newMember = await memberModel.create({
            memberID: message.author.id,
            serverID: message.author.username,
            memberName: message.displayName,
        });

        newMember.save();
    } catch (err) {
        console.log(error)
    }
} */