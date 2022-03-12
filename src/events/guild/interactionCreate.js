const ID_TEST = "947192633728598047";

module.exports = async (client, discord, interaction) => {

    if (!interaction.isCommand()) return;

    if (process.env.npm_lifecycle_event != "dev") {
        if (ID_TEST == interaction.channel.guild.id) return;

    } else if (ID_TEST != interaction.channel.guild.id) return;

    const interactionCommand = client.slash.get(interaction.commandName);

    if (!interactionCommand) return interaction.reply({ content: "Comando no registrado", ephemeral: true });

    try {
        interactionCommand.run(client, interaction);
    } catch (err) {
        console.log('Error al ejecutar el comando slash: ', err);
    }
}