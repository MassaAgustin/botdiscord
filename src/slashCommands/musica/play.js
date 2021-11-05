const play = require("play-dl");

const {
    AudioPlayerStatus,
    NoSubscriberBehavior,
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
                interaction.reply({ content: "No estas en un canal de voz", ephemeral: true });
                return;
            }

            const videosEncontrados = await busquedaYoutube(interaction.options.getString("cancion"));

            if (!videosEncontrados) {
                interaction.editReply({ content: "No he encontrado ninguna cancion", ephemeral: true });
                return;
            }

            const embed = {
                author: { name: "ElBicho DJ" },
                title: videosEncontrados.title,
                description: `${videosEncontrados.description}\n[LINK](${videosEncontrados.url})`,
                color: "RED",
                image: { url: `${videosEncontrados.thumbnail.url}` }
            };

            let streamAudio = await play.stream(videosEncontrados.url);

            const conexionCanal = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            let recursoAudio = createAudioResource(streamAudio.stream, {
                inputType: streamAudio.type
            });

            let reproductor = createAudioPlayer({
                behaviors: NoSubscriberBehavior.Play
            });

            reproductor.play(recursoAudio);

            conexionCanal.subscribe(reproductor);


            interaction.reply({
                embeds: [embed]
            });

            reproductor.on(AudioPlayerStatus.Idle, () => conexionCanal.destroy())
        } catch (error) {
            console.error('Error al ejecutar el comando play', error);
        }
    }
}