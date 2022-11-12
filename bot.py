import discord 
import os
from dotenv import load_dotenv
from commands import commands_handler
from _events import messages


load_dotenv()

def run_discord_bot() -> None:
    intents = discord.Intents.default()
    intents.message_content = True
    intents.members = True
    intents.bans = True
    bot = discord.Bot(intents=intents)


    commands_handler(bot)

    @bot.event
    async def on_ready() -> None:
        print(f'{bot.user} is ready!')
        await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="for /info"))

    @bot.event
    async def on_message(message: discord.Message) -> None:
        await messages.message_create(bot, message)

    bot.run(str(os.getenv('DISCORD_TOKEN')))