const config = require('../../assets/config/config.json');

module.exports.messageCreate = ({message, bot}) => {
    if(message.webhookId && message.channel.id === config.blacklist_channel) {
        console.info('MessageCreate', new Date().toLocaleString('de-DE', {timeZone: 'Europe/Berlin'}));

        let messageArray = message.content.split(" ");

        var users = [];
        
        for(let i in messageArray) {
            if(!isNaN(messageArray[i])) {
                let user_id = messageArray[i].match(/\d/g);
                try {
                    users.push(user_id.join(""));
                }catch(err){}
            }
        }

        console.info('For Loop passed', users, new Date().toLocaleString('de-DE', {timeZone: 'Europe/Berlin'}));

        for(let i in users) {
            message.guild.members.ban(users[i], {
                reason: "Banned by Blacklist"
            })
            .then(() => {
                console.info('User banned', users[i], new Date().toLocaleString('de-DE', {timeZone: 'Europe/Berlin'}));
                message.channel.send(`${users[i]} has been banned.`);
            })
            .catch(err => {
                console.info('ERRO WHILE BANNING', users[i], new Date().toLocaleString('de-DE', {timeZone: 'Europe/Berlin'}));
                if(err.httpStatus !== 404) console.log(err);
            });
        }

    }
}