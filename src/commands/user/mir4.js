const { associateMir4Account, userExists } = require("./functions/user");

module.exports = {
    name: "mir4",
    description: "Crea una cuenta de mir4, y la asocia a este usuario",
    async execute(client, message, args, discord) {

        try {

            if (args.length) {

                const { id, username } = message.author;
                const user = await userExists(id);

                if (user) {
                    if (user.mir4) {
                        message.channel.send(`${username.mir4}, ya tienes una cuenta de mir4 creada.`);
                    } else {
                        associateMir4Account(user, args[0]);

                        message.channel.send(`Cuenta de mir4 asociada`);
                    }
                } else {
                    message.channel.send('Antes de crear una cuenta de mir4, registrate con el comando !user');
                }
            } else {
                message.channel.send('Comando válido: !mir4 Nickname');
            }

        } catch (error) {
            message.channel.send('Error al crear cuenta de mir4');
        }
    }
}