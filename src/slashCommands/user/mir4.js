const userModel = require("../../schemas/userSchema");
const mir4Model = require("../../schemas/mir4Schema");
const { createUser, associateMir4Account } = require("../../commands/user/functions/user");
const { Types: { ObjectId } } = require("mongoose");

const MIR4_ARRAY = 0;
const USER_ARRAY = 1;

const clasesMir4 = [
    { name: "Hechicera", value: "Hechicera" },
    { name: "Guerrero", value: "Guerrero" },
    { name: "Ballestera", value: "Ballestera" },
    { name: "Taoista", value: "Taoista" },
    { name: "Lancero", value: "Lancero" },
    { name: "Ninguna", value: "Ninguna" },
];

const clanesMir4 = [
    { name: "LATAM ATR 1", value: "622c9dcc71b70a86da6d64fc" },
    { name: "LATAM ATR 2", value: "622c9e2671b70a86da6d6500" },
    { name: "LATAM ATR 3", value: "622c9ea071b70a86da6d6505" },
    { name: "Ninguno", value: "622ca14171b70a86da6d6509" }
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

        try {

            const { id, username } = interaction.user;

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
            if (clan) userPropsToUpdate.clan = ObjectId(clan);
            if (poder) userPropsToUpdate.poder = poder;
            if (nivel) userPropsToUpdate.nivel = nivel;

            let user = await userModel.findOne({ userID: idUserInteraction });
            if (!user) {
                if (!username) return Error("Debes tener un username");
                user = await createUser(id, nickName);
            }
            if (!user.mir4) {
                if (!nickName) return Error("Debes ingresar un nickname para create una cuenta de mir4");
                user = await associateMir4Account(user, nickName)[USER_ARRAY];
            }

            const mir4Updated = await mir4Model.updateOne(
                { _id: user.mir4 },
                { $set: userPropsToUpdate }
            );

            let content = 'Actualizado correctamente';

            if (!mir4Updated) {
                content = 'No se pudo actualizar el usuario' + mir4Updated;
            }

            return interaction.reply({ content: content, ephemeral: true });

        } catch (error) {
            return interaction.reply({ content: error.message, ephemeral: true });
        }
    }
}