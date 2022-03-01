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
                        console.log(user);
                        const mir4Account = associateMir4Account(user._id, args[0]);

                        message.channel.send(`Cuenta de mir4 ${mir4Account.nickName} asociada a ${user.username}`);
                    }
                } else {
                    message.channel.send('Antes de crear una cuenta de mir4, registrate con el comando !user');
                }
            }

        } catch (error) {
            console.log(error);
            message.channel.send('Error al crear cuenta de mir4');
        }
    }
}