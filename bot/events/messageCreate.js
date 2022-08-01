const fs = require('fs')
module.exports.messageCreate = async ({
    message,
    bot
}) => {

    if (message.webhookId) {
        const settings = JSON.parse(fs.readFileSync('./assets/settings/b_settings.json', 'utf8'));
        if (settings[message.guild.id].channel === message.channel.id) {

            message.content = message.content.replace(/\n/g, ' ');
            let messageArray = message.content.split(" ");

            var users = [];

            for (let i in messageArray) {
                if (!isNaN(messageArray[i])) {
                    pushUserId(messageArray[i]);
                }
            }

            function pushUserId(id) {
                try {
                    var user_id = id.match(/\d/g);
                } catch (e) {}
                try {
                    users.push(user_id.join(""));
                } catch (err) {}
            }

            for (let i in users) {
                const guild = await bot.guilds.cache.get(message.guild.id)
                const member = await guild.members.cache.find(member => member.id === users[i]);
                if (member) {
                    await member.send(`You got banned from ${message.guild.name}. Reason: Banned by Blacklist.`).catch(err => {
                        /**THE USER HAS DM CLOSED */ })
                }
                
                await message.guild.members.ban(users[i], {
                        reason: (settings[message.guild.id].message) ? settings[message.guild.id].message : "Banned by Blacklist."
                    })
                    .then(() => {
                        message.channel.send(`${users[i]} has been banned.`).catch(err => {
                            message.react('✅').catch(err => {});
                        })
                    })
                    .catch(err => {
                        if(err.httpStatus === 403) {
                            return message.channel.send(`I don't have permission to ban ${users[i]}.`).catch(err => {});
                        }
                        if (err.httpStatus !== 404) return console.log(err);
                    });
            }

        }
    }
}