const { listarPlatitas } = require("./utils/functions");

module.exports = {
    name: "listarplatitas",
    description: "Lista los jugadores actuales",
    async execute(client, message, args, discord) {

        const messageEmbed = listarPlatitas();

        message.channel.send({ embeds: [messageEmbed] });
    },
};

