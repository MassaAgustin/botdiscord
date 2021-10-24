const { getCurrentIcon } = require("../functions/randoms");

module.exports = {
    name: "txt",
    description: "Dado un texto devuelve el mismo pero transformado si es posible",
    async execute(client, message, args, discord) {

        const parametros = args;
        let messageText = '';

        if (parametros.length) {
            args.forEach(arg => {
                for (let index = 0; index < arg.length; index++) {
                    const char = arg.charAt(index).toLowerCase();
                    const charCode = arg.charCodeAt(index);
                    const currentIcon = getCurrentIcon(charCode, char);

                    messageText = messageText.concat(currentIcon);
                }
                messageText = messageText.concat(' ');
            })
        }
        message.channel.bulkDelete(1).then(res => {
            message.channel.send(messageText);
        });
    },
};