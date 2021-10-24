const { MessageEmbed } = require("discord.js");
const { maxJugadores, jugadores, equipo1, equipo2 } = require("./vars");
const { getEmbedMessage } = require("../../functions/message");

/**
 * @author Agus Massa
 * @version 1.0
 * @returns Integer - Devuelve la cantidad de jugadores que faltan para completar los equipos
 */
const cantFaltante = () => {
    return (maxJugadores - jugadores.length)
}

/**
 * @author Agus Massa
 * @version 1.0
 * @brief Realiza un borrado de los equipos y jugadores.
 */
const resetEquipos = () => {
    jugadores = [];
    equipo1.jugadores = [];
    equipo2.jugadores = [];
}

/**
 * @author Agus Massa
 * @version 1.0
 * @returns MessageEmbed - Devuelve una descripcion de todos los jugadores que hay actualmente
 */
const listarPlatitas = () => {

    let message = new MessageEmbed();

    if (jugadores.length) {
        message.setTitle('El ultimo...');
        message.setColor('GOLD');
        message.setFooter('Le debe una birrita al primero');
        jugadores.forEach((jugador, index) => {
            const indexFix = index + 1;
            message.addField(`${indexFix}. ${jugador.nick} :grey_exclamation:`, ':ok_hand: :white_check_mark:')
        })
    } else {
        message = getEmbedMessage('Todavia no hay ningun platita', 'warning', ':rage: :rage: :rage:');
    }

    return message;
}

/**
 * @author Agus Massa
 * @version 1.0
 * @param {*} esRandom Boolean - Indica si los equipos se van a armar al azar o no
 */
const getEquipos = (esRandom) => {

    const mitadJugadores = Math.floor(maxJugadores / 2)

    if (esRandom) {
        while (equipo1.jugadores.length != mitadJugadores) {
            const random = Math.floor(Math.random() * maxJugadores);
            if (jugadores[random] !== 'listo') {
                equipo1.jugadores.push(jugadores[random]);
                jugadores[random] = 'listo'
            }
        }

        jugadores.forEach((jugador, index) => {
            if (jugador !== 'listo') {
                equipo2.jugadores.push(jugador)
            }
        })
    } else {
        let i = 0;
        while (equipo1.jugadores.length != mitadJugadores) {
            equipo1.jugadores.push(jugadores[i])
            i = i + 1;
        }

        while (equipo2.jugadores.length != mitadJugadores) {
            equipo2.jugadores.push(jugadores[i])
            i = i + 1;
        }
    }
}

/**
 * @author Agus Massa
 * @version 1.0
 * @param {*} jugador Object - tipo jugador
 * @returns Boolean - true si el jugador existe de lo contrario false
 */
const existeJugador = (jugador) => {
    let existe = false;
    jugadores.forEach(player => {
        if (player.nick === jugador) {
            existe = true
        }
    })

    return existe;
}

module.exports = {
    cantFaltante,
    resetEquipos,
    listarPlatitas,
    getEquipos,
    existeJugador,
}