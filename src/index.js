const { Client, MessageEmbed } = require('discord.js');
const config = require("../config.json");
const { forEach } = require('./constants/imageText');

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


    const { content } = message;

    const args = content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    console.log('Comando ejecutado', command)

    //Para crear un partido con maxJugadores
    if (command === 'sepica') {
        let parametro = args[0];

        if (jugadores.length === maxJugadores) {
            setMensaje('Ya hay un partido en juego', 'warning', 'si quieren otro jodanse ndeah')
        }
        if (parametro !== 'reset') {

            setMensaje(`Se cambio la cantidad maxima de jugadores por ${parametro}`, 'success', `antes: ${maxJugadores}`);
            parametro = Number(args[0])
            (typeof parametro === 'number')
                ? maxJugadores = parametro
                : setMensaje('Not today Prietto jeje', 'danger', 'el parametro tiene que ser un numero')

        } else {
            setMensaje(`Equipo de ${maxJugadores} reseteado!`, 'success', '"tiren quierofedear"')
            resetEquipos()
        }

        message.channel.send(mensaje);
    }

    //Para entrar en cola de un partido
    if (command === 'quierofedear') {

        const nickJugador = message.author.tag;
        const avatarJugador = message.author.avatarURL();

        if (jugadores.length !== maxJugadores) {
            if (!existeJugador(nickJugador)) {
                jugadores.push({
                    nick: nickJugador,
                    avatar: avatarJugador
                });
                setMensaje('En cola', 'success', `${jugadores.length}/${maxJugadores}`)
                message.channel.send(mensaje);
            } else {
                setMensaje('No vale repetir! ', 'warning', nickJugador);
                message.channel.send(mensaje);
            }
        } else {
            setMensaje(`Listo rancios ya estamos los ${maxJugadores}`, 'success', '"armarequipos" tiren ahora pa');
            message.channel.send(mensaje)
        }
    }

    //Para mostrar cuantos jugadores faltan para completar el partido
    if (command === 'cuantosfaltan') {

        const description = `${cantFaltante()} platitas`
        setMensaje('Vamooo\' que faltan: ', 'success', description);
        message.channel.send(mensaje)
    }

    //Para listar los jugadores que hay en cola
    if (command === 'listarplatitas') {
        const seLista = listarPlatitas();
        seLista ? message.channel.send(listadoMessage) : message.channel.send(mensaje)
    }

    //Devuelve un simbolo random o por parametro
    if (command === 'gg') {
        let messageText;
        const parametro = Number(args[0]);

        if (args.length && typeof parametro === 'number') {
            messageText = getImageTextById(parametro);
        } else {
            messageText = getImageTextRandom();
        }
        message.delete()
        message.channel.send(messageText)
    }

    //Limpia el chat, se le puede pasar un argumento
    if (command == 'limpiar') {

        const parametro = Number(args[0]);

        (args.length && typeof parametro === 'number')
            ? await message.channel.bulkDelete(parametro)
            : await message.channel.bulkDelete(1)
    }

    //Arma un equipo random con la lista de jugadores, tambien se le puede pasar un array con todos los jugadores
    if (command == 'armarequipo') {
        let seJuega = false;
        const cantJugadores = args.length;
        let armoRandom = false;

        if (args[cantJugadores] === 'random') {
            armoRandom = true;
            jugadores.pop();
        }

        if (cantJugadores) {
            maxJugadores = args.length;
            resetEquipos();
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
                setMensaje('Presta atencion lptm', 'warning', `todavia faltan ${cantFaltante()} platitas para armar el equipo`)
                message.channel.send(mensaje);
            }
        }

        if (seJuega) {
            getEquipos(armoRandom);
            setMensajeEquipos();
            message.channel.send(mensajeEquipo1);
            message.channel.send(mensajeEquipo2);
        }
    }

})

const cantFaltante = () => {
    return (maxJugadores - jugadores.length)
}

const resetEquipos = () => {
    jugadores = [];
    equipo1 = [];
    equipo2 = [];
}

const setMensaje = (title, color, description) => {

    let messageType = 'RED';

    switch (color) {
        case 'success':
            messageType = 'GREEN';
            break;

        case 'success':
            messageType = 'ORANGE';
            break;

        case 'success':
            messageType = 'RED';
            break;

        default:
            break;
    }
    mensaje.setTitle(title);
    mensaje.setColor(messageType);
    mensaje.setDescription(description)
}

const setMensajeEquipos = () => {
    mensajeEquipo1 = new MessageEmbed();
    mensajeEquipo2 = new MessageEmbed();

    mensajeEquipo1.setTitle('Equipo 1');
    mensajeEquipo1.setColor('BLURPLE');

    mensajeEquipo2.setTitle('Equipo 2');
    mensajeEquipo2.setColor('GREYPLE');

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
        listadoMessage.setColor('GOLD');
        listadoMessage.setFooter('Le debe una birrita al primero');
        jugadores.forEach((jugador, index) => {
            const indexFix = index + 1;
            listadoMessage.addField(`${indexFix}. ${jugador.nick} :grey_exclamation:`, ':ok_hand: :white_check_mark:')
        })
        return true;
    } else {
        setMensaje('Todavia no hay ningun platita', 'warning', ':rage: :rage: :rage:');
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

    const random = (Math.round(Math.random() * imagesLength))
    return textImages[random];
}

const getImageTextById = (id) => {

    const imagesLength = textImages.length;
    if (id >= 0 && id < imagesLength) {
        return textImages[id]
    }
    return "No existe s fasilito";
}

const getEquipos = (esRandom) => {

    const mitadJugadores = Math.floor(maxJugadores / 2)

    if (esRandom) {
        while (equipo1.length != mitadJugadores) {
            const random = Math.floor(Math.random() * maxJugadores);
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
    } else {
        let i = 0;
        while (equipo1.length != mitadJugadores) {
            equipo1.push(jugadores[i])
            i = i + 1;
        }

        while (equipo2.length != mitadJugadores) {
            equipo2.push(jugadores[i])
            i = i + 1;
        }
    }
}