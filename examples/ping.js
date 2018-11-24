const yajdbl = require('yajdbl');
const client = new yajdbl.Client();

client.on('ready', () =>
{
    client.print(`Logged in as ${client.user.tag}`);
});

client.on('message', (message) =>
{
    if (message.content === 'ping')
    {
        message.channel.send('pong!');
    }
});

client.login('BOT TOKEN');