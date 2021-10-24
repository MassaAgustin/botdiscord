const { getMessageTeam1, getMessageTeam2 } = require("../functions/message");

module.exports = {
    name: "mostrarequipos",
    description: "Mostrar los dos equipos armados",
    async execute(client, message, args, discord) {

        const mensajeEquipo1 = getMessageTeam1();
        const mensajeEquipo2 = getMessageTeam2();

        message.channel.send({ embeds: [mensajeEquipo1, mensajeEquipo2] });

    },
};