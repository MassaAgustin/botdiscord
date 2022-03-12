const userModel = require("../../schemas/userSchema");
const { userExists, getAccountMir4 } = require("../../commands/user/functions/user");

const eventos = [
    { name: "Expedicion", value: "Expedicion" },
    { name: "Desafio", value: "Desafio" }
]

const anios = [
    { name: "2022", value: "2022" },
    { name: "2023", value: "2023" },
    { name: "2024", value: "2024" }
];

const meses = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4", value: "4" },
    { name: "5", value: "5" },
    { name: "6", value: "6" },
    { name: "7", value: "7" },
    { name: "8", value: "8" },
    { name: "9", value: "9" },
    { name: "10", value: "10" },
    { name: "11", value: "11" },
    { name: "12", value: "12" }
];

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
            const nickName = optionInteraction.getString("nickname");
            let mir4Account = null;

            if (!nickName) {
                const user = await userExists(userID);
                if (!user) throw new Error("No tienes una cuenta creada");
                if (!user.mir4) throw new Error("No tienes ningun personaje de mir4");

                mir4Account = getAccountMir4(nickName, user.mir4);
            }

            mir4Account = await getAccountMir4(nickName);

            if (!mir4Account) throw new Error("Esta cuenta de mir4 no existe");

            const messageEmbed = getEmbedMessage('Estadisticas', 'success', '', mir4Account);

            message.channel.send({ embeds: [messageEmbed] });


        } catch (error) {
            return interaction.reply({ content: error.message, ephemeral: false });
        }
    }
}