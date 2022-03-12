const { userExists, getAccountMir4 } = require("../../commands/user/functions/user");
const {  getEmbedMessage } = require("../../commands/functions/message");


module.exports = {
    name: "estadisticas",
    description: "Permite obtener las estadisticas de tu personaje",
    options: [
        {
            name: "nickname",
            description: "No es obligatorio, pero si se define, se mostraran las estadisticas de ese personaje",
            type: "STRING",
            required: false
        }
    ],
    run: async (client, interaction) => {

        try {
            const userID = interaction.user.id;
            const optionInteraction = interaction.options;
            let nickName = optionInteraction.getString("nickname");

            if (!nickName) {
                const user = await userExists(userID);
                if (!user) throw new Error("No tienes una cuenta creada");
                if (!user.mir4) throw new Error("No tienes ningun personaje de mir4");

                nickName = user.mir4.nickName;
            }

            const mir4Account = await getAccountMir4(nickName);

            if (!mir4Account) throw new Error("Esta cuenta de mir4 no existe");

            const messageEmbed = getEmbedMessage('Estadisticas', 'success', '', mir4Account);

            interaction.reply({ embeds: [messageEmbed], ephemeral: false });

        } catch (error) {
            console.log(error);
            return interaction.reply({ content: error.message, ephemeral: false });
        }
    }
}