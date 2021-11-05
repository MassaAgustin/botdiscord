const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: "pause",
    description: "Pausa la canción actual.",
    run: async (client, interaction) => {

        const voiceChannel = interaction.member.voice.channel;
        const voiceConnection = getVoiceConnection(interaction.guild.id);

        if (!voiceChannel) {
            interaction.reply({ content: "No estas en un canal de voz", ephemeral: true });
            return;
        }

        if (!voiceConnection) {
            interaction.editReply({ content: "El bot no está reproduciendo musica", ephemeral: true });
        }

        if (voiceChannel != voiceConnection.joinConfig.channelId) {
            interaction.editReply({ content: "No estas en el mismo canal de voz", ephemeral: true });
            return;
        }

        const reproductor = voiceConnection.state.subscription.player;

        reproductor.pause();

        interaction.editReply({ content: "Musica en pausa", ephemeral: true });
    }
}