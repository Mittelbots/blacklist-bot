const { PermissionFlagsBits } = require('discord.js');
const {
    SlashCommandBuilder
} = require('discord.js');
const fs = require('fs');

module.exports.run = async ({
    main_interaction,
    bot
}) => {
    const hasPermission = await main_interaction.member.permissions.has(PermissionFlagsBits.Administrator);
    if (!hasPermission) {
        return main_interaction.reply({
            content: 'You do not have permission to use this command.',
            ephemeral: true
        }).catch(err => {})
    }

    const settings = JSON.parse(fs.readFileSync('./assets/settings/b_settings.json', 'utf8'));

    switch (main_interaction.options.getSubcommand()) {
        case 'setchannel':
            const channel = main_interaction.options.getChannel('b_channel')
            if (channel.guild.id === main_interaction.guild.id) {
                try {
                    settings[main_interaction.guild.id].channel = channel.id;
                } catch (err) {
                    settings[main_interaction.guild.id] = {
                        channel: channel.id
                    }
                }

                fs.writeFileSync('./assets/settings/b_settings.json', JSON.stringify(settings, null, 4));

                return main_interaction.reply({
                    content: `Channel set to <#${channel.id}>`,
                    ephemeral: true
                }).catch(err => {})
            } else {
                main_interaction.reply({
                    content: 'You can only set the channel to a news channel which is in this Guild.',
                    ephemeral: true
                }).catch(err => {})
            }
            break;
        case 'banmessage':
            const message = main_interaction.options.getString('message');

            try {
                settings[main_interaction.guild.id].message = message;
            } catch (err) {
                settings[main_interaction.guild.id] = {
                    message: message
                }
            }

            fs.writeFileSync('./assets/settings/b_settings.json', JSON.stringify(settings, null, 4));

            main_interaction.reply({
                content: `Message set to \`${(message) ? message : 'default'}\``,
                ephemeral: true
            }).catch(err => {})
            break;
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

    .addSubcommand(subcommand =>
        subcommand
        .setName('banmessage')
        .setDescription('Set the Channel for your BlackList (One Channel only!)')
        .addStringOption(option =>
            option
            .setName('message')
            .setDescription('The Channel you want to set')
            .setRequired(true)
        )
    )