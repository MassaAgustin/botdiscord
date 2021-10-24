const discord = require('discord.js');

require('dotenv').config();

const clientD = new discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

clientD.commands = new discord.Collection();
clientD.events = new discord.Collection();

["commandHandler", "eventHandler"].forEach((file) => {
    require(`./handlers/${file}`)(clientD, discord);
});

clientD.login(process.env.DSTOKEN)
    .then((success) => {
        console.log(success);
    })
    .catch((error) => {
        console.log(error);
    });

clientD.slash = new discord.Collection();

clientD.once("ready", (bot) => {

    //** Bot Status */
    clientD.user.setStatus("online");
    clientD.user.setActivity("#Node", { type: "STREAMING" });
    //** Bot Status */

    //** Helpers commands */

    //** Helpers commands */
});

clientD.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false })
            .catch(err => {
                console.log(err);
            });
    }

    const interactionCommand = clientD.slash.get(interaction.commandName);
    if (!interactionCommand) return interaction.followUp({ content: "Comando no registrado" });

    try {
        interactionCommand.run(clientD, interaction, []);
    } catch (err) {
        console.log(err);
    }
});

const memberModel = require("./schemas/memberSchema");
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