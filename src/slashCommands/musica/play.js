const youtubeDownload = require("ytdl-core");
const {
    AudioPlayerStatus,
    StreamType,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} = require("@discordjs/voice");

const { busquedaYoutube } = require("./utils/functions");

module.exports = {
    name: "play",
    description: "Reproduce una cancion",
    options: [
        {
            name: "cancion",
            description: "Nombre de la cancion",
            type: "STRING",
            required: true
        }
    ],
    run: async (client, interaction) => {

        try {
            const voiceChannel = interaction.member.voice.channel;

            if (!voiceChannel) {
                interaction.editReply({ content: "No estas en un canal de voz", ephemeral: true });
                return;
            }

            const videosEncontrados = await busquedaYoutube(interaction.options.getString("cancion"));

            if (!videosEncontrados) {
                interaction.editReply({ content: "No he encontrado ninguna cancion", ephemeral: true });
                return;
            }

            const streamVideo = youtubeDownload(videosEncontrados.url, { filter: "audioonly" });

            const connexionCanal = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            });

            const recursoAudio = createAudioResource(streamVideo, { inputType: StreamType.Arbitrary, inlineVolume: true });

            const reproductor = createAudioPlayer({ });

            reproductor.play(recursoAudio);
            connexionCanal.subscribe(reproductor);

            interaction.editReply({
                content: `Sonando: ${videosEncontrados.title}`
            });


            reproductor.on(AudioPlayerStatus.Idle, () => connexionCanal.destroy());
        } catch (error) {
            console.error('Error al ejecutar el comando play', error);
        }
    }
}