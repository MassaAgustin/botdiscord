const { Client, MessageEmbed } = require('discord.js');
const config = require("../config.json");

const client = new Client();
client.login(config.token);


var jugadores = [];
var equipo1 = [];
var equipo2 = [];

const mensaje = new MessageEmbed();
var listadoMessage = new MessageEmbed();

client.on('ready', () => {
    console.log('Bot is ready as', client.user.tag);
});

client.on('message', (message) => {

    const { content, reply } = message;

    console.log(content)

    if (content === 'se pica') {

        if (jugadores.length === 10) {
            jugadores = []
            equipo1 = []
            equipo2 = []
        }

        setMensaje('Se re pica :hot_face:', 'RED', 'Escriban "quiero fedear" los que quieran jugar')
        message.channel.send(mensaje);
    }

    if (content === 'quiero fedear') {

        const nickJugador = message.author.tag;
        const avatarJugador = message.author.avatarURL();

        if (jugadores.length !== 10) {
            if (!existeJugador(nickJugador)) {
                jugadores.push({
                    nick: nickJugador,
                    avatar: avatarJugador
                });
                setMensaje('Cargando Equipo', 'RED', `${jugadores.length}/10`)
                message.channel.send(mensaje);
            } else {
                setMensaje('No vale repetir! ', 'RED', nickJugador);
                message.channel.send(mensaje);
            }
        } else {
            getEquiposRandom();
            setMensaje('Listo rancios ya estamos los 10', 'RED', 'Ahi van los equipos');
            console.log(equipo1);
            console.log(equipo2);
            message.channel.send(mensaje)
        }
    }

    if (content === 'cuantos faltan') {
        let cantFaltan = 10 - jugadores.length;
        const description = `${cantFaltan} platitas`
        setMensaje('Vamooo que faltan: ', 'RED', description);
        message.channel.send(mensaje)
    }

    if (content === 'listar platitas') {
        const seLista = listarPlatitas();
        seLista ? message.channel.send(listadoMessage) : message.channel.send(mensaje)
    }

})

const setMensaje = (title, color, description) => {
    mensaje.setTitle(title);
    mensaje.setColor(color);
    mensaje.setDescription(description)
}

const listarPlatitas = () => {
    if (jugadores.length) {
        listadoMessage = new MessageEmbed();
        listadoMessage.setTitle('El ultimo...');
        listadoMessage.setColor('RED');
        jugadores.forEach((jugador, index) => {
            const indexFix = index + 1;
            listadoMessage.addField(`${indexFix}. ${jugador.nick} :grey_exclamation:`, ':ok_hand: :white_check_mark:')
        })
        return true;
    } else {
        setMensaje('Todavia no hay ningun platita', 'RED', ':rage: :rage: :rage:');
        return false;
    }
}

const existeJugador = (jugador) => {
    let existe = false;
    jugadores.forEach(player => {
        if (player.nick === jugador) {
            existe = true
        }
    })

    return existe;
}

const getEquiposRandom = () => {

    while (equipo1.length != 5) {
        const random = (Math.random() * 10);

        if (jugadores[random] !== 'listo') {
            equipo1.push(jugadores[random]);
            jugadores[random] = 'listo'
        }
    }

    jugadores.forEach((jugador, index) => {
        if (jugador !== 'listo') {
            equipo2.push(jugador)
        }
    })
}