const { getAccountMir4 } = require("./functions/user");
const { getEmbedMessage } = require("../functions/message");

module.exports = {
    name: "mir4usuario",
    description: "Obtiene las estadisticas de un usuario de mir4",
    async execute(client, message, args, discord) {

        try {

            if (args.length) {

                const nickName = args[0];
                const mir4Account = getAccountMir4(nickName);

                if (!mir4Account) return message.channel.send('Esta cuenta de mir4 no existe');

                delete mir4Account.nickName;

                const messageEmbed = getEmbedMessage(mir4Account.nickName, 'success', '', mir4Account);

                message.channel.send({ embeds: [messageEmbed] });

            } else {
                message.channel.send('Comando válido: !mir4usuario Nickname');
            }

        } catch (error) {
            message.channel.send('Error al obtener las estadisticas del usuario');
        }
    }
}