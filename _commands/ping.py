import discord

def ping(bot):
    @bot.slash_command(name='ping', description='Pong!')
    async def ping(ctx):
        if round(bot.latency * 1000) <= 50:
            embed=discord.Embed(title="PING", description=f":ping_pong: Pingpingpingpingping! The ping is **{round(bot.latency *1000)}** milliseconds!", color=0x44ff44)
        elif round(bot.latency * 1000) <= 100:
            embed=discord.Embed(title="PING", description=f":ping_pong: Pingpingpingpingping! The ping is **{round(bot.latency *1000)}** milliseconds!", color=0xffd000)
        elif round(bot.latency * 1000) <= 200:
            embed=discord.Embed(title="PING", description=f":ping_pong: Pingpingpingpingping! The ping is **{round(bot.latency *1000)}** milliseconds!", color=0xff6600)
        else:
            embed=discord.Embed(title="PING", description=f":ping_pong: Pingpingpingpingping! The ping is **{round(bot.latency *1000)}** milliseconds!", color=0x990000)
        await ctx.response.send_message(embed=embed)