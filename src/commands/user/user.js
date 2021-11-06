const { createUser, userExists } = require("./functions/user");

module.exports = {
    name: "user",
    description: "Crea un usuario",
    async execute(client, message, args, discord) {

        try {

            const { id, username } = message.author;
            const user = await userExists(id);

            if (user) {
                message.channel.send(`${username}, ya tienes una cuenta creada.`);
                message.channel.send(`Id: ${user.userID}`);
                message.channel.send(`User:${user.userName}`);

            } else {
                const newUser = await createUser(id, username);
                message.channel.send(`${username}, tu cuenta ha sido creada.`);
            }

        } catch (error) {
            console.log(error);
            message.channel.send('Error al crear el usuario');
        }
    }
}