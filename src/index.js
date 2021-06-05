const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot is ready as', client.user.tag);
});

client.on('message', (message) => {

    if (message.content === 'se pica') {
        message.reply('Se re pica :hot_face:');
        message.delete();
    }

})

client.login('ODUwNjI5ODg5Mjg2OTk1OTg4.YLsg0Q.hsoIMsU2LHDPiD1ZBDAJWvuMD_I');