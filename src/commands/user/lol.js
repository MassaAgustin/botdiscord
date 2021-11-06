const { associateLolAccount, userExists } = require("./functions/user");

module.exports = {
    name: "lol",
    description: "Crea una cuenta de lol, y la asocia a este usuario",
    async execute(client, message, args, discord) {

        try {

            if (args.length) {

                const { id, username } = message.author;
                const user = userExists(id);

                if (user) {
                    if (user.lol) {
                        message.channel.send(`${username.lol}, ya tienes una cuenta de lol creada.`);
                    } else {
                        const lolAccount = associateLolAccount(user._id, args[0]);

                        message.channel.send(`Cuenta de lol ${lolAccount.nickName} asociada a ${user.username}`);
                    }
                } else {
                    message.channel.send('Antes de crear una cuenta de lol, registrate con el comando !user');
                }
            }

        } catch (error) {
            console.log(error);
            message.channel.send('Error al crear cuenta de lol');
        }
    }
}