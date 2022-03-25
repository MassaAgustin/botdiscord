const ID_TEST = "947192633728598047";

const COMANDOS_LATAM_ATR = "949790656648339598";
const COMANDOS_TEST = "949711507032272916";
const canalesPermitidos = [COMANDOS_LATAM_ATR, COMANDOS_TEST];

module.exports = async (client, discord, interaction) => {

    if (!interaction.isCommand()) return;

    const ambienteProduccion = process.env.npm_lifecycle_event != "dev";

    const canalDiscordDesarrollo = ID_TEST == interaction.channel.guild.id;
    const canalActual = interaction.channel.id;
    const canalComandos = canalesPermitidos.includes(canalActual);


    if (ambienteProduccion) {
        if (!canalComandos) return interaction.reply("Los comandos solo pueden usarse en el canal de comandos");
        if (canalDiscordDesarrollo) return;
    }
    else {
        if (!canalComandos) return interaction.reply("Los comandos solo pueden usarse en el canal de comandos");
        if (!canalDiscordDesarrollo) return;
    }

    const interactionCommand = client.slash.get(interaction.commandName);

    if (!interactionCommand) return interaction.reply({ content: "Comando no registrado", ephemeral: true });

    try {
        interactionCommand.run(client, interaction);
    } catch (err) {
        console.log('Error al ejecutar el comando slash: ', err);
    }
}