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
                //message.channel.send(`${user.lol ? `nickLol: ${user.lol}` : 'Sin cuenta de lol'}`);
                //message.channel.send(`${user.csgo ? `nickCsgo: ${user.csgo}` : 'Sin cuenta de csgo'}`);
                //message.channel.send(`${user.axie ? `nickAxie: ${user.axie}` : 'Sin cuenta de axie'}`);
                message.channel.send(`${user.mir4 ? `nickMir4: ${user.mir4}` : 'Sin cuenta de mir4'}`);
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