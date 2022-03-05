const userModel = require("../../schemas/userSchema");
const clasesMir4 = [
    { name: "Hechicero", value: "Hechicero" },
    { name: "Guerrero", value: "Guerrero" },
    { name: "Arbalista", value: "Arbalista" },
    { name: "Taoista", value: "Taoista" },
    { name: "Lancero", value: "Lancero" },
    { name: "Ninguna", value: "Ninguna" },
];

const clanesMir4 = [
    { name: "LATAM ATR 1", value: "LATAM ATR 1" },
    { name: "LATAM ATR 2", value: "LATAM ATR 2" },
    { name: "LATAM ATR 3", value: "LATAM ATR 3" }
]

module.exports = {
    name: "mir4",
    description: "Permite actualizar tus datos de mir4",
    options: [
        {
            name: "nickname",
            description: "Nickname de tu cuenta de mir4",
            type: "STRING",
            required: false
        },
        {
            name: "poder",
            description: "Poder de tu cuenta de mir4",
            type: "NUMBER",
            required: false
        },
        {
            name: "nivel",
            description: "Nivel de tu cuenta de mir4",
            type: "NUMBER",
            required: false
        },
        {
            name: "clase",
            description: "Clase de tu cuenta de mir4",
            type: "STRING",
            required: false,
            choices: clasesMir4
        },
        {
            name: "subclase",
            description: "Subclase de tu cuenta de mir4",
            type: "STRING",
            required: false,
            choices: clasesMir4
        },
        {
            name: "clan",
            description: "Clan de tu cuenta de mir4",
            type: "STRING",
            required: false,
            choices: clanesMir4
        }
    ],
    run: async (client, interaction) => {

        const userInteraction = interaction.user;
        const user = await userModel.findOne({ userID: userInteraction.id });

        try {

            await interaction.editReply({ content: "Buscando cuenta...", ephemeral: false });

            if (!user) {
                await interaction.editReply({ content: "No tienes una cuenta de mir4", ephemeral: false });
                return false;
            }

            const optionInteraction = interaction.options;
            const userPropsToUpdate = {};

            const nickName = optionInteraction.getString("nickname");
            const clase = optionInteraction.getString("clase");
            const subclase = optionInteraction.getString("subclase");
            const clan = optionInteraction.getString("clan");
            const poder = optionInteraction.getNumber("poder");
            const nivel = optionInteraction.getNumber("nivel");

            if (nickName) userPropsToUpdate.nickName = nickName;
            if (clase) userPropsToUpdate.clase = clase;
            if (subclase) userPropsToUpdate.subclase = subclase;
            if (clan) userPropsToUpdate.clan = clan;
            if (poder) userPropsToUpdate.poder = poder;
            if (nivel) userPropsToUpdate.nivel = nivel;


            const userUpdated = await userModel.updateOne({ userID: userInteraction.id }, userPropsToUpdate);
            let content = 'Actualizado correctamente';

            if (!userUpdated) {
                content = 'No se pudo actualizar el usuario' + userUpdated;
            }

            await interaction.editReply({ content: content, ephemeral: false });

        } catch (error) {
            await interaction.editReply({ content: error.message, ephemeral: false });
        }
    }
}