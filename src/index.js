/* const { Client, MessageEmbed } = require('discord.js');
const config = require("../config.json");

const { connect, request, authenticate } = require('league-connect')

//INTRO BOT LA9
//Modularizar bien todo
//Llevar luego metodos similares a un archivo js distinto
//Por ahora usamos vars, luego si es necesario creamos una db en mongo o donde sea.

const clientD = new Client();
clientD.login(config.token);

const textImages = require('./constants/imageText');

var maxJugadores = '10';
var jugadores = [];
var equipo1 = [];
var equipo2 = [];

const mensaje = new MessageEmbed();
var mensajeEquipo1 = new MessageEmbed();
var mensajeEquipo2 = new MessageEmbed();
var listadoMessage = new MessageEmbed();

clientD.on('ready', () => {
    console.log('Bot is ready as', clientD.user.tag);
});

clientD.on('message', async (message) => {


    const { content, reply } = message;

    const args = message.content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    console.log(command)

    if (command === 'sepica') {

        setMensaje('Se re pica :hot_face:', 'RED', 'Escriban "quierofedear" los que quieran jugar')

        if (jugadores.length === maxJugadores) {
            setMensaje('Ya hay un partido en juego', 'RED', 'si desean otro "sepica reset"')
        }
        if (args[0] !== 'reset') {

            setMensaje(`Se cambio la cantidad maxima de jugadores por ${args[0]}`, 'RED', `antes: ${maxJugadores}`)
            maxJugadores = args[0]

        } else {
            setMensaje(`Equipo de ${maxJugadores} armado!`, 'RED', 'se re contra piko')
            jugadores = [];
            equipo1 = [];
            equipo2 = [];
        }

        message.channel.send(mensaje);
    }

    if (command === 'quierofedear') {

        const nickJugador = message.author.tag;
        const avatarJugador = message.author.avatarURL();

        if (jugadores.length !== maxJugadores) {
            if (!existeJugador(nickJugador)) {
                jugadores.push({
                    nick: nickJugador,
                    avatar: avatarJugador
                });
                setMensaje('Cargando Equipo', 'RED', `${jugadores.length}/${maxJugadores}`)
                message.channel.send(mensaje);
            } else {
                setMensaje('No vale repetir! ', 'RED', nickJugador);
                message.channel.send(mensaje);
            }
        } else {
            setMensaje(`Listo rancios ya estamos los ${maxJugadores}`, 'RED', 'Ahi van los equipos...');
            message.channel.send(mensaje)
        }
    }

    if (command === 'cuantosfaltan') {
        let cantFaltan = maxJugadores - jugadores.length;
        const description = `${cantFaltan} platitas`
        setMensaje('Vamooo que faltan: ', 'RED', description);
        message.channel.send(mensaje)
    }

    if (command === 'listarplatitas') {
        const seLista = listarPlatitas();
        seLista ? message.channel.send(listadoMessage) : message.channel.send(mensaje)
    }

    if (command === 'gg') {
        let messageText;

        if (args.length) {
            messageText = getImageTextById(args[0]);
        } else {
            messageText = getImageTextRandom();
        }
        message.delete()
        message.channel.send(messageText)
    }

    if (command == 'limpiar') {
        message.delete();
        args.length
            ? await message.channel.bulkDelete(args[0])
            : await message.channel.bulkDelete(1)
    }

    if (command == 'mostrarequipos') {
        getEquiposRandom();
        setMensajeEquipos();
        message.channel.send(mensajeEquipo1);
        message.channel.send(mensajeEquipo2);
    }

})

const setMensaje = (title, color, description) => {
    mensaje.setTitle(title);
    mensaje.setColor(color);
    mensaje.setDescription(description)
}

const setMensajeEquipos = () => {
    mensajeEquipo1 = new MessageEmbed();
    mensajeEquipo2 = new MessageEmbed();

    mensajeEquipo1.setTitle('Equipo 1');
    mensajeEquipo1.setColor('RED');

    mensajeEquipo2.setTitle('Equipo 2');
    mensajeEquipo2.setColor('BLUE');

    if (equipo1.length) {
        equipo1.forEach(player => {
            mensajeEquipo1.addField(`${player.nick}`, ':ok_hand: :white_check_mark:')
        })
    }

    console.log(equipo2)
    if (equipo2.length) {
        equipo2.forEach(player => {
            mensajeEquipo2.addField(`${player.nick}`, ':ok_hand: :white_check_mark:')
        })
    }

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

const getImageTextRandom = () => {

    const imagesLength = textImages.length;
    console.log(imagesLength)
    const random = (Math.round(Math.random() * imagesLength))
    return textImages[random];
}

const getImageTextById = (id) => {

    const imagesLength = textImages.length;
    if (id >= 0 && id < imagesLength) {
        return textImages[id]
    }
    return "No existe esa vaina";
}

const getEquiposRandom = () => {

    const mitadJugadores = Math.floor(maxJugadores / 2)

    while (equipo1.length != mitadJugadores) {
        const random = Math.floor(Math.random() * maxJugadores);
        console.log('nro random: ', random)
        console.log('nick jugador: ', jugadores[random])
        if (jugadores[random] !== 'listo') {
            equipo1.push(jugadores[random]);
            jugadores[random] = 'listo'
        }
        console.log('Equipo 1: ', equipo1)
    }

    jugadores.forEach((jugador, index) => {
        if (jugador !== 'listo') {
            equipo2.push(jugador)
        }
    })
    console.log('Equipo 2: ', equipo2)
} */