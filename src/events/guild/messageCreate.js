require('dotenv').config();

const prefix = process.env.PREFIX;
const ID_TEST = "947192633728598047";

module.exports = async (client, discord, message) => {

    if (process.env.npm_lifecycle_event != "dev") {
        if (ID_TEST == message.channel.guild.id) return;

    } else if (ID_TEST != message.channel.guild.id) return;

    //No seguimos si el mensaje es del bot
    if (message.author.bot) return;

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