const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

/**
 * @author Agus Massa
 * @version 1.0
 * @param {*} title String - Texto que forma parte del encabezado (letra grande) - "Ejemplo Titulo"
 * @param {*} color String - Color del cuerpo del mensaje - "success" | "warning" | "red"
 * @param {*} description String - Texto que forma parte del cuerpo (letra chica) - "ejemplo descripcion"
 * @returns MessageEmbed - Con la especificacion que se le indico en los parametros
 */

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getEmbedMessage = (title, color, description = null, rows = null) => {

    const mensaje = new MessageEmbed();

    let messageType = 'RED';

    switch (color) {
        case 'success':
            messageType = 'GREEN';
            break;

        case 'warning':
            messageType = 'ORANGE';
            break;

        case 'error':
            messageType = 'RED';
            break;

        default:
            break;
    }
    mensaje.setTitle(title);
    mensaje.setColor(messageType);
    if (description) mensaje.setDescription(description)


    if (rows) {
        rows = Object.entries(rows)[2][1];
        Object.entries(rows)
            .forEach(([key, value]) => {
                if (typeof value == 'object' && key != 'clan') {
                    const date = new Date(value);
                    value = `${date.toLocaleDateString('es-ES')} a las ${date.toLocaleTimeString('es-ES')}`;
                } else {
                    if (key == 'clan') {
                        value = value.nombre;
                    }
                }
                mensaje.addField(`${capitalizeFirstLetter(key)}`, `${value}`);
            });
    }

    return mensaje;
}

/**
 * @author Agus Massa
 * @version 1.0
 * @returns MessageEmbed - Una lista formada por los jugadores del equipo 1
 */
const getMessageTeam1 = () => {
    messageTeam1 = new discord.MessageEmbed();

    messageTeam1.setTitle(equipo1.name);
    messageTeam1.setColor('BLURPLE');

    if (equipo1.jugadores.length) {
        equipo1.jugadores.forEach(player => {
            messageTeam1.addField(`${player.nick}`, ':ok_hand: :white_check_mark:')
        })
    }

    return messageTeam1;
}

/**
 * @author Agus Massa
 * @version 1.0
 * @returns MessageEmbed - Una lista formada por los jugadores del equipo 2
 */
const getMessageTeam2 = () => {
    messageTeam2 = new discord.MessageEmbed();

    messageTeam2.setTitle(equipo2.name);
    messageTeam2.setColor('GREYPLE');

    if (equipo2.jugadores.length) {
        equipo2.jugadores.forEach(player => {
            messageTeam2.addField(`${player.nick}`, ':ok_hand: :white_check_mark:')
        })
    }

    return messageTeam2;
}


const traducir = (textoParaTraducir, lenguaOrigen) => {

    const lenguaDestino = 'ES';

    let url = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${lenguaDestino}&api-version=3.0&from=${lenguaOrigen}&profanityAction=NoAction&textType=plain&suggestedFrom=${lenguaOrigen}`;

    let options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
            'X-RapidAPI-Key': 'd80186381fmshebc8277d30abb25p186076jsna560837f30db'
        },
        body: `[{"Text":"${textoParaTraducir}"}]`
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(res => res[0].translations[0].text)
}



module.exports = {
    getEmbedMessage,
    getMessageTeam1,
    getMessageTeam2,
    traducir
}