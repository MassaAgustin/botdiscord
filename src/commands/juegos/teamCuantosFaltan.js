const { getEmbedMessage } = require("../functions/message");
const { cantFaltante, listarPlatitas } = require("./utils/functions");

module.exports = {
    name: "cuantosfaltan",
    description: "Crear team vs team",
    async execute(client, message, args, discord) {

        const description = `${cantFaltante()} platitas`
        const mensaje = getEmbedMessage('Vamooo\' que faltan: ', 'success', description);

        message.channel.send({ embeds: [mensaje] });
    },
};

