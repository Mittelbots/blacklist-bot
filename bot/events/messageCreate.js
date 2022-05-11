const config = require('../../assets/config/config.json');

module.exports.messageCreate = async ({message, bot}) => {
    if(message.webhookId && message.channel.id === config.blacklist_channel) {
        let messageArray = message.content.split(" ");

        var users = [];
        
        for(let i in messageArray) {
            if(!isNaN(messageArray[i])) {
                let user_id = messageArray[i].match(/\d/g);
                users.push(user_id.join(""));
            }
        }

        for(let i in users) {
            await message.guild.members.ban(users[i], {
                reason: "Banned by Blacklist"
            })
            .then(() => {
                message.channel.send(`${users[i]} has been banned.`);
            })
            .catch(err => {
                if(err.httpStatus !== 404) console.log(err);
            });
        }

    }else return;
}