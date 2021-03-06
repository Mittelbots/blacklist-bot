const {GatewayIntentBits, Options, Client, ActivityType} = require("discord.js");
const {
    messageCreate
} = require("./bot/events/messageCreate");
const {
    spawn
} = require('child_process');
const { createSlashCommands } = require("./utils/functions/createSlashCommands/createSlashCommands");
const { handleSlashCommands } = require("./src/slash_commands");
const { getLinesOfCode } = require("./utils/functions/getLinesOfCode/getLinesOfCode");

const version = require('./package.json').version;
const token = require('./assets/token/token.json').token;

const bot = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates , GatewayIntentBits.GuildMessageReactions , GatewayIntentBits.GuildBans, GatewayIntentBits.MessageContent],
    makeCache: Options.cacheWithLimits({
        MessageManager: 10,
        PresenceManager: 0,
        disableMentions: 'everyone'
        // Add more class names here
    }),
});

bot.setMaxListeners(10);
createSlashCommands()

bot.on("messageCreate", async message => {
    messageCreate({
        message,
        bot
    })
});

bot.on("interactionCreate", (main_interaction) => {
    handleSlashCommands({
        main_interaction,
        bot
    })
})


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

    setActivity();
    setInterval(() => {
        setActivity();
      }, 3600000); // 1h
    
      function setActivity() {
        getLinesOfCode((cb) => {
          let membersCount = bot.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)
          var codeLines = ` | ${bot.guilds.cache.size} guilds with ${membersCount} members | Code: ${cb}` || '';
          bot.user.setActivity({
            name: 'Watching blacklists | v' + version + codeLines,
            type: ActivityType.Playing,
          });
        });
      }

    console.log(`---- BOT IS READY..., ${new Date()}`);
    console.log(`I'm on ${bot.guilds.cache.size} Server(s)`)
});

bot.login(token);