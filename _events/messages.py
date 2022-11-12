import json

import discord


async def message_create(bot, message) -> None:
    if message.webhook_id is None or message.author.id is bot.user.id:
        return

    with open("settings.json", "r") as jsonFile:
        data = json.load(jsonFile)
    if data[str(message.guild.id)]["channel"] != message.channel.id:
        return

    message.content = message.content.replace(r"/\n/g", " ")
    messageArray = message.content.split(" ")
    users = []

    for user in messageArray:
        try:
            user = int(user)
            users.append(user)
        except:
            pass


    if len(users) == 0:
        return
    
    for user in users:
        guild = bot.get_guild(message.guild.id)
        banmessage = data[str(message.guild.id)].get("banmessage") or f"You have been banned from {guild.name}"

        try:
            await guild.ban(discord.Object(id=user), reason=banmessage, delete_message_seconds=604800)
        except Exception as e:
            if str(e).find("403") != -1:
                await message.channel.send(f"I don't have permission to ban {user}")
                return
            else: 
                print(f'An Error Occured while banning: {e}')
            return

        await message.channel.send(content=f"Successfully banned {user}")
        member = guild.get_member(user)
        if member is not None:
            try:
                await member.send(content=banmessage + f" ||(Banned from {guild.name})||")
            except Exception as e:
                print(f'An Error Occured while sending a DM: {e}')
                pass  

            
