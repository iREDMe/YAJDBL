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
        message.channel.send(`*Pinging...*`).then(m => m.edit(`Pong! Roundtrip took: ${m.createdTimestamp - message.createdTimestamp}ms`));
    }
});

client.login('BOT TOKEN');