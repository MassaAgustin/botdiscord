const { Client, MessageEmbed, MessageCollector } = require('discord.js');
const client = new Client();

const config = require("../config.json");

var jugadores = [];
var equipo1 = [];
var equipo2 = [];

const mensaje = new MessageEmbed();

client.on('ready', () => {
    console.log('Bot is ready as', client.user.tag);
});

client.on('message', (message) => {

    const { content, reply } = message;

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
        if (jugadores.length !== 10) {
            if (!existeJugador(nickJugador)) {
                jugadores.push(nickJugador);
                setMensaje('Cargando Equipo', 'RED', `${jugadores.length}/10`)
                message.channel.send(mensaje);
            } else {
                setMensaje('No vale repetir! ', 'RED', nickJugador);
                message.channel.send(mensaje);
            }


        } else {
            getEquiposRandom();
            setMensaje('Listo rancios ya estamos los 10', 'RED', 'Ahora les paso los equipos');
            console.log(equipo1);
            console.log(equipo2);
            message.channel.send(mensaje)
        }
    }

    if (content.includes('faltan')){
        const cantFaltan = 10 - jugadores.length;
        mensaje.setTitle('Vamooo que faltan: ', 'RED', `${cantFaltan}`);
    }
})

const setMensaje = (title, color, description) => {
    mensaje.setTitle(title);
    mensaje.setColor(color);
    mensaje.setDescription(description)
}

const existeJugador = (jugador) => {
    let existe = false;
    jugadores.forEach(player => {
        if (player === jugador) {
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

client.login(config.token);