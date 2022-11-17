import discord
import json

def settings(bot) -> None:
    settings = bot.create_group(name="settings", description="Change the settings of the bot.")

    @settings.command(name="setchannel", description="Set the channel where the bot should ban all members.")
    async def setchannel(ctx, channel: discord.TextChannel) -> None:
        hasPermission = ctx.author.guild_permissions.administrator
        if hasPermission is False:
            return

        if ctx.guild.id is not channel.guild.id:
            return

        if channel is None:
            return

        try:
            with open("settings.json", "r") as jsonFile:
                data = json.load(jsonFile)
        except:
            print("Error while loading settings.json")
            with open ("settings.json", "w") as jsonFile:
                data = {}
                jsonFile.write(json.dumps(data, indent=4))

        try:
            data[str(ctx.guild.id)]["channel"] = channel.id
        except:
            if str(ctx.guild.id) not in data:
                data[str(ctx.guild.id)] = {}
            data[str(ctx.guild.id)]["channel"] = channel.id

        success = False
        try: 
            with open ("settings.json", "w") as jsonFile:
                jsonFile.write(json.dumps(data, indent=4))
            success = True
        except:
            success = False

        if success is True:
            await ctx.response.send_message(content="Successfully set the channel!", ephemeral=True)
        else:
            await ctx.response.send_message(content="Something went wrong!", ephemeral=True)

    @settings.command(name="banmessage", description="Set the ban message.")
    async def banmessage(ctx, message: str) -> None:
        hasPermission = ctx.author.guild_permissions.administrator
        if hasPermission is False:
            return

        try:
            with open ("settings.json", "r") as jsonFile:
                data = json.load(jsonFile)
        except:
            with open ("settings.json", "w") as jsonFile:
                data = {}
                jsonFile.write(json.dumps(data, indent=4))

        try:
            data[str(ctx.guild.id)]["banmessage"] = message
        except:
            if str(ctx.guild.id) not in data:
                data[str(ctx.guild.id)] = {}

            data[str(ctx.guild.id)]["banmessage"] = message
        
        success = False
        try: 
            with open ("settings.json", "w") as jsonFile:
                jsonFile.write(json.dumps(data, indent=4))
            success = True
        except:
            success = False

        if success is True:
            await ctx.response.send_message(content="Successfully set the ban message!", ephemeral=True)
        else:
            await ctx.response.send_message(content="Something went wrong!", ephemeral=True)