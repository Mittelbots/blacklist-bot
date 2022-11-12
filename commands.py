from _commands import ping
from _commands import info
from _commands import settings


def commands_handler(bot):
    ping.ping(bot)
    info.info(bot)
    settings.settings(bot)