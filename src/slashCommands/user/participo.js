const { crearParticipacionEvento, userExists } = require("../../commands/user/functions/user");

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

            const user = await userExists(userInteraction.id);
            if (!user) return interaction.reply({ content: "Antes usa /mir4 para registrarte", ephemeral: true });
            if (!user.mir4) return interaction.reply({ content: "Te falta especificar nickName con /mir4 nickName", ephemeral: true });
            if (!user.mir4.clan) return interaction.reply({ content: "Te falta especificar clan con /mir4 clan", ephemeral: true });

            const optionInteraction = interaction.options;
            const evento = optionInteraction.getString("evento");

            const participacion = await crearParticipacionEvento(evento, user.mir4);
            let content = 'Participacion registrada';

            if (!participacion) content = `No se pudo registrar al evento ${participacion}`;

            return interaction.reply({ content: content, ephemeral: true });

        } catch (error) {
            return interaction.reply({ content: error.message, ephemeral: true });
        }
    }
}