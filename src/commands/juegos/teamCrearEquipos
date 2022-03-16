const { cantFaltante, resetEquipos, getEquipos } = require("./utils/functions");
const { getEmbedMessage, getMessageTeam1, getMessageTeam2 } = require("../functions/message");
const { maxJugadores, jugadores } = require("./utils/vars");

module.exports = {
    name: "armarequipo",
    description: "Crear dos equipos como se listan o randoms",
    async execute(client, message, args, discord) {

        let seJuega = false;
        const cantJugadores = args.length;
        let armoRandom = false;

        if (args[cantJugadores - 1] == 'random') {
            resetEquipos();
            armoRandom = true;
        }

        if (args[0] == 'random') {
            armoRandom = true;
        }

        if (cantJugadores) {
            args.pop();
            maxJugadores = args.length;
            args.forEach(nick => {
                jugadores.push({
                    nick
                })
            })
            seJuega = true;
        }
        else {
            if (maxJugadores == jugadores.length) {
                seJuega = true;
            } else {
                mensaje = getEmbedMessage('Presta atencion lptm', 'warning', `todavia faltan ${cantFaltante()} platitas para armar el equipo`)
                message.channel.send({ embeds: [mensaje] });
            }
        }

        if (seJuega) {
            getEquipos(armoRandom);
            const mensajeEquipo1 = getMessageTeam1();
            const mensajeEquipo2 = getMessageTeam2();

            message.channel.send({ embeds: [mensajeEquipo1, mensajeEquipo2] });
        }
    },
};