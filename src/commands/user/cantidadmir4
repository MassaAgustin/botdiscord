const { getCantidadUsuariosMir4 } = require("./functions/user");
const { getEmbedMessage } = require("../functions/message");

module.exports = {
    name: "cantidadmir4",
    description: "Obtiene las cuentas de mir4 que se han registrado",
    async execute(client, message, args, discord) {

        try {
            message.channel.send({ embeds: [getEmbedMessage(`Cantidad de cuentas mir4: ${await getCantidadUsuariosMir4()}`, 'success')] });

        } catch (error) {
            message.channel.send(`Error al obtener la cantidad de usuarios: ${error}`);
        }
    }
}