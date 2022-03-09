require('dotenv').config();

const discord = require('discord.js');
const clientD = new discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});


/** Conexion Mongoose */
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
    clientD.user.setActivity("#Mir4", { type: "STREAMING" });
});

clientD.once("guildMemberAdd", (member) => {
    member.send(`Bienvenido! ${member.displayName}`);
})