const config = require('../../assets/config/config.json');

module.exports.messageCreate = async ({message, bot}) => {
    if(message.webhookId && message.channel.id === config.blacklist_channel) { 
        console.info('MessageCreate', new Date().toLocaleString('de-DE', {timeZone: 'Europe/Berlin'}));

        let messageArray = message.content.split(" ");

        for(let i in messageArray) {
            messageArray[i] = messageArray[i].replaceAll('\n', ' ');
            messageArray[i] = messageArray[i].split(" ")

            if(messageArray[i].length > 1) {
                for(let m in messageArray[i]) {
                    if(isNaN(messageArray[i][m])) {
                        delete messageArray[i][m];
                    }
                }
            }
        }

        var users = [];
        
        for(let i in messageArray) {
            if(messageArray[i].length > 1) {
                for(let m in messageArray[i]) {
                    if(!isNaN(messageArray[i][m])) {
                        pushUserId(messageArray[i][m]);
                    }
                }
            }else {
                if(!isNaN(messageArray[i])) {
                    pushUserId(messageArray[i]);
                }
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
                message.channel.send(`${users[i]} has been banned.`);
            })
            .catch(err => {
                console.info('ERRO WHILE BANNING', users[i], new Date().toLocaleString('de-DE', {timeZone: 'Europe/Berlin'}));
                if(err.httpStatus !== 404) console.log(err);
            });
        }

    }
}