const { getEmbedMessage } = require("../functions/message");

module.exports = {
    name: "limpiar",
    description: "Eliminar mensajes",
    async execute(client, message, args, discord) {
        let messageToDelete = 1;
        const parametro = Number(args[0]);

        if (args.length && typeof parametro === 'number') {
            messageToDelete = parametro;
        }
        const messageEmbed = getEmbedMessage('Ok :white_check_mark:', 'success', `${parametro} mensajes eliminados`);

        message.channel.bulkDelete(messageToDelete)
            .then(res => {
                message.channel.send({ embeds: [messageEmbed] });
            });
    },
};