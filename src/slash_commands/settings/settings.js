const {
    SlashCommandBuilder
} = require('discord.js');
const fs = require('fs');

module.exports.run = async ({
    main_interaction,
    bot
}) => {
    const hasPermission = await main_interaction.member.permissions.has('ADMINISTRATOR');
    if(!hasPermission) {
        return main_interaction.reply({
            content: 'You do not have permission to use this command.',
            ephemeral: true
        }).catch(err => {})
    }

    switch (main_interaction.options.getSubcommand()) {
        case 'setchannel':
            const channel = main_interaction.options.getChannel('b_channel')
            if(channel.guild.id === main_interaction.guild.id) {
                fs.readFile('./assets/settings/b_channels.json', 'utf8', (err, data) => {
                    if(err) console.log(err);
                    const b_channels = JSON.parse(data);

                    b_channels[main_interaction.guild.id] = channel.id;

                    fs.writeFileSync('./assets/settings/b_channels.json', JSON.stringify(b_channels, null, 4));

                    return main_interaction.reply({
                        content: `Channel set to <#${channel.id}>`,
                        ephemeral: true
                    }).catch(err => {})
                });
            }else {
                return main_interaction.reply({
                    content: 'You can only set the channel to a news channel which is in this Guild.',
                    ephemeral: true
                }).catch(err => {})
            }
    }
}

module.exports.data = new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Settings for your Guild')
    .addSubcommand(subcommand =>
        subcommand
        .setName('setchannel')
        .setDescription('Set the Channel for your BlackList (One Channel only!)')
        .addChannelOption(option =>
            option
            .setName('b_channel')
            .setDescription('The Channel you want to set')
            .setRequired(true)
        )
    )