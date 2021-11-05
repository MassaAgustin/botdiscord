const wait = require('util').promisify(setTimeout);

module.exports = async (client, discord, interaction) => {

    if (interaction.isCommand()) {

        const interactionCommand = client.slash.get(interaction.commandName);

        interaction.deferReply();
        wait(4000);

        try {
            interactionCommand.run(client, interaction);
        } catch (err) {
            console.log('Error al ejecutar el comando slash: ', err);
        }



        if (!interactionCommand) return interaction.followUp({ content: "Comando no registrado" });
    }
}