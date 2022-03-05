module.exports = {
    name: "mir4",
    description: "Permite actualizar tus datos de mir4",
    options: [
        {
            name: "nickname",
            description: "Nickname de tu cuenta de mir4",
            type: "STRING",
            required: true
        },
        {
            name: "poder",
            description: "Poder de tu cuenta de mir4",
            type: "NUMBER",
            required: false
        },
        {
            name: "nivel",
            description: "Nivel de tu cuenta de mir4",
            type: "NUMBER",
            required: false
        },
        {
            name: "clase",
            description: "Clase de tu cuenta de mir4",
            type: "STRING",
            required: false
        },
        {
            name: "subclase",
            description: "Subclase de tu cuenta de mir4",
            type: "STRING",
            required: false
        }
    ],
    run: async (client, interaction) => {

        console.log({ client });
        console.log({ interaction });
        /* if (!voiceChannel) {
            interaction.reply({ content: "No estas en un canal de voz", ephemeral: true });
            return;
        } */

        interaction.reply({ content: "Actualizado correctamente", ephemeral: true });
    }
}