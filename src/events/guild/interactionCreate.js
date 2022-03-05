
module.exports = async (client, discord, interaction) => {

    if (!interaction.isCommand()) return;

    const interactionCommand = client.slash.get(interaction.commandName);

    if (!interactionCommand) return interaction.reply({ content: "Comando no registrado", ephemeral: true });

      try {
        interactionCommand.run(client, interaction);
    } catch (err) {
        console.log('Error al ejecutar el comando slash: ', err);
    }
}