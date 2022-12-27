import discord

def info(bot):
    @bot.slash_command(name='info', description='What the hack is this bot?')
    async def info(ctx):
        newEmbedMessage = discord.Embed()
        newEmbedMessage.title = "Explaination of this Bot."
        newEmbedMessage.description = "I saw some blacklist channels and people who actually banned all the members by hand. It was pain to watch them doing this much work.\n So i decied to create a bot which do this automatically."
        
        newEmbedMessage.add_field(name="How to setup the bot?", value="To setup the bot type /settings setchannel [#channel] to add the backlist channel.")
        newEmbedMessage.add_field(name="Can i change the ban message?", value="Yes! Change it by /settings banmessage [message].")
        newEmbedMessage.add_field(name="I have a question or found a bug!", value="Thank you! Join this Server: https://discord.gg/5d5ZDFQM4E")

        newEmbedMessage.set_footer(text="Created by Mittelblut9#1974")

        await ctx.response.send_message(embed=newEmbedMessage)
