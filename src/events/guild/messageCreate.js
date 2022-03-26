require('dotenv').config();
const { GuildMemberRoleManager, RoleManager } = require('discord.js');
const { traducir } = require('../../commands/functions/message');

const prefix = process.env.PREFIX;
const ID_TEST = "947192633728598047";

const COMANDOS_LATAM_ATR = "949790656648339598";
const COMANDOS_TEST = "949711507032272916";
const canalesPermitidos = [COMANDOS_LATAM_ATR, COMANDOS_TEST];


const IDIOMA_EN = "EN";
const IDIOMA_PT = "PT";
const IDIOMAS_PERMITIDOS = [IDIOMA_EN, IDIOMA_PT];

module.exports = async (client, discord, message) => {

    /* const ambienteProduccion = process.env.npm_lifecycle_event != "dev";

    const canalDiscordDesarrollo = ID_TEST == message.channel.guild.id;
    const canalActual = message.channel.id;
    const canalComandos = canalesPermitidos.includes(canalActual); */


    /* if (ambienteProduccion) {
        if (canalDiscordDesarrollo) return message.channel.send("Instancia produccion");
        if (!canalComandos) return message.channel.send("Los comandos solo pueden usarse en el canal de comandos");
    }
    else {
        if (!canalDiscordDesarrollo) return message.channel.send("Instacia testeo (Arandi: 'se vienen cositas uwu')");
    } */

    //console.log(await message.author.send('Probando')); Para enviar mensajes privados al usuario (con el bot)

    //No seguimos si el mensaje es del bot
    if (message.author.bot) return;

    const memberHablaEN = message.member.roles.cache.some(r => r.name == IDIOMA_EN);
    const memberHablaPT = message.member.roles.cache.some(r => r.name == IDIOMA_PT);

    /* const roleManagerGuild = new GuildMemberRoleManager(message.member);
    const roleManager = new RoleManager(message.channel.guild);

    const roles = await roleManager.fetch();
    console.log(roles);

   const roleAdded = await roleManagerGuild.add('956903230460276796');

    console.log(roleAdded); */

    if (memberHablaEN && !message.mentions.users.length) {
        const traduccion = await traducir(message.content, IDIOMA_EN);
        message.react('👀');
        await message.reply({ content: `:flag_um: -> :flag_ar: ${traduccion}`, ephemeral: true });
    }

    if (memberHablaPT && !message.mentions.users.length) {
        const traduccion = await traducir(message.content, IDIOMA_PT);
        message.react('👀');
        await message.reply({ content: `:flag_br: -> :flag_ar: ${traduccion}`, ephemeral: true });
    }

    //No seguimos si el mensaje no está en el canal de comandos
    if (message.channel.name != "comandos") return;

    //Seguimos solo si se ejecuto con el prefijo configurado
    if (!message.content.startsWith(prefix)) return;

    const content = message.content.slice(prefix.length); //Removemos el prefijo.
    const args = content.trim().split(/ +/g); //Dividimos el string en un array con cada palabra.
    const command = args.shift().toLowerCase(); //Extraemos de los argumentos el comando en minusculas.
    const commandCalled = client.commands.get(command); //Obtenemos el comando que tenemos precargado, si no existe @returns null.

    if (!commandCalled) return message.channel.send("Este comando no existe");

    commandCalled.execute(client, message, args, discord);
}