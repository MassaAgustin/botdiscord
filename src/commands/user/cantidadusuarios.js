const { getCantidadUsuarios } = require("./functions/user");
const { getEmbedMessage } = require("../functions/message");

module.exports = {
    name: "cantidadusuarios",
    description: "Obtiene todos los usuarios que se han registrado",
    async execute(client, message, args, discord) {

        try {
            message.channel.send({ embeds: [getEmbedMessage(`Cantidad de usuarios: ${await getCantidadUsuarios()}`, 'success')] });

        } catch (error) {
            message.channel.send(`Error al obtener la cantidad de usuarios: ${error}`);
        }
    }
}