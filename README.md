# Blacklist Discord bot

## <b>What is it?</b>
The Bot bans every ID from a webhook message automatically.

## <b>Example</b>

<img src="git/img/example.png">
<br>

## <b>How to use it?</b>

### <b>Use this link if you don't want to self-host the bot.</b>

https://discord.com/api/oauth2/authorize?client_id=973683659666235482&permissions=2052&scope=bot%20applications.commands

<br>

### ➡️ <b>1.</b> Clone the repository

```txt
git clone https://github.com/Mittelbots/blacklist-bot.git
```

### ➡️ <b>2.</b> Install the dependencies

```txt
pip install -r requirements.txt
```

### ➡️ <b>3.</b> Copy and rename `.env.example` `.env` and insert your Bot Token

```txt
DISCORD_TOKE=YOURTOKEN
```

```


### ➡️ <b>4.</b> Run the bot


```txt
//for dev
sh start.sh "dev"

//for prod
sh start.sh "prod"
//Pm2 required!
```


> For help use /info
