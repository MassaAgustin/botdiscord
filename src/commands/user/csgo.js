const { associateCsgoAccount, userExists } = require("./functions/user");

module.exports = {
    name: "csgo",
    description: "Crea una cuenta de csgo, y la asocia a este usuario",
    async execute(client, message, args, discord) {

        try {

            if (args.length) {

                const { id, username } = message.author;
                const user = userExists(id);

                if (user) {
                    if (user.csgo) {
                        message.channel.send(`${username.csgo}, ya tienes una cuenta de csgo creada.`);
                    } else {
                        const csgoAccount = associateCsgoAccount(user._id, args[0]);

                        message.channel.send(`Cuenta de csgo ${csgoAccount.nickName} asociada a ${user.username}`);
                    }
                } else {
                    message.channel.send('Antes de crear una cuenta de csgo, registrate con el comando !user');
                }
            }

        } catch (error) {
            console.log(error);
            message.channel.send('Error al crear cuenta de csgo');
        }
    }
}