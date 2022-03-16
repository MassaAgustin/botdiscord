const { getEmbedMessage } = require("../functions/message");
const { maxJugadores, jugadores } = require("./utils/vars");

module.exports = {
    name: "salevs",
    description: "Crear team vs team",
    async execute(client, message, args, discord) {

        let parametro = args[0];
        let mensaje;

        if (jugadores.length === maxJugadores) {
            mensaje = getEmbedMessage('Ya hay un partido en juego', 'warning', 'si quieren otro jodanse ndeah');
        }
        if (parametro !== 'reset') {

            mensaje = getEmbedMessage(`Se cambio la cantidad maxima de jugadores por ${parametro}`, 'success', `antes: ${maxJugadores}`);
            parametro = Number(args[0]);
            (typeof parametro === 'number')
                ? maxJugadores = parametro
                : mensaje = getEmbedMessage('Not today Prietto jeje', 'danger', 'el parametro tiene que ser un numero')
        }

        message.channel.send({ embeds: [mensaje] });
    },
};