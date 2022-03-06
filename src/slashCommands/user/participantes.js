const userModel = require("../../schemas/userSchema");
const { getParticipantesEvento } = require("../../commands/user/functions/user");

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
    name: "participantes",
    description: "Permite obtener los participantes de un evento en determinada fecha",
    options: [
        {
            name: "evento",
            description: "Datos de que evento quieres saber",
            type: "STRING",
            choices: eventos,
            required: true
        },
        {
            name: "dia",
            description: "Dia del evento",
            type: "STRING",
            required: true
        },
        {
            name: "mes",
            description: "Mes del evento",
            type: "STRING",
            choices: meses,
            required: true
        },
        {
            name: "anio",
            description: "Año del evento",
            type: "STRING",
            choices: anios,
            required: true
        }
    ],
    run: async (client, interaction) => {

        const userInteraction = interaction.user;

        try {

            const user = await userModel.findOne({ userID: userInteraction.id });
            if (!user) return interaction.reply({ content: "Aun no eres usuario", ephemeral: false });
            if (!user.mir4) return interaction.reply({ content: "Aun no tienes cuenta de mir4", ephemeral: false });

            const optionInteraction = interaction.options;

            const evento = optionInteraction.getString("evento");
            const dia = optionInteraction.getString("dia");
            const mes = optionInteraction.getString("mes");
            const anio = optionInteraction.getString("anio");

            if (!(dia >= 1 && dia <= 31)) throw new Error("El dia debe estar entre 1 y 31");

            return interaction.reply({ embeds: [getParticipantesEvento(evento, dia, mes, anio)], ephemeral: false });

        } catch (error) {
            return interaction.reply({ content: error.message, ephemeral: false });
        }
    }
}