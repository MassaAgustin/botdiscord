const wait = require('util').promisify(setTimeout);

module.exports = async (client, discord, interaction) => {

    if (!interaction.isCommand()) return;
    if (!interaction.isGuild()) return interaction.reply('Este comando solo puede ser utilizado en un server');

    const interactionCommand = client.slash.get(interaction.commandName);

    if (!interactionCommand) return interaction.reply("Comando no registrado");

      try {
        interactionCommand.run(client, interaction);
    } catch (err) {
        console.log('Error al ejecutar el comando slash: ', err);
    }


}