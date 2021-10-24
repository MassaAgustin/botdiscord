const fs = require("fs");

module.exports = (client, discord) => {
    //Devuelve todas las carpetas dentro de la carpeta commands y por cada una de ellas...
    fs.readdirSync("./src/commands/").forEach((dir) => {
        //Devuelvo todos los archivos js
        const filesJs = fs.readdirSync(`./src/commands/${dir}`).filter((file) => file.endsWith(".js"));

        for (const fileJs of filesJs) {
            //Extraemos el archivo en el cual estamos parado.
            const command = require(`../commands/${dir}/${fileJs}`);

            //Al cliente de discord añadimos el comando actual.
            if (command.name) client.commands.set(command.name, command);
        }
    })
}