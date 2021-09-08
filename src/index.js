const { Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const config = require("../config.json");
const clientD = new Client();
const disbutton = require('discord-buttons');
disbutton(clientD);

const url = `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${config.namePlayer}?api_key=${config.api_key_lol}`

fetch(url)
    .then(function (response) {
        response.json()
            .then(res => {
                console.log(res)
            })
    }).catch(function (error) {
        console.log('Request failed', error)
    });

//INTRO BOT LA9
//Modularizar bien todo
//Llevar luego metodos similares a un archivo js distinto
//Por ahora usamos vars, luego si es necesario creamos una db en mongo o donde sea.

const textImages = require('./constants/imageText');

var maxJugadores = 10;
var jugadores = [];
var equipo1 = {
    jugadores: [],
    name: 'Equipo 1'
};
var equipo2 = {
    jugadores: [],
    name: 'Equipo 2'
};

var buttonMessage = new disbutton.MessageButton();
const mensaje = new MessageEmbed();
var mensajeEquipo1 = new MessageEmbed();
var mensajeEquipo2 = new MessageEmbed();
var listadoMessage = new MessageEmbed();

var lastMessage = '';
clientD.login(config.token);

clientD.on('ready', () => {
    console.log('Bot is ready as', clientD.user.tag);
});

clientD.on('clickButton', async (button) => {

    if (button.clicker.user.id === lastMessage.author.id) {
        await button.reply.send(`Equipo de ${maxJugadores} reseteado!`)
    } else {
        await button.reply.send(`Propiedad de ${lastMessage.author.tag}`)
    }
})

clientD.on('message', async (message) => {

    if (message.author.tag != 'ElBicho#2083') {
        lastMessage = message;
    }

    const { content } = message;

    const args = content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    console.log('Comando ejecutado', command)

    //Para crear un partido con maxJugadores
    if (command === 'sepica') {
        let parametro = args[0];

        if (jugadores.length === maxJugadores) {
            setMensaje('Ya hay un partido en juego', 'warning', 'si quieren otro jodanse ndeah');
            message.channel.send(mensaje);
        }
        if (parametro !== 'reset') {

            setMensaje(`Se cambio la cantidad maxima de jugadores por ${parametro}`, 'success', `antes: ${maxJugadores}`);
            parametro = Number(args[0]);
            (typeof parametro === 'number')
                ? maxJugadores = parametro
                : setMensaje('Not today Prietto jeje', 'danger', 'el parametro tiene que ser un numero')

            message.channel.send(mensaje);
        } else {
            buttonMessage
                .setStyle('red')
                .setLabel('Reiniciar equipo')
                .setID('button_reiniciar_equipo');

            message.channel.send('Estas seguro que deseas reiniciar el match?', buttonMessage);
        }
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
            : await message.channel.bulkDelete(1);
    }

    if (command == 'txt') {

        const parametros = args;
        let messageText = '';

        if (parametros.length) {
            args.forEach(arg => {
                for (let index = 0; index < arg.length; index++) {
                    const element = arg.charAt(index);
                    const currentIcon = `:regional_indicator_${element}:`;
                    messageText = messageText.concat(currentIcon);
                }
            })
            messageText = messageText.concat(' ');
        }
        message.channel.bulkDelete(1);
        console.log({ messageText });
        message.channel.send(messageText);
    }

    //Arma un equipo random con la lista de jugadores, tambien se le puede pasar un array con todos los jugadores
    if (command == 'armarequipo') {
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

    if (command == 'mostrarequipos') {
        setMensajeEquipos();
        message.channel.send(mensajeEquipo1);
        message.channel.send(mensajeEquipo2);
    }

    if (command == 'comandoshelp') {
        const mensajeComandos = new MessageEmbed();
        mensajeComandos.setTitle('Listado de comandos disponibles');
        mensajeComandos.addFields([
            { name: 'sepica x', value: 'Arma un equipo para inscribir a x cantidad de jugadores' },
            { name: 'sepica reset', value: 'Elimina todos los jugadores en la cola y arma uno nuevo' },
            { name: 'quierofedear', value: 'Te une a la cola' },
            { name: 'cuantosfaltan', value: 'Te indica la cantidad de jugadores que faltan para armar un equipo' },
            { name: 'listarplatitas', value: 'Te muestra los jugadores que se encuentran en cola' },
            { name: 'gg', value: 'Devuelve un fasilito random' },
            { name: 'gg x', value: 'Devuelve un fasilito en particular' },
            { name: 'armarequipo', value: 'Arma un equipo con los jugadores que esten en la cola' },
            { name: 'armarequipo random', value: 'Same de arriba pero random' },
            { name: 'armarequipo []', value: 'Arma un equipo con los jugadores pasados entre espacios' },
            { name: 'armarequipo [] random', value: 'Same de arriba pero random' },
            { name: 'mostrarequipos', value: 'Muestra los dos equipos' }
        ])

        message.channel.send(mensajeComandos);
    }

    if (command == 'opgg') {
        const playerActual = getNickName(message.author.tag)
        setMensaje('Op gg', 'success', getStatsOpGg(playerActual))
        message.channel.send(mensaje);
    }

    if (command == 'poro') {
        const playerActual = getNickName(message.author.tag)
        setMensaje('Porofessor: ', 'success', getStatsPoro(playerActual))
        message.channel.send(mensaje);
    }

    if (command == 'equipo1') {
        let parametro = args[0];
        equipo1.name = parametro
    }

    if (command == 'equipo2') {
        let parametro = args[0];
        equipo2.name = parametro
    }
})

const getNickName = (player) => {

    const defaultNick = "not found";

    const nicksDiscord = {
        Ruffex: "Ruffex",
        Lebi: "Lebi",
        FrostBeniusAM: "FrostBenius",
        Wyers: "Wyers",
        "Joaco.mas": "Joaco Purrum",
        rdmarcos49: "truuck",
        Chacha: "El Cogollos",
        Guichi: "EL BICHO",
        Dijkstra: "",
        ELECHEE: "ECHOR",
        UnluckyBoy: "UnluckyBoy",
        "Prison Mike": "Dwight K Shrute"
    }

    const nickLol = nicksDiscord[player.substr(0, player.length - 5)] || defaultNick;

    return nickLol;
}

const getStatsOpGg = (player) => {
    return `https://las.op.gg/summoner/userName=${player}`
}

const getStatsPoro = (player) => {
    return `https://porofessor.gg/live/las/${player}`
}

const cantFaltante = () => {
    return (maxJugadores - jugadores.length)
}

const resetEquipos = () => {
    jugadores = [];
    equipo1.jugadores = [];
    equipo2.jugadores = [];
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

    mensajeEquipo1.setTitle(equipo1.name);
    mensajeEquipo1.setColor('BLURPLE');

    mensajeEquipo2.setTitle(equipo2.name);
    mensajeEquipo2.setColor('GREYPLE');

    if (equipo1.jugadores.length) {
        equipo1.jugadores.forEach(player => {
            mensajeEquipo1.addField(`${player.nick}`, ':ok_hand: :white_check_mark:')
        })
    }

    if (equipo2.jugadores.length) {
        equipo2.jugadores.forEach(player => {
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