require('dotenv').config();
const { GuildMemberRoleManager, RoleManager } = require('discord.js');
const { traducir } = require('../../commands/functions/message');

const prefix = process.env.PREFIX;
const ID_TEST = "947192633728598047";

const COMANDOS_LATAM_ATR = "949790656648339598";
const COMANDOS_TEST = "949711507032272916";
const COMANDOS_LOVE_SA = "966366350266224641";
const canalesPermitidos = [COMANDOS_LATAM_ATR, COMANDOS_LOVE_SA, COMANDOS_TEST];


const IDIOMA_EN = "EN";
const IDIOMA_PT = "PT";
const IDIOMAS_PERMITIDOS = [IDIOMA_EN, IDIOMA_PT];

module.exports = async (client, discord, message) => {

    //console.log(await message.author.send('Probando')); Para enviar mensajes privados al usuario (con el bot)

    const canalActual = message.channel.id;
    const canalComandos = canalesPermitidos.includes(canalActual);

    if (!canalComandos) return message.channel.send("Los comandos solo pueden usarse en el canal de comandos");

    //No seguimos si el mensaje es del bot
    if (message.author.bot) return;

    const memberHablaEN = message.member.roles.cache.some(r => r.name == IDIOMA_EN);
    const memberHablaPT = message.member.roles.cache.some(r => r.name == IDIOMA_PT);

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

    if (!message.content.startsWith(prefix)) return;

    const content = message.content.slice(prefix.length); //Removemos el prefijo.
    const args = content.trim().split(/ +/g); //Dividimos el string en un array con cada palabra.
    const command = args.shift().toLowerCase(); //Extraemos de los argumentos el comando en minusculas.
    const commandCalled = client.commands.get(command); //Obtenemos el comando que tenemos precargado, si no existe @returns null.

    if (!commandCalled) return message.channel.send("Este comando no existe");

    commandCalled.execute(client, message, args, discord);
}