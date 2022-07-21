const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');


module.exports.run = async ({
    main_interaction,
    bot
}) => {

    const embed = new EmbedBuilder()
        .setTitle('Explaination of this Bot.')
        .setDescription('I saw some blacklist channels and people who actually banned all the members by hand. It was pain to watch them doing this much work.\n So i decied to create a bot which do this automatically.')
        .setFooter({text: 'Created by Mittelblut9#1974'})
 
    return main_interaction.reply({
        embeds: [embed]
    }).catch(err => {})
}

module.exports.data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('"What the heck is this Bot about" you may ask yourself.')