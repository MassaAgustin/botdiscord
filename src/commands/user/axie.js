const { associateCsgoAccount, userExists } = require("./functions/user");

module.exports = {
    name: "axie",
    description: "Crea una cuenta de axie, y la asocia a este usuario",
    async execute(client, message, args, discord) {

        try {

            if (args.length) {

                const { id, username } = message.author;
                const user = userExists(id);

                if (user) {
                    if (user.axie) {
                        message.channel.send(`${username.axie}, ya tienes una cuenta de axie creada.`);
                    } else {
                        const axieAccount = associateAxieAccount(user._id, args[0]);

                        message.channel.send(`Cuenta de axie ${axieAccount.nickName} asociada a ${user.username}`);
                    }
                } else {
                    message.channel.send('Antes de crear una cuenta de axie, registrate con el comando !user');
                }
            }

        } catch (error) {
            console.log(error);
            message.channel.send('Error al crear cuenta de axie');
        }
    }
}