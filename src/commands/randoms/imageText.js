const { getImageTextById, getImageTextRandom } = require("../functions/randoms");

module.exports = {
    name: "gg",
    description: "Devuelve una imagen en forma de caracteres",
    async execute(client, message, args, discord) {

        let messageText;
        const parametro = Number(args[0]);

        if (args.length && typeof parametro === 'number') {
            messageText = getImageTextById(parametro);
        } else {
            messageText = getImageTextRandom();
        }
        message.delete()
        message.channel.send(messageText)
    },
};

