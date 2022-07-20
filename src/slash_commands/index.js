module.exports.handleSlashCommands = async ({main_interaction, bot}) => {
    let settings = ['settings'];

    if(settings.indexOf(main_interaction.commandName) !== -1){
        return require(`./settings/${main_interaction.commandName}`).run({main_interaction, bot});
    }else {
        return require(`./${main_interaction.commandName}/${main_interaction.commandName}`).run({main_interaction, bot});
    };
}