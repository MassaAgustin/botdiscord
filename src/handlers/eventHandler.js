const fs = require("fs");

module.exports = (client, discord, message) => {

    //Devuelve todas las carpetas dentro de la carpeta events y por cada una de ellas...
    fs.readdirSync("./src/events/").forEach((dir) => {
        //Devuelvo todos los archivos js
        const filesJs = fs.readdirSync(`./src/events/${dir}`).filter((file) => file.endsWith(".js"));

        for (const fileJs of filesJs) {

            try {
                //Extraemos el archivo en el cual estamos parado.
                const event = require(`../events/${dir}/${fileJs}`);
                event.event = event.event || fileJs.replace(".js", "");

                //Al cliente de discord le bindeamos el evento actual.
                client.on(event.event, event.bind(client, discord, message));
            } catch (err) {
                console.log(err);
            }
        }
    })
};