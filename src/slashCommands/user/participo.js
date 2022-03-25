const userModel = require("../../schemas/userSchema");
const { crearParticipacionEvento } = require("../../commands/user/functions/user");

const horarios = [
    {
        idClan: "",
        horario: ""
    },
    {

    },
    {

    }
];

const eventos = [
    { name: "Expedicion", value: "Expedicion" },
    { name: "Desafio", value: "Desafio" }
]

module.exports = {
    name: "participo",
    description: "Permite registrarte a un evento",
    options: [
        {
            name: "evento",
            description: "Evento en el que quieres participar",
            type: "STRING",
            choices: eventos,
            required: true
        }
    ],
    run: async (client, interaction) => {

        const userInteraction = interaction.user;

        try {

            const user = await userModel.findOne({ userID: userInteraction.id });
            if (!user) return interaction.reply({ content: "Aun no eres usuario", ephemeral: true });
            if (!user.mir4) return interaction.reply({ content: "Aun no tienes cuenta de mir4", ephemeral: true });

            const optionInteraction = interaction.options;

            const evento = optionInteraction.getString("evento");

            const participacion = await crearParticipacionEvento(evento, user.mir4);
            let content = 'Registrado correctamente';

            if (!participacion) content = `No se pudo registrar al evento ${participacion}`;

            return interaction.reply({ content: content, ephemeral: true });

        } catch (error) {
            return interaction.reply({ content: error.message, ephemeral: true });
        }
    }
}