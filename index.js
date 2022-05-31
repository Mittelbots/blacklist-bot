const Discord = require("discord.js");
const {
    messageCreate
} = require("./bot/events/messageCreate");
const {
    spawn
} = require('child_process');

const token = require('./assets/token/token.json').token;

const bot = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_VOICE_STATES", "GUILD_MESSAGE_REACTIONS"],
    makeCache: Discord.Options.cacheWithLimits({
        MessageManager: 10,
        PresenceManager: 0,
        disableMentions: 'everyone'
        // Add more class names here
    }),
});

bot.setMaxListeners(10);

bot.on("messageCreate", async message => {
    messageCreate({
        message,
        bot
    })
});


process.on('unhandledRejection', err => {
    console.log(err);
    console.log(`---- BOT RESTARTED DUE ERROR..., ${new Date()}`);
    spawn(process.argv[1], process.argv.slice(2), {
        detached: true,
        stdio: ['ignore', null, null]
    }).unref()
    process.exit()
});

process.on('uncaughtException', err => {
    console.log(err);
    console.log(`---- BOT RESTARTED DUE ERROR..., ${new Date()}`);
    spawn(process.argv[1], process.argv.slice(2), {
        detached: true,
        stdio: ['ignore', null, null]
    }).unref()
    process.exit()
})

bot.once('ready', async () => {
    console.log(`---- BOT IS READY..., ${new Date()}`);
});

bot.login(token);