const config = require('../../assets/config/config.json');
const channels = require('../../assets/settings/b_channels.json');

module.exports.messageCreate = async ({message, bot}) => {
    if(message.webhookId && channels[message.guild.id] === message.channel.id) { 
        console.info('MessageCreate', new Date().toLocaleString('de-DE', {timeZone: 'Europe/Berlin'}));

        message.content = message.content.replace(/\n/g, ' ');
        let messageArray = message.content.split(" ");

        var users = [];
        
        for(let i in messageArray) {
            if(!isNaN(messageArray[i])) {
                pushUserId(messageArray[i]);
            }
        }

        function pushUserId(id) {
            try {
                var user_id = id.match(/\d/g);
            }catch(e) {}
            try {
                users.push(user_id.join(""));
            }catch(err){}
        }

        console.info('For Loop passed', users, new Date().toLocaleString('de-DE', {timeZone: 'Europe/Berlin'}));

        for(let i in users) {
            await message.guild.members.ban(users[i], {
                reason: "Banned by Blacklist"
            })
            .then(() => {
                console.info('User banned', users[i], new Date().toLocaleString('de-DE', {timeZone: 'Europe/Berlin'}));
                message.channel.send(`${users[i]} has been banned.`).catch(err => {
                    message.react('✅').catch(err => {});
                })
            })
            .catch(err => {
                console.info('ERRO WHILE BANNING', users[i], new Date().toLocaleString('de-DE', {timeZone: 'Europe/Berlin'}));
                if(err.httpStatus !== 404) console.log(err);
            });
        }

    }
}