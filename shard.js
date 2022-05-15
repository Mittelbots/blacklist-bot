const config = require('./assets/config/config.json')
const {
    ShardingManager
} = require('discord.js')
const token = require('./assets/token/token.json').token;

if (!config.debug) {
    let manager = new ShardingManager('./index.js', {
        token: token,
        totalShards: 'auto',
        respawn: true,
    });
    manager.on('shardCreate', shard => {
        console.log(`[SHARDS]: Launched shards ${shard.id}`)
    });

    manager.spawn();
}